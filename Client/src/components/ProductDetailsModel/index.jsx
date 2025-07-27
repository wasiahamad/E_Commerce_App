import React, { useState } from "react";
import QtyBox from "../QtyBox";
import { Button, Rating } from "@mui/material";
import { IoGitCompare } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCartLight } from "react-icons/pi";

const ProductDetailsModel = () => {

      const [size, setSize] = useState(null);

    return (
        <>
            <h1 className="text-[25px] font-[600] mb-2">
                Floral Beads and Stones Pure Chiffon Saree
            </h1>

            <div className="flex gap-3 items-center">
                <span className="text-[13px] font-[400] text-[#8a8a8a]">
                    Brands :
                    <span className="text-[13px] font-[500] text-[#000]"> Koskii</span>
                </span>

                <Rating name="size-small" defaultValue={4} size="small" readOnly />
                <span className="text-[13px] font-[500] text-[#262424] cursor-pointer">
                    Review(0)
                </span>
            </div>
            <div className="flex gap-3 items-center mt-4">
                <span className="text-[16px] font-[500] text-[#8a8a8a] line-through">
                    ₹ 2,999
                </span>
                <span className="text-[20px] font-[600] text-[#ff3d00]">₹ 1,999</span>
                {/* <span className='text-[16px] font-[500] text-[#8a8a8a]'>33% off</span> */}

                <span className="text-[15px] font-[400] text-[#262424]">
                    Available In Stock :{" "}
                    <span className="text-[green] font-[600] text-[16px]">
                        87445 Items
                    </span>
                </span>
            </div>

            <br />
            <p className="mt-4 pr-10 text-[#262424]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
            </p>

            <div className="flex items-center gap-3 mt-4 mb-4">
                <span className="text-[16px] font-[400] text-[#262424]">Size : </span>
                <div className="flex items-center gap-2 actions ">
                    <Button
                        className={`${size === 0 ? "!bg-primary !text-white" : "!text-black"
                            }`}
                        onClick={() => setSize(0)}
                    >
                        S
                    </Button>
                    <Button
                        className={`${size === 1 ? "!bg-primary !text-white" : "!text-black"
                            }`}
                        onClick={() => setSize(1)}
                    >
                        M
                    </Button>
                    <Button
                        className={`${size === 2 ? "!bg-primary !text-white" : "!text-black"
                            }`}
                        onClick={() => setSize(2)}
                    >
                        L
                    </Button>
                    <Button
                        className={`${size === 3 ? "!bg-primary !text-white" : "!text-black"
                            }`}
                        onClick={() => setSize(3)}
                    >
                        XL
                    </Button>
                </div>
            </div>

            <p>Free Shipping (Est. Delivery Time 2-3 Days)</p>

            <div className="flex items-center gap-4 mt-4">
                <div className="qtyWrapper w-[70px]">
                    <QtyBox />
                </div>
                <Button className="btn-org !h-[40px]">
                    <PiShoppingCartLight size={20} className="mr-2" /> Add To Cart
                </Button>
            </div>

            <div className="flex items-center gap-4 mt-6">
                <span className="flex items-center gap-2 cursor-pointer text-[15px] font-[500] opacity-75 link ">
                    {" "}
                    <FaRegHeart size={18} />
                    Add to wishlist
                </span>
                <span className="flex items-center gap-2 cursor-pointer text-[15px] font-[500] ml-4 opacity-75 link ">
                    {" "}
                    <IoGitCompare size={18} />
                    Add to compare
                </span>
            </div>
        </>
    );
};

export default ProductDetailsModel;
