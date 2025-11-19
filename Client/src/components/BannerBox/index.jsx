// import React from 'react'

// const BannerBox = (props) => {
//     return (
//         // <div className="box bannerBox">
//         //     <img
//         //         src={props.img}
//                 // alt="banner"
//         //         className="w-full transition-all group-hover:scale-110 "
//         //     /> 
//         // </div>

//         <div className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer">
//         {/* Background Image with Hover Scale */}
//         <img
//           src={props.img}
//           alt="Women Product"
//           className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
//         />

//         {/* Overlay Content */}
//         <div className="absolute inset-0 flex items-center pr-4">
//           <div className="text-right">
//             <p className="text-black text-base font-medium leading-snug">
//               Buy women<br />products with<br />low price
//             </p>
//             <p className="text-red-500 text-xl font-bold mt-1">₹999</p>
//             <a
//               href="#"
//               className="mt-2 inline-block text-sm font-semibold underline text-black hover:text-blue-600"
//             >
//               SHOP NOW
//             </a>
//           </div>
//         </div>
//       </div>


//     )
// }

// export default BannerBox


import React from 'react';
import { Link } from 'react-router-dom';

const BannerBox = ({
    img,
    title = '',
    price = '',
    cta = 'SHOP NOW',
    altText = 'Banner',
    position = 'right', // 'left' or 'right' - indicates where image sits
    link = null,
    category = null,
    subCategory = null,
    thirdCategory = null,
    className = '',
    listType = null
}) => {
    // If link is internal (starts with '/'), use react-router Link for SPA navigation.
    // We also compute a link from category refs if explicit link not provided.
    const computedFromCats = (() => {
        if (thirdCategory) return `/productListing?thirdSubCatId=${thirdCategory}`;
        if (subCategory) return `/productListing?subCatId=${subCategory}`;
        if (category) return `/productListing?categoryId=${category}`;
        return '';
    })();

    const finalLink = (typeof link === 'string' && link) ? link : (computedFromCats || '');
    const isInternal = finalLink && finalLink.startsWith('/');

    // Text alignment follows the `position` value from admin.
    // If `position === 'right'` text will be on the right; if `position === 'left'` text will be on the left.
    const textOnLeft = position === 'left';

    const Content = () => (
        <div className={`relative h-[200px] rounded-xl overflow-hidden shadow-lg group ${className}`} role="region" aria-label={title || 'Banner'}>
            {img ? (
                <img
                    src={img}
                    alt={altText}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
            ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">No Image</div>
            )}

            <div className="absolute inset-0 bg-black bg-opacity-20" aria-hidden="true"></div>

            <div className={`absolute inset-0 flex items-center ${textOnLeft ? 'justify-start pl-6' : 'justify-end pr-6'}`}>
                <div className={`text-white max-w-[60%] ${textOnLeft ? 'text-left' : 'text-right'}`}>
                    {title ? <h3 className="text-xl font-bold mb-1 drop-shadow-md">{title}</h3> : null}
                    {price ? <p className="text-2xl font-extrabold mb-2 text-red-400 drop-shadow-md">₹{price}</p> : null}
                    {/* Button: if we have a link (explicit or computed), make the button navigate; otherwise render static button */}
                    {/* Only show CTA for banners that are not of type 'banner2' */}
                    {(() => {
                        const showCTA = !!cta && (String(listType || '').toLowerCase() !== 'banner2');
                        if (!showCTA) return null;

                        if (finalLink) {
                            return isInternal ? (
                                <Link to={finalLink} className="inline-block mt-2">
                                    <button className="px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition-colors">
                                        {cta}
                                    </button>
                                </Link>
                            ) : (
                                <a href={finalLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-2">
                                    <button className="px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition-colors">
                                        {cta}
                                    </button>
                                </a>
                            );
                        }

                        return (
                            <button className="mt-2 px-4 py-2 bg-white text-black font-semibold rounded-md opacity-90 cursor-default">
                                {cta}
                            </button>
                        );
                    })()}
                </div>
            </div>
        </div>
    );

    if (!finalLink) return <Content />;

    return isInternal ? (
        <Link to={finalLink} className="block" aria-label={`Open ${title || 'banner'}`}>
            <Content />
        </Link>
    ) : (
        <a href={finalLink} target="_blank" rel="noopener noreferrer" className="block" aria-label={`Open external link ${title || ''}`}>
            <Content />
        </a>
    );
};

export default BannerBox;