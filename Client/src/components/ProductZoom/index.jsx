import React, { use, useRef, useState } from 'react'
import 'react-inner-image-zoom/lib/styles.min.css';
import InnerImageZoom from 'react-inner-image-zoom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Navigation } from 'swiper/modules';
import { GoTools } from 'react-icons/go';

const ProductZoom = () => {

    const [sliderIndex, setSliderIndex] = useState(0);
    const zoomSliderBig = useRef(null);
    const zoomSliderSmall = useRef(null);

    const goTo = (index) => {
        setSliderIndex(index);
        zoomSliderBig.current.swiper.slideTo(index);
        zoomSliderSmall.current.swiper.slideTo(index);
    }
    return (
        <>
            <div className="flex gap-3">
                <div className="slider w-[15%]">
                    <Swiper
                        direction={'vertical'}
                        slidesPerView={4}
                        spaceBetween={10}
                        navigation={true}
                        modules={[Navigation]}
                        ref={zoomSliderSmall}
                        className="productZoomSwiper h-[500px]  overflow-hidden"
                    >
                        <SwiperSlide >
                            <div className={`item rounded-md overflow-hidden cursor-pointer group ${sliderIndex===0? 'opacity-1': 'opacity-30'}`} onClick={() => goTo(0)}>
                                <img src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp" alt="" className='w-full transition-all group-hover:scale-105' />
                            </div>
                        </SwiperSlide>

                        <SwiperSlide >
                            <div className={`item rounded-md overflow-hidden cursor-pointer group ${sliderIndex===1? 'opacity-1': 'opacity-30'}`} onClick={() => goTo(1)}>
                                <img src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp" alt="" className='w-full transition-all group-hover:scale-105' />
                            </div>
                        </SwiperSlide>

                        <SwiperSlide >
                            <div className={`item rounded-md overflow-hidden cursor-pointer group ${sliderIndex===2? 'opacity-1': 'opacity-30'}`} onClick={() => goTo(2)}>
                                <img src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp" alt="" className='w-full transition-all group-hover:scale-105' />
                            </div>
                        </SwiperSlide>

                        <SwiperSlide >
                            <div className={`item rounded-md overflow-hidden cursor-pointer group ${sliderIndex===3? 'opacity-1': 'opacity-30'}`} onClick={() => goTo(3)}>
                                <img src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp" alt="" className='w-full transition-all group-hover:scale-105' />
                            </div>
                        </SwiperSlide>

                        <SwiperSlide >
                            <div className={`item rounded-md overflow-hidden cursor-pointer group ${sliderIndex===4? 'opacity-1': 'opacity-30'}`} onClick={() => goTo(4)}>
                                <img src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp" alt="" className='w-full transition-all group-hover:scale-105' />
                            </div>
                        </SwiperSlide>

                        <SwiperSlide >
                            <div className={`item rounded-md overflow-hidden cursor-pointer group ${sliderIndex===5? 'opacity-1': 'opacity-30'}`} onClick={() => goTo(5)}>
                                <img src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp" alt="" className='w-full transition-all group-hover:scale-105' />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>

                <div className="zoomContainer w-[85%] h-[500px] overflow-hidden">
                    <Swiper
                        
                        slidesPerView={1}
                        spaceBetween={10}
                        ref={zoomSliderBig}
                        modules={[Navigation]}
                    >
                        <SwiperSlide >
                            <InnerImageZoom
                                src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp"
                                zoomType='hover'
                                zoomScale={1}
                            />
                        </SwiperSlide>

                        <SwiperSlide >
                            <InnerImageZoom
                                src="https://serviceapi.spicezgold.com/download/1742462383491_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-2-202308161432.webp"
                                zoomType='hover'
                                zoomScale={1}
                            />
                        </SwiperSlide>

                        <SwiperSlide >
                            <InnerImageZoom
                                src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg"
                                zoomType='hover'
                                zoomScale={1}
                            />
                        </SwiperSlide>

                        <SwiperSlide >
                            <InnerImageZoom
                                src="https://serviceapi.spicezgold.com/download/1742462383495_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp"
                                zoomType='hover'
                                zoomScale={1}
                            />
                        </SwiperSlide>

                        <SwiperSlide >
                            <InnerImageZoom
                                src="https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp"
                                zoomType='hover'
                                zoomScale={1}
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default ProductZoom