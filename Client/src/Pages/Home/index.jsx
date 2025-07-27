import React, { useState } from 'react'
import HomeSlider from '../../components/HomeSlider'
import HomeCatSlider from '../../components/HomeCatSlider'
import { FaShippingFast } from "react-icons/fa";
import AdsBannerSlide from '../../components/AdsBannerSlide';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductsSlider from '../../components/ProductsSlider';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Autoplay } from 'swiper/modules';
import BlogItem from '../../components/BlogItem';
import Footer from '../../components/Footer';
import HomeSliderV2 from '../../components/HomeSliderV2';
import BannerBoxV2 from '../../components/BannerBoxV2';




const Home = () => {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <HomeSlider />
      <HomeCatSlider />
     

      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="leftSec">
              <h2 className="text-[22px] font-[600] text-[rgba(0,0,0,0.8)] ">
                Popular Categories
              </h2>
              <p className="text-[14px] font-[400] text-[rgba(0,0,0,0.6)]">
                Do not miss the current offers until the end of March.
              </p>
            </div>

            <div className="rightSec w-[65%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Fashion" />
                <Tab label="Electronics" />
                <Tab label="Bags" />
                <Tab label="Footwear" />
                <Tab label="Grocery" />
                <Tab label="Beauty" />
                <Tab label="Wellness" />
                <Tab label="Jewellery" />
              </Tabs>
            </div>
          </div>

          <ProductsSlider items={6} />
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="container flex gap-5">
          <div className="part1 w-[70%] ">
            <HomeSliderV2 />
          </div>

          <div className="part2 w-[30%] flex items-center justify-center gap-5 flex-col">
            <BannerBoxV2 img="https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg" info="right" />
            <BannerBoxV2 img="https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg" info="left" />
          </div>
        </div>
      </section>

      <section className=" py-16 pt-2 bg-white">
        <div className="container">
          <div className="freeShipping w-[80%] mx-auto py-4 p-4 border-2 border-[#ff5252] flex items-center justify-between rounded-md mb-8">
            <div className='col1 flex items-center gap-4'>

              <FaShippingFast className='icon text-[50px]  text-[#ff5252]' />

              <h3 className='text-[25px] font-[600] text-[rgba(0,0,0,0.8)] uppercase '>Free Shipping</h3>
            </div>

            <div className='col2'>
              <h3 className='text-[17px] font-[500] text-[rgba(0,0,0,0.6)]'>Free Delivery Now On all orders over $100</h3>

            </div>
            <h3 className='text-[20px] font-bold text-[rgba(0,0,0,0.8)]'>- Only $200*</h3>
          </div>

          <AdsBannerSlide items={4} />

        </div>
      </section>

      <div className="py-5 p-0 bg-white">
        <div className="container ">

          <h2 className="text-[22px] font-[600] text-[rgba(0,0,0,0.8)]">Latest Products</h2>
          <ProductsSlider items={6} />

        </div>
      </div>

      <div className="py-5 p-0 bg-white">
        <div className="container ">

          <h2 className="text-[22px] font-[600] text-[rgba(0,0,0,0.8)]">Featured Products</h2>
          <ProductsSlider items={6} />

        </div>
      </div>

      <section className="py-5 bg-white pt-0 blogSection">
        <div className="container">
          <h2 className="text-[20px] font-[600] mb-4">From the Blog</h2>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            navigation={true}
            pagination={false}
            modules={[Navigation]}
            className="blogSlider">
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>

            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>

            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>

            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>

          </Swiper>
        </div>
      </section>

      

    </>
  )

}

export default Home