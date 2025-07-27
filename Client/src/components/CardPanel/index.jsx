import { Button } from "@mui/material";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const CardPanel = () => {
    return (
        <>
            <div className="scroll w-full max-h-[450px] overflow-x-hidden overflow-y-scroll py-1 px-4">
                <div className="cardItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] py-4">
                    <div className="img w-[25%] overflow-hidden h-[85px] rounded-md">
                        <Link to="/product/1" className="group block">
                            <img
                                src="https://serviceapi.spicezgold.com/download/1742439426968_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-2-202403231855.jpg"
                                alt=""
                                className="w-full group-hover:scale-105 duration-150 transition-all ease-in-out"
                            />
                        </Link>
                    </div>
                    <div className="info w-[75%] pr-5 relative">
                        <h4 className="text-[14px] font-[500] text-[#000]">
                            <Link to="/product/1" className="link">
                                Men Pure Cotton Striped Casual Shirt
                            </Link>
                        </h4>
                        <p className="flex items-center gap-5 mt-2 mb-2">
                            <span>
                                Qty : <span>1</span>
                            </span>
                            <span className="font-bold text-primary text-[16px]">₹ 1000</span>
                        </p>
                        <MdDeleteOutline className="link text-[20px] text-[#000] cursor-pointer absolute top-0 right-0 transition-all" />
                    </div>
                </div>

                <div className="cardItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] py-4">
                    <div className="img w-[25%] overflow-hidden h-[85px] rounded-md">
                        <Link to="/product/1" className="group block">
                            <img
                                src="https://serviceapi.spicezgold.com/download/1742439426968_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-2-202403231855.jpg"
                                alt=""
                                className="w-full group-hover:scale-105 duration-150 transition-all ease-in-out"
                            />
                        </Link>
                    </div>
                    <div className="info w-[75%] pr-5 relative">
                        <h4 className="text-[14px] font-[500] text-[#000]">
                            <Link to="/product/1" className="link">
                                Men Pure Cotton Striped Casual Shirt
                            </Link>
                        </h4>
                        <p className="flex items-center gap-5 mt-2 mb-2">
                            <span>
                                Qty : <span>1</span>
                            </span>
                            <span className="font-bold text-primary text-[16px]">₹ 1000</span>
                        </p>
                        <MdDeleteOutline className="link text-[20px] text-[#000] cursor-pointer absolute top-0 right-0 transition-all" />
                    </div>
                </div>

                <div className="cardItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] py-4">
                    <div className="img w-[25%] overflow-hidden h-[85px] rounded-md">
                        <Link to="/product/1" className="group block">
                            <img
                                src="https://serviceapi.spicezgold.com/download/1742439426968_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-2-202403231855.jpg"
                                alt=""
                                className="w-full group-hover:scale-105 duration-150 transition-all ease-in-out"
                            />
                        </Link>
                    </div>
                    <div className="info w-[75%] pr-5 relative">
                        <h4 className="text-[14px] font-[500] text-[#000]">
                            <Link to="/product/1" className="link">
                                Men Pure Cotton Striped Casual Shirt
                            </Link>
                        </h4>
                        <p className="flex items-center gap-5 mt-2 mb-2">
                            <span>
                                Qty : <span>1</span>
                            </span>
                            <span className="font-bold text-primary text-[16px]">₹ 1000</span>
                        </p>
                        <MdDeleteOutline className="link text-[20px] text-[#000] cursor-pointer absolute top-0 right-0 transition-all" />
                    </div>
                </div>

                <div className="cardItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] py-4">
                    <div className="img w-[25%] overflow-hidden h-[85px] rounded-md">
                        <Link to="/product/1" className="group block">
                            <img
                                src="https://serviceapi.spicezgold.com/download/1742439426968_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-2-202403231855.jpg"
                                alt=""
                                className="w-full group-hover:scale-105 duration-150 transition-all ease-in-out"
                            />
                        </Link>
                    </div>
                    <div className="info w-[75%] pr-5 relative">
                        <h4 className="text-[14px] font-[500] text-[#000]">
                            <Link to="/product/1" className="link">
                                Men Pure Cotton Striped Casual Shirt
                            </Link>
                        </h4>
                        <p className="flex items-center gap-5 mt-2 mb-2">
                            <span>
                                Qty : <span>1</span>
                            </span>
                            <span className="font-bold text-primary text-[16px]">₹ 1000</span>
                        </p>
                        <MdDeleteOutline className="link text-[20px] text-[#000] cursor-pointer absolute top-0 right-0 transition-all" />
                    </div>
                </div>

                <div className="cardItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] py-4">
                    <div className="img w-[25%] overflow-hidden h-[85px] rounded-md">
                        <Link to="/product/1" className="group block">
                            <img
                                src="https://serviceapi.spicezgold.com/download/1742439426968_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-2-202403231855.jpg"
                                alt=""
                                className="w-full group-hover:scale-105 duration-150 transition-all ease-in-out"
                            />
                        </Link>
                    </div>
                    <div className="info w-[75%] pr-5 relative">
                        <h4 className="text-[14px] font-[500] text-[#000]">
                            <Link to="/product/1" className="link">
                                Men Pure Cotton Striped Casual Shirt
                            </Link>
                        </h4>
                        <p className="flex items-center gap-5 mt-2 mb-2">
                            <span>
                                Qty : <span>1</span>
                            </span>
                            <span className="font-bold text-primary text-[16px]">₹ 1000</span>
                        </p>
                        <MdDeleteOutline className="link text-[20px] text-[#000] cursor-pointer absolute top-0 right-0 transition-all" />
                    </div>
                </div>

                <div className="cardItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] py-4">
                    <div className="img w-[25%] overflow-hidden h-[85px] rounded-md">
                        <Link to="/product/1" className="group block">
                            <img
                                src="https://serviceapi.spicezgold.com/download/1742439426968_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-2-202403231855.jpg"
                                alt=""
                                className="w-full group-hover:scale-105 duration-150 transition-all ease-in-out"
                            />
                        </Link>
                    </div>
                    <div className="info w-[75%] pr-5 relative">
                        <h4 className="text-[14px] font-[500] text-[#000]">
                            <Link to="/product/1" className="link">
                                Men Pure Cotton Striped Casual Shirt
                            </Link>
                        </h4>
                        <p className="flex items-center gap-5 mt-2 mb-2">
                            <span>
                                Qty : <span>1</span>
                            </span>
                            <span className="font-bold text-primary text-[16px]">₹ 1000</span>
                        </p>
                        <MdDeleteOutline className="link text-[20px] text-[#000] cursor-pointer absolute top-0 right-0 transition-all" />
                    </div>
                </div>

                <div className="cardItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] py-4">
                    <div className="img w-[25%] overflow-hidden h-[85px] rounded-md">
                        <Link to="/product/1" className="group block">
                            <img
                                src="https://serviceapi.spicezgold.com/download/1742439426968_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-2-202403231855.jpg"
                                alt=""
                                className="w-full group-hover:scale-105 duration-150 transition-all ease-in-out"
                            />
                        </Link>
                    </div>
                    <div className="info w-[75%] pr-5 relative">
                        <h4 className="text-[14px] font-[500] text-[#000]">
                            <Link to="/product/1" className="link">
                                Men Pure Cotton Striped Casual Shirt
                            </Link>
                        </h4>
                        <p className="flex items-center gap-5 mt-2 mb-2">
                            <span>
                                Qty : <span>1</span>
                            </span>
                            <span className="font-bold text-primary text-[16px]">₹ 1000</span>
                        </p>
                        <MdDeleteOutline className="link text-[20px] text-[#000] cursor-pointer absolute top-0 right-0 transition-all" />
                    </div>
                </div>
            </div>

            <div className="bottomSec absolute bottom-5 left-3 w-full pr-5">
                <div className="bottomInfo w-full flex items-center justify-between px-4 py-3 border-t border-[rgba(0,0,0,0.1)]">
                    <div className="flex items-center justify-between w-full">
                        <span className="text-[14px] font-[600]">2 item</span>
                        <span className="font-bold text-primary text-[16px]">₹ 2000</span>
                    </div>
                </div>

                <div className="bottomInfo w-full flex items-center justify-between px-4 py-3 border-t border-[rgba(0,0,0,0.1)]">
                    <div className="flex items-center justify-between w-full">
                        <span className="text-[14px] font-[600]">Total (tax excl.)</span>
                        <span className="font-bold text-primary text-[16px]">₹ 2000</span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-5 w-full px-4 py-3 ">
                    <Link to="/checkout" className="w-[50%] d-block ">
                        <Button className="!bg-primary !text-[15px] !font-[500] !text-[#fff] !py-2 !rounded-md hover:!bg-[#ff5252] hover:!text-[#000] !transition-all !duration-150 w-full">
                            Check Out
                        </Button>
                    </Link>
                    <Link to="/cart" className="w-[50%] d-block ">
                        <Button className="!bg-[#f1f1f1] !text-[15px] !font-[500] !text-primary !py-2 !rounded-md hover:!bg-[#ff5252] hover:!text-white !transition-all !duration-150 w-full ">
                            View Cart
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default CardPanel;
