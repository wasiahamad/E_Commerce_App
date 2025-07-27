import React from "react";
import { BiTimeFive } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const BlogItem = () => {
    return (
        <div className="blogItem group">
            <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
                <img
                    src="https://serviceapi.spicezgold.com/download/1741759053899_5-2.jpg"
                    alt="Blog"
                    className="w-full transition-all group-hover:scale-105 duration-300"
                />
                <span className="absolute bottom-2 right-2 bg-[#ff5252] text-white text-[12px] font-[500] p-1 rounded-md flex items-center justify-center">
                    <BiTimeFive className="mr-1 text-[16px]" /> 2 days ago
                </span>
            </div>

            <div className="info py-4">
                <h2 className="text-[14px] font-[600] text-black mb-2 ">
                    <Link to="/blog/1" className="link">
                        Top 10 Best Selling Electronics Brands in India
                    </Link>
                </h2>

                <p className="text-[16px] font-[400] text-[rgba(0,0,0,0.6)] mb-4">
                    Discover the top 10 best-selling electronics brands in India. From
                    smartphones to laptops, explore the most popular choices among
                    consumers......
                </p>

                <Link
                    className="link font-[500] !text-[14px] flex items-center gap-1"
                    to="/"
                >
                    Read more <IoIosArrowForward />
                </Link>
            </div>
        </div>
    );
};

export default BlogItem;
