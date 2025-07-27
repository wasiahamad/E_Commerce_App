import React, { useContext } from "react";
import "../ProductsItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { PiShoppingCartLight } from "react-icons/pi";
import { Button } from "@mui/material";
import { MdZoomOutMap } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoMdGitCompare } from "react-icons/io";
import { MyContext } from "../../App";

const ProductsItem = () => {
    const context = useContext(MyContext);

    return (
        <div className="produtcsItem shadow-lg  border-1 border-[rgba(0,0,0,0.1)] rounded-md relative">
            <div className="group imgWrapper w-[100%] rounded-md overflow-hidden relative">
                <Link to="/">
                    <div className="img h-[200px] overflow-hidden ">
                        <img
                            src="https://serviceapi.spicezgold.com/download/1742453278959_fgfg1.jpg"
                            alt="product"
                            className="w-full"
                        />

                        <img
                            src="https://serviceapi.spicezgold.com/download/1742453278960_fgfg3.jpg"
                            alt=""
                            className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-700  group-hover:scale-105"
                        />
                    </div>
                </Link>
                <span className="absolute top-2 left-2 text-[12px] font-[500] bg-[#ff5252] text-white px-2 py-1 rounded-xl z-10">
                    10%
                </span>

                <div className="actions absolute top-[-200px] right-[5px] flex items-center gap-2 z-50 flex-col w-[50px] transition-all duration-300 ease-in-out group-hover:top-[14px] opacity-0 group-hover:opacity-100">
                    <Button
                        className="!bg-white !text-[#000] hover:!bg-[#ff5252] hover:!text-white !rounded-full !h-[35px] !w-[35px] !min-w-[35px] group"
                        onClick={() => context.setOpenProductDetailModel(true)}
                    >
                        <MdZoomOutMap className="text-[500] font-[18px]" />
                    </Button>

                    <Button className="!bg-white !text-[#000] hover:!bg-[#ff5252] hover:!text-white !rounded-full !h-[35px] !w-[35px] !min-w-[35px] group">
                        <IoMdGitCompare className="text-[500] font-[18px]  " />
                    </Button>

                    <Button className="!bg-white !text-[#000] hover:!bg-[#ff5252] hover:!text-white !rounded-full !h-[35px] !w-[35px] !min-w-[35px] group">
                        <FaRegHeart className="text-[500] font-[18px]" />
                    </Button>
                </div>
            </div>

            <div className="info p-3 py-5 ">
                <h6 className="text-[13px] !font-[400]">
                    <Link to="/" className="link transition-all ">
                        Soyelen Bags
                    </Link>
                </h6>
                <h3 className="text-[14px] title mt-1 mb-1 font-[500] text-[rgba(0,0,0,0.8)]">
                    <Link to="/" className="link transition-all ">
                        Men Opaque Casual Shirt Soyelen Bags Black Soyelen Bags
                    </Link>
                </h3>

                <Rating name="size-small" defaultValue={4} size="small" readOnly />

                <div className="flex items-center gap-4">
                    <p className="text-[14px] font-[500] text-[rgba(0,0,0,0.8)]">
                        <span className="text-[rgba(0,0,0,0.5)] line-through">₹9999</span>
                        <span className="text-[#ff5252] font-[600]  ml-2">₹7999</span>
                    </p>
                    {/* <p className='text-[12px] font-[500] text-[#ff5252] bg-[#ffe3e3] px-2 py-1 rounded-md'>
                        20% off
                    </p> */}
                </div>

                <div className="btns flex items-center gap-2 mt-4">
                    <Button className="!bg-white !text-[#ff5252] hover:!bg-[#ff5252] hover:!text-white w-full !text-[13px] !font-semibold pr-2">
                        <PiShoppingCartLight size={20} className="mr-2" /> Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductsItem;
