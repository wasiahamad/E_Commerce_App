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

const BannerBox = ({
    img,
    title = "Buy products with low price",
    price = "₹7999",
    cta = "SHOP NOW",
    altText = "Product",
    position = "right" // 'left' or 'right' to control text alignment
}) => {
    return (
        <div className="relative h-[200px] rounded-xl overflow-hidden shadow-lg group cursor-pointer">
            {/* Background Image with Hover Effect */}
            <img
                src={img}  
                alt={altText}
                className="w-full transition-all duration-500 ease-in-out group-hover:scale-110"
            />

            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>

            {/* Content Container */}
            <div className={`absolute inset-0 flex items-center ${position === 'right' ? 'justify-end pr-6' : 'justify-start pl-6'}`}>
                <div className={`text-white max-w-[60%] ${position === 'right' ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-xl font-bold mb-1 drop-shadow-md">{title}</h3>
                    <p className="text-2xl font-extrabold mb-2 text-red-400 drop-shadow-md">{price}</p>
                    <button className="mt-2 px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-100 transition-colors">
                        {cta}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BannerBox;