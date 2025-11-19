import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { getData } from '../../utils/api';
import BannerBox from '../BannerBox';

const ManagedBanner = (props) => {
    const [banners, setBanners] = useState([]);
    const pollingRef = useRef(null);
    const lastIdsRef = useRef('');

    const fetchBanners = async () => {
        try {
            const res = await getData('/api/v1/banner');
            const newList = (res && res.data) ? (res.data || []) : [];
            // Only keep banners marked for Banner List-2 when this component is used for that area
            const filteredByList = newList.filter(b => (b.listType || '').toString() === (props.listType || 'banner2'));

            // only update state when the banner ids actually change to avoid re-renders
            const ids = filteredByList.map(b => b._id).join(',');
            if (ids !== lastIdsRef.current) {
                lastIdsRef.current = ids;
                setBanners(filteredByList);
            }
        } catch (err) {
            console.error('Failed to load banners', err);
        }
    };

    useEffect(() => {
        let mounted = true;

        const startPolling = () => {
            // fetch immediately then poll every 5s while page is visible
            fetchBanners();
            if (pollingRef.current) clearInterval(pollingRef.current);
            pollingRef.current = setInterval(() => {
                if (document.visibilityState === 'visible') fetchBanners();
            }, 5000);
        };

        startPolling();

        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                // fetch immediately when tab becomes active
                fetchBanners();
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            mounted = false;
            document.removeEventListener('visibilitychange', handleVisibility);
            if (pollingRef.current) clearInterval(pollingRef.current);
        };
    }, []);

    if (!banners || banners.length === 0) return null;

    const slidesPerView = props.items || 4;

    return (
        <div className="w-full py-6 opacity-100">
            <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={16}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: Math.min(2, slidesPerView) },
                    1024: { slidesPerView: Math.min(3, slidesPerView) },
                    1280: { slidesPerView: slidesPerView }
                }}
            >
                {banners.map((b) => {
                    // build client-side link: prefer explicit link, otherwise build from category ids
                    let link = b.link || '';
                    if (!link) {
                        if (b.thirdCategory) link = `/productListing?thirdSubCatId=${b.thirdCategory}`;
                        else if (b.subCategory) link = `/productListing?subCatId=${b.subCategory}`;
                        else if (b.category) link = `/productListing?categoryId=${b.category}`;
                        else link = '';
                    }

                    // pass a className to BannerBox so it renders as a compact card fitting the slider
                    return (
                        <SwiperSlide key={b._id}>
                            <div className="px-2">
                                    <BannerBox img={b.img} title={b.title} price={b.price} position={b.position} link={link} className="h-[190px] !opacity-100" listType={b.listType} />
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default ManagedBanner;
