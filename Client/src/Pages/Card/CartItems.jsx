import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const CartItems = (props) => {

    // for cart size 
    const [sizeAnchorEl, setSizeAnchorEl] = useState(null);
    const [selectedSize, setSelectedSize] = useState(props.size);
    const openSize = Boolean(sizeAnchorEl);

    // for cart qty
    const [qtyAnchorEl, setQtyAnchorEl] = useState(null);
    const [selectedQty, setSelectedQty] = useState(props.qty);
    const openQty = Boolean(qtyAnchorEl);

    // for cart size
    const handleClickSize = (event) => {
        setSizeAnchorEl(event.currentTarget);
    };
    const handleCloseSize = (value) => {
        setSizeAnchorEl(null);
        if (value !== null) {
            setSelectedSize(value);
        }
    };

    // for cart qty
    const handleClickQty = (event) => {
        setQtyAnchorEl(event.currentTarget);
    };
    const handleCloseQty = (value) => {
        setQtyAnchorEl(null);
        if (value !== null) {
            setSelectedQty(value);
        }
    };

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

                <div className="flex items-center gap-4 mt-1">
                    <div className="relative">
                        <span
                            className="flex items-center justify-center bg-[#f1f1f1]  text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer"
                            onClick={handleClickSize}
                        >
                            Size: {selectedSize} <GoTriangleDown />
                        </span>

                        <Menu
                            id="size-menu"
                            anchorEl={sizeAnchorEl}
                            open={openSize}
                            onClose= {() => handleCloseSize(null)}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem onClick={() => handleCloseSize("S")}>S</MenuItem>
                            <MenuItem onClick={() => handleCloseSize("M")}>M</MenuItem>
                            <MenuItem onClick={() => handleCloseSize("L")}>L</MenuItem>
                            <MenuItem onClick={() => handleCloseSize("XL")}>XL</MenuItem>
                        </Menu>
                    </div>

                    <div className="relative">
                        <sapn className="flex items-center justify-center bg-[#f1f1f1]  text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer" onClick={handleClickQty}>
                            Qty: {selectedQty} <GoTriangleDown />
                        </sapn>
                        <Menu
                            id="size-menu"
                            anchorEl={qtyAnchorEl}
                            open={openQty}
                            onClose= {() => handleCloseQty(null)}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem onClick={() => handleCloseQty("1")}>1</MenuItem>
                            <MenuItem onClick={() => handleCloseQty("2")}>2</MenuItem>
                            <MenuItem onClick={() => handleCloseQty("3")}>3</MenuItem>
                            <MenuItem onClick={() => handleCloseQty("4")}>4</MenuItem>
                            <MenuItem onClick={() => handleCloseQty("5")}>5</MenuItem>
                            <MenuItem onClick={() => handleCloseQty("6")}>6</MenuItem>
                            <MenuItem onClick={() => handleCloseQty("7")}>7</MenuItem>
                            <MenuItem onClick={() => handleCloseQty("8")}>8</MenuItem>
                            <MenuItem onClick={() => handleCloseQty("9")}>9</MenuItem>
                            <MenuItem onClick={() => handleCloseQty("10")}>10</MenuItem>
                        </Menu>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <p className="text-[14px] font-[500] text-[rgba(0,0,0,0.8)]">
                        <span className="text-[#000] font-[600]">₹7999</span>
                        <span className="text-[rgba(0,0,0,0.5)] line-through ml-2">
                            ₹9999
                        </span>
                    </p>
                    <p className="text-[14px] font-[600] text-[#ff5252] py-1">20% off</p>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
