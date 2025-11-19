// import React, { useRef, useState } from 'react'
// import 'react-inner-image-zoom/lib/styles.min.css';
// import InnerImageZoom from 'react-inner-image-zoom';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// // import required modules
// import { Navigation } from 'swiper/modules';

// const ProductDetails = () => {
//     const [sliderIndex, setSliderIndex] = useState(0);
//     const zoomSliderBig = useRef(null);
//     const zoomSliderSmall = useRef(null);

//     const goTo = (index) => {
//         setSliderIndex(index);
//         zoomSliderBig.current.swiper.slideTo(index);
//         zoomSliderSmall.current.swiper.slideTo(index);
//     }

//     return (
//         <>
//             <div className="flex items-center justify-between px-2 py-0 mt-3 ">
//                 <h2 className="text-[20px] font-[600] text-[#333]">Product Details</h2>
//             </div>

//             <div className="productDetails flex gap-5 p-5">
//                 <div className='w-[50%]'>
//                     <div className="flex gap-3">
//                         <div className="slider w-[15%]">
//                             <Swiper
//                                 direction={'vertical'}
//                                 slidesPerView={4}
//                                 spaceBetween={10}
//                                 navigation={true}
//                                 modules={[Navigation]}
//                                 ref={zoomSliderSmall}
//                                 className="productZoomSwiper h-[500px]  overflow-hidden"
//                             >
//                                 <SwiperSlide >
//                                     <div className={`item rounded-md overflow-hidden cursor-pointer group ${sliderIndex === 0 ? 'opacity-1' : 'opacity-30'}`} onClick={() => goTo(0)}>
//                                         <img src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp" alt="" className='w-full transition-all group-hover:scale-105' />
//                                     </div>
//                                 </SwiperSlide>

//                                 <SwiperSlide >
//                                     <div className={`item rounded-md overflow-hidden cursor-pointer group ${sliderIndex === 1 ? 'opacity-1' : 'opacity-30'}`} onClick={() => goTo(1)}>
//                                         <img src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp" alt="" className='w-full transition-all group-hover:scale-105' />
//                                     </div>
//                                 </SwiperSlide>

//                                 <SwiperSlide >
//                                     <div className={`item rounded-md overflow-hidden cursor-pointer group ${sliderIndex === 2 ? 'opacity-1' : 'opacity-30'}`} onClick={() => goTo(2)}>
//                                         <img src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp" alt="" className='w-full transition-all group-hover:scale-105' />
//                                     </div>
//                                 </SwiperSlide>

//                                 <SwiperSlide >
//                                     <div className={`item rounded-md overflow-hidden cursor-pointer group ${sliderIndex === 3 ? 'opacity-1' : 'opacity-30'}`} onClick={() => goTo(3)}>
//                                         <img src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp" alt="" className='w-full transition-all group-hover:scale-105' />
//                                     </div>
//                                 </SwiperSlide>

//                                 <SwiperSlide >
//                                     <div className={`item rounded-md overflow-hidden cursor-pointer group ${sliderIndex === 4 ? 'opacity-1' : 'opacity-30'}`} onClick={() => goTo(4)}>
//                                         <img src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp" alt="" className='w-full transition-all group-hover:scale-105' />
//                                     </div>
//                                 </SwiperSlide>

//                                 <SwiperSlide >
//                                     <div className={`item rounded-md overflow-hidden cursor-pointer group ${sliderIndex === 5 ? 'opacity-1' : 'opacity-30'}`} onClick={() => goTo(5)}>
//                                         <img src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp" alt="" className='w-full transition-all group-hover:scale-105' />
//                                     </div>
//                                 </SwiperSlide>
//                             </Swiper>
//                         </div>

//                         <div className="zoomContainer w-[500px] h-[500px] overflow-hidden">
//                             <Swiper

//                                 slidesPerView={1}
//                                 spaceBetween={10}
//                                 ref={zoomSliderBig}
//                                 modules={[Navigation]}
//                             >
//                                 <SwiperSlide >
//                                     <InnerImageZoom
//                                         src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp"
//                                         zoomType='hover'
//                                         zoomScale={1}
//                                     />
//                                 </SwiperSlide>

//                                 <SwiperSlide >
//                                     <InnerImageZoom
//                                         src="https://serviceapi.spicezgold.com/download/1742462383491_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-2-202308161432.webp"
//                                         zoomType='hover'
//                                         zoomScale={1}
//                                     />
//                                 </SwiperSlide>

//                                 <SwiperSlide >
//                                     <InnerImageZoom
//                                         src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg"
//                                         zoomType='hover'
//                                         zoomScale={1}
//                                     />
//                                 </SwiperSlide>

//                                 <SwiperSlide >
//                                     <InnerImageZoom
//                                         src="https://serviceapi.spicezgold.com/download/1742462383495_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp"
//                                         zoomType='hover'
//                                         zoomScale={1}
//                                     />
//                                 </SwiperSlide>

//                                 <SwiperSlide >
//                                     <InnerImageZoom
//                                         src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp"
//                                         zoomType='hover'
//                                         zoomScale={1}
//                                     />
//                                 </SwiperSlide>
//                             </Swiper>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </>
//     )
// }

// export default ProductDetails



import React, { useEffect, useRef, useState } from "react";
import "react-inner-image-zoom/lib/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { getData, getProducts } from "../../utils/api";

const ProductDetails = () => {
    const [sliderIndex, setSliderIndex] = useState(0);
    const zoomSliderBig = useRef(null);
    const zoomSliderSmall = useRef(null);
    const [products, setProducts] = useState([]);
    const [value, setValue] = useState(4);

    const goTo = (index) => {
        setSliderIndex(index);
        zoomSliderBig.current.swiper.slideTo(index);
        zoomSliderSmall.current.swiper.slideTo(index);
    };

    const { id } = useParams();

    useEffect(() => {
        if (!id) return;
        getData(`/api/v1/product/${id}`).then((res) => {
            if (res && res.data) setProducts(res.data);
        }).catch(err => console.error('Error fetching product', err));
    }, [id]);

    // If reviews don't include a proper userName (for example they contain a placeholder
    // like 'user' or are empty), try to fetch the real user names by userId and attach
    // them to the reviews in local state so the UI shows the real name.
    const adminNamesFilledRef = React.useRef({});
    useEffect(() => {
        const fillReviewerNames = async () => {
            if (!products?._id || !products?.reviews || !products.reviews.length) return;
            if (adminNamesFilledRef.current[products._id]) return;

            const ids = Array.from(new Set(products.reviews
                .map(r => r.userId || (r.user && r.user._id))
                .filter(Boolean)
            ));
            if (!ids.length) {
                adminNamesFilledRef.current[products._id] = true;
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

                let changed = false;
                const newReviews = products.reviews.map(r => {
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
                    setProducts(prev => ({ ...prev, reviews: newReviews }));
                }

                adminNamesFilledRef.current[products._id] = true;
            } catch (err) {
                console.error('Could not fetch reviewer names', err);
            }
        };

        fillReviewerNames();
    }, [products?._id, products?.reviews?.length]);

    return (
        <>
            {/* Sticky Heading */}
            <div className="flex items-center justify-between px-4 py-3 border-b sticky top-0 bg-white z-10">
                <h2 className="text-[20px] font-[600] text-[#333]">Product Details</h2>
            </div>

            <div className="productDetails flex gap-5 p-5">
                {/* Left Side (Image Section) */}
                {
                    products?.image?.length !== 0 &&
                    <div className="w-[50%]">
                        <div className="flex gap-3">
                            {/* Small Thumbnails */}
                            <div className="slider w-[15%]">
                                <Swiper
                                    direction={"vertical"}
                                    slidesPerView={4}
                                    spaceBetween={10}
                                    navigation={true}
                                    modules={[Navigation]}
                                    ref={zoomSliderSmall}
                                    className="productZoomSwiper h-[500px] overflow-hidden"
                                >
                                    {products?.image?.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div
                                                className={`item rounded-md overflow-hidden cursor-pointer group ${sliderIndex === index ? "opacity-100" : "opacity-30"
                                                    }`}
                                                onClick={() => goTo(index)}
                                            >
                                                <img
                                                    src={item}
                                                    alt=""
                                                    className="w-full transition-all group-hover:scale-105"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            {/* Big Zoom Image */}
                            {
                                products?.image?.length > 0 && (
                                    <div className="zoomContainer w-[500px] h-[500px] overflow-hidden">
                                        <Swiper
                                            slidesPerView={1}
                                            spaceBetween={10}
                                            ref={zoomSliderBig}
                                            modules={[Navigation]}
                                        >
                                            {products?.image?.map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <InnerImageZoom
                                                        src={item}
                                                        zoomType="hover"
                                                        zoomScale={1}
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                }


                {/* Right Side (Details Section) */}
                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">
                        {products?.name}
                    </h3>
                    <p className="mb-2">
                        <b>Brand:</b> {products?.brand}
                    </p>
                    <p className="mb-2">
                        <b>Category:</b> {products?.category?.name}
                    </p>
                    {products?.size && products?.size.length > 0 && (
                        <p className="mb-2">
                            <b>Size:</b>{" "}
                            {products.size.map((size, index) => (
                                <span key={index} className="px-2 py-1 border rounded mx-1">{size}</span>
                            ))}
                        </p>
                    )}
                    <p className="mb-2">
                        <b>Review:</b> {products?.rating}
                    </p>
                    <p className="mb-2">
                        <b>Published:</b> {new Date(products?.createdAt).toLocaleDateString().replace(/\//g, '-')}
                    </p>

                    <h4 className="text-lg font-semibold mt-4 mb-2">Product Description</h4>
                    <p className="text-gray-600 leading-relaxed">
                        {products?.description}
                    </p>
                </div>
            </div>

            <br /> <br />
            {/* Customer Reviews Section */}
            <h2 className="text-[20px] font-[600] text-[#333]">Customer Reviews</h2>
            <div className="mt-4 border rounded">
                <div className="reviewsScroll w-full max-h-[340px] overflow-y-auto mt-5 pr-5">
                    {(products?.reviews && products.reviews.length) ? (
                        products.reviews.map((r, idx) => (
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
                                                    <img key={i} src={img} alt={`review-${i}`} className="w-20 h-20 object-cover rounded" />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <Rating name="size-small" value={r.rating} readOnly />
                            </div>
                        ))
                    ) : (
                        <div className="text-[14px] text-[#666] p-4">No reviews yet.</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
