import React from 'react'
import { Link } from 'react-router-dom'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Navigation } from 'swiper/modules';

const HomeCatSlider = () => {
  return (
    <div className="homeCatSlider py-8 pt-4">
      <div className="container">
        <Swiper
          slidesPerView={8}
          spaceBetween={10}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Link to="/category/1">
              <div className="item p-3 bg-white rounded-md text-center flex items-center justify-center flex-col">
                <img src="https://serviceapi.spicezgold.com/download/1744509970781_fash.png" alt="" className='w-[70px] transition-all' />
                <h3 className='text-[15px] font-[500] mt-3'>Fashion</h3>
              </div>
            </Link>
          </SwiperSlide>


          <SwiperSlide>
            <Link to="/category/1">
              <div className="item p-3 bg-white rounded-md text-center flex items-center justify-center flex-col">
                <img src="https://serviceapi.spicezgold.com/download/1741660988059_ele.png" alt="" className='w-[70px] transition-all' />
                <h3 className='text-[15px] font-[500] mt-3'>Electronics</h3>
              </div>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to="/category/1">
              <div className="item p-3 bg-white rounded-md text-center flex items-center justify-center flex-col">
                <img src="https://serviceapi.spicezgold.com/download/1741661045887_bag.png" alt="" className='w-[70px] transition-all' />
                <h3 className='text-[15px] font-[500] mt-3'>Bags</h3>
              </div>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to="/category/1">
              <div className="item p-3 bg-white rounded-md text-center flex items-center justify-center flex-col">
                <img src="https://serviceapi.spicezgold.com/download/1741661061379_foot.png" alt="" className='w-[70px] transition-all' />
                <h3 className='text-[15px] font-[500] mt-3'>Footwear</h3>
              </div>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to="/category/1">
              <div className="item p-3 bg-white rounded-md text-center flex items-center justify-center flex-col">
                <img src="https://serviceapi.spicezgold.com/download/1741661077633_gro.png" alt="" className='w-[70px] transition-all' />
                <h3 className='text-[15px] font-[500] mt-3'>Grocery</h3>
              </div>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to="/category/1">
              <div className="item p-3 bg-white rounded-md text-center flex items-center justify-center flex-col">
                <img src="https://serviceapi.spicezgold.com/download/1741661092792_beauty.png" alt="" className='w-[70px] transition-all' />
                <h3 className='text-[15px] font-[500] mt-3'>Beauty</h3>
              </div>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to="/category/1">
              <div className="item p-3 bg-white rounded-md text-center flex items-center justify-center flex-col">
                <img src="https://serviceapi.spicezgold.com/download/1741661105893_well.png" alt="" className='w-[70px] transition-all' />
                <h3 className='text-[15px] font-[500] mt-3'>Wellness</h3>
              </div>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to="/category/1">
              <div className="item p-3 bg-white rounded-md text-center flex items-center justify-center flex-col">
                <img src="https://serviceapi.spicezgold.com/download/1741661120743_jw.png" alt="" className='w-[70px] transition-all' />
                <h3 className='text-[15px] font-[500] mt-3'>Jewellery</h3>
              </div>
            </Link>
          </SwiperSlide>

        </Swiper>
      </div>
    </div>
  )
}

export default HomeCatSlider