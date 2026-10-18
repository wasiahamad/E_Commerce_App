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
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=85",
    title: "Fresh Groceries, Every Day",
    subtitle: "Farm-Fresh Fruits & Vegetables",
    description: "Bring home freshness with quality fruits and vegetables at great prices.",
    price: "Starting ₹49",
    cta: "Shop Now",
    position: "right",
    _id: "g1"
  },
  {
    img: "https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&w=1600&q=85",
    title: "Your Daily Grocery Essentials",
    subtitle: "Everything Your Kitchen Needs",
    description: "Shop rice, pulses, cooking oils and everyday household essentials.",
    price: "Starting ₹99",
    cta: "Explore Products",
    position: "left",
    _id: "g2"
  },
  {
    img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1600&q=85",
    title: "Eat Fresh, Live Healthy",
    subtitle: "Fresh Food for a Better Life",
    description: "Discover fresh ingredients and make every meal healthier.",
    price: "Special Offers",
    cta: "Shop Fresh",
    position: "left",
    _id: "g3"
  },
  {
    img: "/public/banner.avif",
    title: "Smart Shopping Starts Here",
    subtitle: "Quality Products, Better Prices",
    description: "Your favourite grocery products at prices you'll love.",
    price: "Save More Today",
    cta: "Buy Now",
    position: "right",
    _id: "g4"
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
