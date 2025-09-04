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
import { getData, getProducts } from "../../utils/api";

const ProductDetails = () => {
    const [sliderIndex, setSliderIndex] = useState(0);
    const zoomSliderBig = useRef(null);
    const zoomSliderSmall = useRef(null);
    const [products, setProducts] = useState([]);

    const goTo = (index) => {
        setSliderIndex(index);
        zoomSliderBig.current.swiper.slideTo(index);
        zoomSliderSmall.current.swiper.slideTo(index);
    };

    const { id } = useParams();

    useEffect(() => {
        // Fetch product details using the id
        getData(`/api/v1/product/${id}`).then((data) => {
            if (data?.error === false) {
                // Handle the fetched data
                setProducts(data?.data);
            }
        });
    }, [id]);

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
                    <p className="mb-2">
                        <b>Size:</b>{" "}
                        {
                            products?.size && products?.size.length > 0 ? (
                                products?.size.map((size, index) => (
                                    <span key={index} className="px-2 py-1 border rounded mx-1">{size}</span>
                                ))
                            ) : (
                                <span className="px-2 py-1 border rounded mx-1">N/A</span>
                            )
                        }
                    </p>
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
        </>
    );
};

export default ProductDetails;
