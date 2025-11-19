import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import BannerBox from "../BannerBox";
import ProductsItem from '../ProductsItem';
import { getData } from '../../utils/api';

const ProductsSlider = (props) => {
    const { categoryId } = props;
    const [products, setProducts] = useState([]);

    const fetchProducts = async (catId) => {
        try {
            let res;
            if (catId) {
                res = await getData(`/api/v1/product/category/${catId}`);
            } else {
                res = await getData('/api/v1/product');
            }
            if (res && res.data) setProducts(res.data);
        } catch (err) {
            console.error('Error fetching products for slider', err);
        }
    }

    useEffect(() => {
        fetchProducts(categoryId);
    }, [categoryId]);

    return (
        <div className="productsSlider py-5">
            <Swiper
                slidesPerView={props.items}
                spaceBetween={10}

                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                {(products || []).slice(0, props.items || 8).map((p) => (
                    <SwiperSlide key={p._id}>
                        <ProductsItem {...p} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ProductsSlider