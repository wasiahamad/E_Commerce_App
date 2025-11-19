import React, { useState, useEffect, useContext } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import ProductZoom from "../../components/ProductZoom";
import { Rating, Dialog, DialogContent, IconButton } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
import { IoCloseSharp } from "react-icons/io5";

import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import ProductsSlider from "../../components/ProductsSlider";
import ProductDetailsModel from "../../components/ProductDetailsModel";
import { getData } from '../../utils/api';
const apiUrl = import.meta.env.VITE_API_URL;
import { useParams } from 'react-router-dom';
import { postData } from '../../utils/api';
import axios from 'axios';
import { MyContext } from '../../App';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const context = useContext(MyContext);

    const [reviewRating, setReviewRating] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);
    const [reviewFiles, setReviewFiles] = useState([])
    const [reviewPreviews, setReviewPreviews] = useState([])
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [modalReview, setModalReview] = useState(null);
    const [modalImageIndex, setModalImageIndex] = useState(0);

    useEffect(() => {
        if (!id) return;
        getData(`/api/v1/product/${id}`).then((res) => {
            if (res && res.data) setProduct(res.data);
        }).catch(err => console.error('Error fetching product', err));

        // check if logged-in user already requested notify for this product
        const checkNotify = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) return;
                const res = await axios.get(apiUrl + `/api/v1/notify/check?productId=${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res?.data?.data?.requested) {
                    // set notifyRequested flag in the ProductDetailsModel via custom event
                    const event = new CustomEvent('notify-requested', { detail: { productId: id, notify: res.data.data.notify } });
                    window.dispatchEvent(event);
                }
            } catch (err) {
                // ignore
            }
        };
        checkNotify();
    }, [id]);

    // Ensure reviewer names are the real user names when possible.
    // Avoid infinite loops by updating state only when names actually change
    // and by remembering which product IDs we've already patched.
    const namesFilledRef = React.useRef({});
    useEffect(() => {
        const fillReviewerNames = async () => {
            if (!product?._id || !product?.reviews || !product.reviews.length) return;
            if (namesFilledRef.current[product._id]) return; // already filled for this product

            const ids = Array.from(new Set(product.reviews
                .map(r => r.userId || (r.user && r.user._id))
                .filter(Boolean)
            ));
            if (!ids.length) {
                namesFilledRef.current[product._id] = true;
                return;
            }

            try {
                const results = await Promise.all(ids.map(id => getData(`/api/v1/user/${id}`)));
                const userMap = {};
                results.forEach(res => {
                    if (res && res.data) {
                        const u = res.data;
                        userMap[u._id] = u.name || u.userName || u.username || `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email || null;
                    }
                });

                // build new reviews array and check if any name actually changed
                let changed = false;
                const newReviews = product.reviews.map(r => {
                    const existing = r.userName;
                    const isPlaceholder = !existing || ['user', 'anonymous'].includes(String(existing).toLowerCase());
                    if (!isPlaceholder) return r;
                    const idKey = r.userId || (r.user && r.user._id);
                    const fetchedName = idKey ? userMap[idKey] : null;
                    const newName = fetchedName || r.userName || 'Anonymous';
                    if (newName !== existing) changed = true;
                    return { ...r, userName: newName };
                });

                if (changed) {
                    const patched = { ...product, reviews: newReviews };
                    setProduct(patched);
                }
                // mark as filled to avoid repeated work even if nothing changed
                namesFilledRef.current[product._id] = true;
            } catch (err) {
                console.error('Could not fetch reviewer names', err);
            }
        };

        fillReviewerNames();
        // only re-run when reviews length or product id changes
    }, [product?._id, product?.reviews?.length]);

    const submitReview = async () => {
        if (!context?.isLoggedIn) {
            context?.alertBox('error', 'Please login to submit a review');
            return;
        }
        if (!product?._id) return;
        try {
            setSubmittingReview(true);
            // Build multipart form data for review (supports images)
            const formData = new FormData();
            formData.append('rating', reviewRating);
            formData.append('comment', reviewText);
            // append files as reviewImages
            for (const f of reviewFiles) {
                formData.append('reviewImages', f);
            }

            const response = await fetch(apiUrl + `/api/v1/product/${product._id}/review`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    // NOTE: do NOT set Content-Type; browser will set multipart boundary
                },
                body: formData
            });

            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                context?.alertBox('error', 'Session expired. Please login again.');
                window.location.href = '/';
                return;
            }

            const res = await response.json();
            if (res && res.success) {
                // update product local state with new review (res.data contains updated product)
                const updated = res.data;
                setProduct(updated);
                context?.alertBox('success', 'Review submitted');
                setReviewText('');
                setReviewRating(5);
                setReviewFiles([]);
                setReviewPreviews([]);
                setActiveTab(2);
            } else {
                context?.alertBox('error', res?.message || 'Could not submit review');
            }
        } catch (err) {
            console.error('Review submit error', err);
            context?.alertBox('error', 'Something went wrong');
        } finally {
            setSubmittingReview(false);
        }
    }

    return (
        <>
            <div className="py-5">
                <div className="container">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" to="/" className="link transition">
                            Home
                        </Link>
                        <Link underline="hover" color="inherit" to="/productListing" className="link transition">
                            {product?.catName || 'Products'}
                        </Link>
                        <span className="text-[16px] font-[600]">{product?.name || 'Product Details'}</span>
                    </Breadcrumbs>
                </div>
            </div>

                {/* Review image modal */}
                <Dialog open={reviewModalOpen} onClose={() => setReviewModalOpen(false)} maxWidth="lg" fullWidth>
                    <div className="flex items-start justify-between p-4 border-b">
                        <h3 className="text-lg font-semibold">Review</h3>
                        <IconButton onClick={() => setReviewModalOpen(false)}>
                            <IoCloseSharp />
                        </IconButton>
                    </div>
                    <DialogContent>
                        {modalReview && (
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="md:w-2/3 flex items-center justify-center bg-black">
                                    <div className="relative w-full flex items-center justify-center">
                                        <button
                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
                                            onClick={() => setModalImageIndex(i => (i - 1 + modalReview.images.length) % modalReview.images.length)}
                                            aria-label="previous"
                                        >&lt;</button>

                                        <img src={modalReview.images[modalImageIndex]} alt={`modal-${modalImageIndex}`} className="max-h-[70vh] object-contain" />

                                        <button
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
                                            onClick={() => setModalImageIndex(i => (i + 1) % modalReview.images.length)}
                                            aria-label="next"
                                        >&gt;</button>
                                    </div>
                                </div>

                                <div className="md:w-1/3">
                                    <div className="flex items-center gap-3 mb-3">
                                        <img src={modalReview.userAvatar || 'https://ecommerce-frontend-view.netlify.app/user.jpg'} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
                                        <div>
                                            <div className="font-semibold">{modalReview.userName || 'Anonymous'}</div>
                                            <div className="text-sm text-gray-500">{new Date(modalReview.createdAt).toLocaleDateString()}</div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <Rating value={modalReview.rating || 0} readOnly />
                                    </div>

                                    <div className="text-gray-700">
                                        {modalReview.comment}
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

            <section className="bg-white py-5">
                <div className="container flex gap-8 items-start">
                    <div className="productZoomContainer w-[40%] ">
                        <ProductZoom product={product} />
                    </div>

                    <div className="productContent w-[60%] pr-10 pl-10">    
                        <ProductDetailsModel product={product} />
                    </div>

                </div>

                <div className="container pt-10">
                    <div className="flex items-center gap-8">
                        <button className={`link text-[17px] font-[500] cursor-pointer ${activeTab === 0 ? "text-primary" : ""}`} onClick={() => setActiveTab(0)}>Description</button>
                        <button className={`link text-[17px] font-[500] cursor-pointer ${activeTab === 1 ? "text-primary" : ""}`} onClick={() => setActiveTab(1)}>Product Details</button>
                        <button className={`link text-[17px] font-[500] cursor-pointer ${activeTab === 2 ? "text-primary" : ""}`} onClick={() => setActiveTab(2)}>Reviews ({product?.reviews?.length || 0})</button>
                    </div>

                    {activeTab === 0 && (
                        <div className="shadow-md w-full px-8 py-5 rounded-md ">
                            <p className="text-[15px] leading-relaxed">
                                {product?.description || 'No description available.'}
                            </p>
                        </div>
                    )}

                    {activeTab === 1 && (
                        <div className="shadow-md w-full px-8 py-5 rounded-md">
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3">Property</th>
                                            <th className="px-6 py-3">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b">
                                            <td className="px-6 py-4 font-medium text-gray-900">Name</td>
                                            <td className="px-6 py-4">{product?.name}</td>
                                        </tr>
                                        <tr className="bg-white border-b">
                                            <td className="px-6 py-4 font-medium text-gray-900">Category</td>
                                            <td className="px-6 py-4">{product?.catName || product?.category}</td>
                                        </tr>
                                        <tr className="bg-white border-b">
                                            <td className="px-6 py-4 font-medium text-gray-900">Price</td>
                                            <td className="px-6 py-4">₹ {product?.price}</td>
                                        </tr>
                                        <tr className="bg-white border-b">
                                            <td className="px-6 py-4 font-medium text-gray-900">Old Price</td>
                                            <td className="px-6 py-4">{product?.oldPrice ? `₹ ${product.oldPrice}` : '—'}</td>
                                        </tr>
                                        <tr className="bg-white border-b">
                                            <td className="px-6 py-4 font-medium text-gray-900">In Stock</td>
                                            <td className="px-6 py-4">{product?.countInStock ?? 0}</td>
                                        </tr>
                                        {product?.size && product.size.length > 0 && (
                                            <tr className="bg-white border-b">
                                                <td className="px-6 py-4 font-medium text-gray-900">Available Sizes</td>
                                                <td className="px-6 py-4">{(product?.size || []).join(', ')}</td>
                                            </tr>
                                        )}

                                        {product?.productRam && product.productRam.length > 0 && (
                                            <tr className="bg-white border-b">
                                                <td className="px-6 py-4 font-medium text-gray-900">Available RAMs</td>
                                                <td className="px-6 py-4">{(product?.productRam || []).join(', ')}</td>
                                            </tr>
                                        )}

                                        {product?.productWeight && product.productWeight.length > 0 && (
                                            <tr className="bg-white border-b">
                                                <td className="px-6 py-4 font-medium text-gray-900">Available Weights</td>
                                                <td className="px-6 py-4">{(product?.productWeight || []).join(', ')}</td>
                                            </tr>
                                        )}
                                        <tr className="bg-white">
                                            <td className="px-6 py-4 font-medium text-gray-900">Brand</td>
                                            <td className="px-6 py-4">{product?.brand || '—'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 2 && (
                        <div className="shadow-md w-full px-8 py-5 rounded-md">
                            <div className="productsReview w-full">
                                <h1 className="text-[20px] font-[500]">Customer reviews</h1>

                                {/* Review form */}
                                <div className="reviewForm bg-[#fafafa] p-5 mt-4 rounded-md">
                                    <h3 className="text-[16px] font-[600] mb-2">Write a review</h3>
                                    <div className="flex items-center gap-3 mb-3">
                                        <Rating name="review-rating" value={reviewRating} onChange={(_, v) => setReviewRating(v)} />
                                    </div>
                                    <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows={4} className="w-full border p-3 rounded-md mb-3" placeholder="Write your review here" />
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Add photos (optional)</label>
                                        <input type="file" multiple accept="image/*" onChange={(e) => {
                                            const files = Array.from(e.target.files || []);
                                            setReviewFiles(files);
                                            const previews = files.map(f => URL.createObjectURL(f));
                                            setReviewPreviews(previews);
                                        }} />
                                        <div className="flex gap-2 mt-2">
                                            {reviewPreviews.map((p, i) => (
                                                <img key={i} src={p} alt={`preview-${i}`} className="w-20 h-20 object-cover rounded" />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={submitReview} disabled={submittingReview} className="btn-org px-4 py-2">{submittingReview ? 'Submitting...' : 'Submit Review'}</button>
                                        <button onClick={() => { setReviewText(''); setReviewRating(5); }} className="btn px-4 py-2">Cancel</button>
                                    </div>

                                </div>

                                <div className="reviewsScroll w-full max-h-[340px] overflow-y-auto mt-5 pr-5">
                                    {(product?.reviews && product.reviews.length) ? (
                                        product.reviews.map((r, idx) => (
                                            <div key={idx} className="review w-full flex items-center justify-between py-5 border-b border-[#eaeaea]">
                                                <div className="info w-[60%] flex items-center gap-3">
                                                    <div className="img w-[70px] h-[70px] rounded-full overflow-hidden">
                                                        <img src={r.userAvatar || 'https://ecommerce-frontend-view.netlify.app/user.jpg'} alt="" className='w-full' />
                                                    </div>

                                                    <div className="content w-[80%]">
                                                        <h1 className="text-[16px] font-[500]">{r.userName || 'Anonymous'}</h1>
                                                        <h5 className="text-[13px] font-[400] text-[#8a8a8a] mb-0">{new Date(r.createdAt).toLocaleDateString()}</h5>
                                                                    <p className="text-[14px] font-[400] text-[#262424] mt-0 mb-0">{r.comment}</p>
                                                                    {r.images && r.images.length > 0 && (
                                                                        <div className="mt-2 flex gap-2">
                                                                            {r.images.map((img, i) => (
                                                                                <img
                                                                                    key={i}
                                                                                    src={img}
                                                                                    alt={`review-${i}`}
                                                                                    className="w-20 h-20 object-cover rounded cursor-pointer"
                                                                                    onClick={() => { setModalReview(r); setModalImageIndex(i); setReviewModalOpen(true); }}
                                                                                />
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                    </div>
                                                </div>
                                                <Rating name="size-small" value={r.rating} readOnly />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-[14px] text-[#666]">No reviews yet.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="container pt-8 ">
                    <h2 className="text-[22px] font-[600] text-[rgba(0,0,0,0.8)]">Related Products</h2>
                    <ProductsSlider items={6} />
                </div>
            </section>
        </>
    );
};

export default ProductDetails;
