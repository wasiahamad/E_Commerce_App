import React, { useRef, useState } from 'react'
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

const ProductZoom = ({ product }) => {
    const [sliderIndex, setSliderIndex] = useState(0);
    const zoomSliderBig = useRef(null);
    const zoomSliderSmall = useRef(null);

    const images = (product && (product.image || product.images)) || [];

    const goTo = (index) => {
        setSliderIndex(index);
        try {
            zoomSliderBig.current?.swiper?.slideTo(index);
            zoomSliderSmall.current?.swiper?.slideTo(index);
        } catch (e) {
            // ignore
        }
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
                        {(images.length ? images : [
                            "https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp"
                        ]).map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <div className={`item rounded-md overflow-hidden cursor-pointer group ${sliderIndex===idx? 'opacity-1': 'opacity-30'}`} onClick={() => goTo(idx)}>
                                    <img src={img} alt="" className='w-full transition-all group-hover:scale-105' />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="zoomContainer w-[85%] h-[500px] overflow-hidden">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        ref={zoomSliderBig}
                        modules={[Navigation]}
                    >
                        {(images.length ? images : [
                            "https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp"
                        ]).map((img, idx) => (
                            <SwiperSlide key={idx}>
                                <InnerImageZoom src={img} zoomType='hover' zoomScale={1} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default ProductZoom