import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import BannerBox from "../BannerBox";
import ProductsItem from '../ProductsItem';

const ProductsSlider = (props) => {
    return (
        <div className="productsSlider py-5">
            <Swiper
                slidesPerView={props.items}
                spaceBetween={10}

                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <ProductsItem />
                </SwiperSlide>

                <SwiperSlide>
                    <ProductsItem />
                </SwiperSlide>

                <SwiperSlide>
                    <ProductsItem />
                </SwiperSlide>

                <SwiperSlide>
                    <ProductsItem />
                </SwiperSlide>

                <SwiperSlide>
                    <ProductsItem />
                </SwiperSlide>

                <SwiperSlide>
                    <ProductsItem />
                </SwiperSlide>

                <SwiperSlide>
                    <ProductsItem />
                </SwiperSlide>

                <SwiperSlide>
                    <ProductsItem />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default ProductsSlider