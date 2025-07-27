import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import { Button, Rating } from "@mui/material";

const ListCartItems = (props) => {


    return (
        <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)] ">
            <div className="img w-[15%] rounded-md overflow-hidden ">
                <Link to="/product/1" className="group">
                    <img
                        src="https://serviceapi.spicezgold.com/download/1742439426968_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-2-202403231855.jpg"
                        alt=""
                        className="w-full group-hover:scale-105 "
                    />
                </Link>
            </div>

            <div className="info w-[85%] relative">
                <IoMdClose className="text-[20px] text-[#000] cursor-pointer absolute top-[10px] right-[0px] link" />
                <span className="text-[12px] font-[300]">Allen Solly</span>
                <h4 className="text-[15px] font-[600] text-[#000]">
                    <Link to="/product/1" className="link">
                        Men Pure Cotton Striped Casual Shirt
                    </Link>
                </h4>

                <Rating
                    name="size-small"
                    defaultValue={4}
                    size="small"
                    readOnly
                    className="!text-[15px]"
                />

                <div className="flex items-center gap-4">
                    <p className="text-[14px] font-[500] text-[rgba(0,0,0,0.8)]">
                        <span className="text-[#000] font-[600]">₹7999</span>
                        <span className="text-[rgba(0,0,0,0.5)] line-through ml-2">
                            ₹9999
                        </span>
                    </p>
                    <p className="text-[14px] font-[600] text-[#ff5252] py-1">20% off</p>
                </div>

                <Button className=" !bg-[#ff5252] !text-white !py-1 !px-3 ">Add to Card</Button>
            </div>
        </div>
    );
};

export default ListCartItems;
