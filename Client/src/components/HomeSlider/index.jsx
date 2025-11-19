import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Autoplay } from 'swiper/modules';
import { getData } from '../../utils/api';

const FALLBACK = [
    'https://serviceapi.spicezgold.com/download/1741660907985_NewProject.jpg',
    'https://serviceapi.spicezgold.com/download/1741660881858_NewProject(11).jpg',
    'https://serviceapi.spicezgold.com/download/1741660777364_NewProject(12).jpg'
];

const HomeSlider = () => {
    const [items, setItems] = useState([]);

    const fetch = async () => {
        try {
            const res = await getData('/api/v1/homeSlider');
            const list = (res && res.data) ? res.data : [];
            setItems(list);
        } catch (err) {
            console.error('Failed to fetch home slider', err);
            setItems([]);
        }
    };

    useEffect(() => { fetch(); }, []);

    const slides = (items && items.length) ? items.map(i => i.img) : FALLBACK;

    return (
        <div className="homeSlider pb-3 pt-12">
            <div className="container">
                <Swiper
                    spaceBetween={10}
                    navigation={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    modules={[Navigation, Autoplay]}
                    className="homeSlider"
                >
                    {slides.map((src, idx) => (
                        <SwiperSlide key={idx}>
                            <img src={src} alt={`slide-${idx}`} className='w-full h-[400px] object-cover' />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default HomeSlider;