import React from 'react'
// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Autoplay } from 'swiper/modules';


const HomeSlider = () => {
    return (
        <>
            <div className="homeSlider py-4">
                <div className="container">
                    <Swiper
                        spaceBetween={10}
                        navigation={true}
                        autoplay={{
                            delay: 3000, // 3 seconds
                            disableOnInteraction: false, // Keeps autoplay running after user interaction
                        }}
                        loop={true}
                        pagination={false}
                        modules={[Navigation, Autoplay]}
                        className="homeSlider">
                        <SwiperSlide>
                            <img src="https://serviceapi.spicezgold.com/download/1741660907985_NewProject.jpg" alt="Slide 1" className='w-full' />

                        </SwiperSlide>

                        <SwiperSlide>
                            <img src="https://serviceapi.spicezgold.com/download/1741660881858_NewProject(11).jpg" alt="Slide 1" className='w-full' />

                        </SwiperSlide>

                        <SwiperSlide>
                            <img src="https://serviceapi.spicezgold.com/download/1741660777364_NewProject(12).jpg" alt="Slide 1" className='w-full' />

                        </SwiperSlide>

                        <SwiperSlide>
                            <img src="https://serviceapi.spicezgold.com/download/1741660862304_NewProject(8).jpg" alt="Slide 1" className='w-full' />

                        </SwiperSlide>

                        <SwiperSlide>
                            <img src="https://serviceapi.spicezgold.com/download/1741660777364_NewProject(12).jpg" alt="Slide 1" className='w-full' />

                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default HomeSlider