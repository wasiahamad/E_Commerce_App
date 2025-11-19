import React, { useContext, useState } from 'react'
import Rating from '@mui/material/Rating'
import { Button } from '@mui/material'
import { PiShoppingCartLight } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import './style.css'
import { postData } from '../../utils/api'
import { MdZoomOutMap } from 'react-icons/md'
import { IoMdGitCompare } from 'react-icons/io'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { deleteData } from '../../utils/api'
import { MyContext } from '../../App'

const ProductsItemListView = ({ product, onAddToCart }) => {
    if (!product) return null

    const title = product.name || product.title || 'Product'
    const brand = product.brand || ''
    const price = product.price ?? 0
    const oldPrice = product.oldPrice ?? null
    const rating = product.rating ?? product.avgRating ?? 0

    const productId = product._id || product.id || ''
    const image = Array.isArray(product.image) ? product.image[0] : product.image
    const hoverImage = (Array.isArray(product.image) && product.image[1]) ? product.image[1] : null

    const [adding, setAdding] = useState(false)

    const context = useContext(MyContext)

    const hasProductId = Boolean(productId)

    const handleAddToCart = async () => {
        if (!context?.isLoggedIn) {
            context?.alertBox('error', 'Please login to add items to cart');
            return;
        }

        if (!hasProductId) {
            // don't spam alerts; just noop or optionally show a subtle message
            context?.alertBox('error', 'Product is not available right now');
            return;
        }

        try {
            setAdding(true);
            const res = await postData('/api/v1/cart/add', { productId });
            if (res && res.success) {
                context?.alertBox('success', res.message || 'Added to cart');
                // optionally open cart panel
                if (typeof context?.setOpenCardPanel === 'function') {
                    context.setOpenCardPanel(true);
                }
            } else {
                context?.alertBox('error', res?.message || 'Could not add to cart');
            }
        } catch (err) {
            console.error('Add to cart error', err);
            context?.alertBox('error', err?.message || 'Something went wrong');
        } finally {
            setAdding(false);
        }

    }

    // add to wishlist handler
    const isInMyList = () => {
        const list = context?.myList || [];
        if (!productId) return false;
        const pid = String(productId);
        return list.some(item => {
            const itemPid = item?.productId;
            if (!itemPid) return false;
            // itemPid may be a string, ObjectId-like (with toString) or populated object with _id
            if (typeof itemPid === 'string') return itemPid === pid;
            if (typeof itemPid === 'object') {
                if (itemPid._id) return String(itemPid._id) === pid;
                if (typeof itemPid.toString === 'function') return String(itemPid.toString()) === pid;
            }
            return false;
        });
    }

    const handleAddToWishlist = async () => {
        if (!context?.isLoggedIn) {
            context?.alertBox('error', 'Please login to add to wishlist');
            return;
        }

        if (!hasProductId) {
            // don't spam alerts; just noop or optionally show a subtle message
            context?.alertBox('error', 'Product is not available right now');
            return;
        }

        try {
            const res = await postData('/api/v1/myList/add', { productId });
            if (res && res.success) {
                context?.alertBox('success', res.message || 'Added to wishlist');
                if (typeof context?.fetchMyList === 'function') context.fetchMyList();
            } else {
                context?.alertBox('error', res?.message || 'Could not add to wishlist');
            }
        } catch (err) {
            console.error('Add to wishlist error', err);
            context?.alertBox('error', err?.message || 'Something went wrong');
        }
    }

    const handleRemoveFromWishlist = async () => {
        // find mylist item id for this product
        try {
            const list = context?.myList || [];
            const found = list.find(item => (item.productId === productId) || (item._id === productId) || (item.productId === (product._id || product.id)));
            if (!found) {
                context?.alertBox('error', 'Item not found in wishlist');
                return;
            }
            const res = await deleteData(`/api/v1/myList/remove/${found._id}`);
            if (res && res.success) {
                context?.alertBox('success', res.message || 'Removed from wishlist');
                if (typeof context?.fetchMyList === 'function') context.fetchMyList();
            } else {
                context?.alertBox('error', res?.message || 'Could not remove from wishlist');
            }
        } catch (err) {
            console.error('Remove from wishlist error', err);
            context?.alertBox('error', err?.message || 'Something went wrong');
        }
    }

    return (
        <div className="product-list-item w-full rounded-md overflow-hidden bg-[#dddada] shadow-sm mb-4">
            <div className="imgWrapper rounded-md overflow-hidden flex gap-6 p-4 items-start">
                <div className="image-group relative group flex-shrink-0">
                    <Link to={`/productDetails/${productId}`}>
                        {/* Fixed image box to match screenshot: approx 340px width x 360px height */}
                        <div className="img w-[340px] h-[360px] overflow-hidden relative rounded-md shadow-sm">
                            <img src={image || '/assets/images/product/p1.png'} alt={title} className="w-full h-full object-cover rounded-md" />
                            {hoverImage && hoverImage !== image && (
                                <img src={hoverImage} alt={`${title} hover`} className="w-full h-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-transform duration-500 group-hover:scale-105 object-cover rounded-md" />
                            )}
                        </div>
                    </Link>
                    <span className="absolute top-2 left-2 text-[12px] font-[500] bg-[#ff5252] text-white px-2 py-1 rounded-xl z-10">
                        {product?.discount || product?.discountPercentage ? (product?.discount || product?.discountPercentage) : 10}% off
                    </span>

                    <div className="actions absolute top-[14px] right-[8px] flex items-center gap-2 z-50 flex-col w-[44px] transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                        <Button
                            className="!bg-white !text-[#000] hover:!bg-[#ff5252] hover:!text-white !rounded-full !h-[35px] !w-[35px] !min-w-[35px] group"
                            onClick={() => {
                                if (typeof context?.setCurrentProduct === 'function') context.setCurrentProduct(product);
                                context.setOpenProductDetailModel(true);
                            }}
                        >
                            <MdZoomOutMap className="text-[500] font-[22px]" />
                        </Button>

                        <Button className="!bg-white !text-[#000] hover:!bg-[#ff5252] hover:!text-white !rounded-full !h-[35px] !w-[35px] !min-w-[35px] group">
                            <IoMdGitCompare className="text-[500] font-[22px]  " />
                        </Button>

                        {isInMyList() ? (
                            <Button onClick={handleRemoveFromWishlist} className="!bg-white !text-[#ff5252] hover:!bg-[#ff5252] !rounded-full !h-[35px] !w-[35px] !min-w-[35px] group">
                                <FaHeart className="text-[ff5252] font-[22px] text-[#ff5252]" />
                            </Button>
                        ) : (
                            <Button onClick={handleAddToWishlist} className="!bg-white !text-[#000] hover:!bg-[#ff5252] hover:!text-white !rounded-full !h-[35px] !w-[35px] !min-w-[35px] group">
                                <FaRegHeart className="text-[500] font-[22px]" />
                            </Button>
                        )}
                    </div>

                </div>

                <div className="info-col flex-1">
                    <div className="meta flex items-center justify-between">
                        <div>
                            {brand && <div className="text-sm text-gray-500">{brand}</div>}
                            <h3 className="product-list-title text-2xl font-semibold mt-1 mb-2">
                                {title}
                            </h3>
                        </div>
                        <div className="text-right">
                            <Rating name="size-small" value={Number(rating)} size="small" readOnly />
                        </div>
                    </div>

                    {product.description && (
                        <p className="product-list-desc text-sm text-gray-600 mt-2">
                            {product.description}
                        </p>
                    )}

                    <div className="price-row flex items-center gap-4 mt-4">
                        {oldPrice ? (<span className="text-sm text-gray-400 line-through">₹{oldPrice}</span>) : null}
                        <span className="text-primary font-bold text-xl">₹{price}</span>
                    </div>

                    {/* <div className="actions mt-6 flex items-center gap-3">
                        <Button
                            variant="outlined"
                            startIcon={<PiShoppingCartLight />}
                            onClick={() => onAddToCart && onAddToCart(product._id || product.id)}
                            className="!capitalize !px-5 !py-2"
                        >
                            Add to cart
                        </Button>
                    </div> */}

                    <div className="btns !w-[30%] flex items-center gap-2 mt-4">
                        <Button
                            disabled={adding || !hasProductId}
                            onClick={handleAddToCart}
                            className="!bg-white !text-[#ff5252] hover:!bg-[#ff5252] hover:!text-white w-full !text-[13px] !font-semibold pr-2"
                        >
                            <PiShoppingCartLight size={20} className="mr-2" /> {hasProductId ? (adding ? 'Adding...' : 'Add to Cart') : 'Unavailable'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsItemListView