import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Navigation } from "swiper/modules";
import BannerBox from "../BannerBox";

const AdsBannerSlide = (props) => {
  return (
    <div className="w-full py-8">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}

        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <BannerBox
            img={"https://serviceapi.spicezgold.com/download/1741663363237_1737020916820_New_Project_52.jpg"}
            title="Special Offer 1"
            price="₹999"
            cta="Shop Now"
            position="right"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={"https://serviceapi.spicezgold.com/download/1741663408792_1737020756772_New_Project_1.png"}
            title="Special Offer 2"
            price="₹1999"
            cta="Shop Now"
            position="left"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={"https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg"}
            title="Special Offer 3"
            price="₹2999"
            cta="Shop Now"
            position="left"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox
            img={"https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"}
            title="Special Offer 4"
            price="₹3999"
            cta="Shop Now"
            position="right"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AdsBannerSlide;
