import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Navigation } from "swiper/modules";
import BannerBox from "../BannerBox";
import { getData } from '../../utils/api';

const FALLBACK = [
  {
    img: "https://serviceapi.spicezgold.com/download/1741663363237_1737020916820_New_Project_52.jpg",
    title: "Special Offer 1",
    price: "₹999",
    cta: "Shop Now",
    position: "right",
    _id: 'f1'
  },
  {
    img: "https://serviceapi.spicezgold.com/download/1741663408792_1737020756772_New_Project_1.png",
    title: "Special Offer 2",
    price: "₹1999",
    cta: "Shop Now",
    position: "left",
    _id: 'f2'
  },
  {
    img: "https://serviceapi.spicezgold.com/download/1741664496923_1737020250515_New_Project_47.jpg",
    title: "Special Offer 3",
    price: "₹2999",
    cta: "Shop Now",
    position: "left",
    _id: 'f3'
  },
  {
    img: "https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg",
    title: "Special Offer 4",
    price: "₹3999",
    cta: "Shop Now",
    position: "right",
    _id: 'f4'
  }
];

const AdsBannerSlide = (props) => {
  const [banners, setBanners] = useState([]);

  const fetch = async () => {
    try {
      const res = await getData('/api/v1/banner');
      const list = (res && res.data) ? res.data : [];
      // Only show Banner-1 entries in this component. Treat missing listType as 'banner1'.
      const onlyBanner1 = list.filter(b => ((b.listType || 'banner1').toString() === 'banner1'));
      // if position prop provided, filter by it
      const filtered = props.position ? onlyBanner1.filter(b => (b.position || '').toString() === props.position.toString()) : onlyBanner1;
      setBanners(filtered.length ? filtered : []);
    } catch (err) {
      console.error('Failed to fetch ads banners', err);
      setBanners([]);
    }
  };

  useEffect(() => {
    fetch();
    // optionally refetch when position changes
  }, [props.position]);

  const slides = (banners && banners.length) ? banners : FALLBACK;

  return (
    <div className="w-full py-8">
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        pagination={{ clickable: true }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {slides.map(b => {
          let link = b.link || '';
          if (!link) {
            if (b.thirdCategory) link = `/productListing?thirdSubCatId=${b.thirdCategory}`;
            else if (b.subCategory) link = `/productListing?subCatId=${b.subCategory}`;
            else if (b.category) link = `/productListing?categoryId=${b.category}`;
            else link = '';
          }

          return (
            <SwiperSlide key={b._id}>
              <BannerBox img={b.img} title={b.title} price={b.price} cta={b.cta} position={b.position} link={link} listType={b.listType} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  );
};

export default AdsBannerSlide;
