import React, { useRef, useState } from 'react';
import { BsGift } from "react-icons/bs";
import { IoStatsChartSharp } from "react-icons/io5";
import { RiPieChartLine } from "react-icons/ri";
import { BsBank } from "react-icons/bs";
import { TbBrandProducthunt } from "react-icons/tb";


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';


// import './styles.css';
import 'swiper/css/navigation';

// import required modules
import { Navigation} from 'swiper/modules';
const DashboardBox = () => {
  return (
    <>
    <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBoxSwiper"
      >
        <SwiperSlide>
          <div className='box bg-white p-6 cursor-pointer hover:bg-[#f1faff] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 '>
            <BsGift size={30} className='text-[#3872fa]'/>
            <div className="info w-[70%]">
                <h2>New Order</h2>
                <b>1,000</b>
            </div>
            <IoStatsChartSharp size={50} className='text-[#3872fa]'/>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='box bg-white p-6 cursor-pointer hover:bg-[#f1faff] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 '>
            <RiPieChartLine size={40} className='text-[#10b981]' />
            <div className="info w-[70%]">
                <h2>Sales</h2>
                <b>1,000</b>
            </div>
            <IoStatsChartSharp size={50} className='text-[#10b981]'/>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='box bg-white p-6 cursor-pointer hover:bg-[#f1faff] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 '>
            <BsBank size={30} className='text-[#7928ca]' />
            <div className="info w-[70%]">
                <h2>Revenue</h2>
                <b>10,000</b>
            </div>
            <IoStatsChartSharp size={50} className='text-[#7928ca]'/>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className='box bg-white p-6 cursor-pointer hover:bg-[#f1faff] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4 '>
            <TbBrandProducthunt size={40} className='text-[#0a52a3]'/>
            <div className="info w-[70%]">
                <h2>Total Products</h2>
                <b>1,000</b>
            </div>
            <IoStatsChartSharp size={50} className='text-[#0a52a3]'/>
          </div>
        </SwiperSlide>
        
        
      </Swiper></>
  )
}

export default DashboardBox