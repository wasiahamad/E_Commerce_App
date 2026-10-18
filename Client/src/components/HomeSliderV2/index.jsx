import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Button } from '@mui/material';


const HomeSliderV2 = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                autoplay={{
                    delay: 3000, // 3 seconds
                    disableOnInteraction: false, // Keeps autoplay running after user interaction
                }}
                loop={true}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                className="homeSliderV2"
            >
                <SwiperSlide>
                    <div className="item overflow-hidden rounded-md w-full relative ">
                        <img src="/public/banner1.avif" />

                        <div className="info absolute top-0 right-[-100%] opacity-0 w-[50%] p-8 z-50 h-[100%] flex items-center justify-center flex-col transition-all duration-1000">
                            <h4 className="text-[20px] font-[400] text-[rgba(0,0,0,0.8)] w-full mb-4 relative -right-[100%] opacity-0 ">
                                Big Saving Days Sale
                            </h4>
                            <h2 className='text-[35px] font-[600] text-[rgba(0,0,0,0.8)] mt-2 w-full  relative -right-[100%] opacity-0 '>
                                Women Solid Round Green T-shirt
                            </h2>
                            <h3 className='flex items-center gap-3 text-[18px] font-[500] text-[rgba(0,0,0,0.8)] mt-3 w-full mb-3  relative -right-[100%] opacity-0 '>
                                Starting at <span className='text-[#ff5252] text-[30px] font-[700]'>$99.99</span>
                            </h3>
                            <div className="w-full relative -right-[100%] opacity-0 btn_">
                                <Button className='!bg-[#ff5252] !text-white !rounded-md !h-[40px] !w-[150px] !min-w-[150px]  '>Shop Now</Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="item overflow-hidden rounded-md w-full  ">
                        <img src="/public/banner2.avif" />

                        <div className="info absolute top-0 right-[-100%] opacity-0 w-[50%] p-8 z-50 h-[100%] flex items-center justify-center flex-col transition-all duration-1000">
                            <h4 className="text-[20px] font-[400] text-[rgba(0,0,0,0.8)] w-full mb-4 relative -right-[100%] opacity-0 ">
                                Big Saving Days Sale
                            </h4>
                            <h2 className='text-[35px] font-[600] text-[rgba(0,0,0,0.8)] mt-2 w-full  relative -right-[100%] opacity-0 '>
                                Women Solid Round Green T-shirt
                            </h2>
                            <h3 className='flex items-center gap-3 text-[18px] font-[500] text-[rgba(0,0,0,0.8)] mt-3 w-full mb-3  relative -right-[100%] opacity-0 '>
                                Starting at <span className='text-[#ff5252] text-[30px] font-[700]'>$99.99</span>
                            </h3>
                            <div className="w-full relative -right-[100%] opacity-0 btn_">
                                <Button className='!bg-[#ff5252] !text-white !rounded-md !h-[40px] !w-[150px] !min-w-[150px]  '>Shop Now</Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </>
    )
}

export default HomeSliderV2