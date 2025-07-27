import { Button, TextField } from "@mui/material";
import React from "react";
import { BsBagCheck } from "react-icons/bs";
import { Link } from "react-router-dom";

const Checkout = () => {
    return (
        <section className="section py-10">
            <div className="container flex gap-5">
                <div className="leftCol w-[70%]">
                    <div className="card bg-white shadow-md p-5 rounded-md w-full ">
                        <h2>Billing Details</h2>

                        <form action="" className="w-full mt-5">
                            <div className="flex items-center gap-5 pb-5">
                                <div className="col w-[50%]">
                                    <TextField
                                        id="outlined-basic"
                                        label="First Name"
                                        variant="outlined"
                                        className="w-full"
                                        type="text"
                                        size="small"
                                        required
                                    />
                                </div>

                                <div className="col w-[50%]">
                                    <TextField
                                        id="outlined-basic"
                                        label="Email Address"
                                        variant="outlined"
                                        className="w-full"
                                        type="email"
                                        size="small"
                                        required
                                    />
                                </div>
                            </div>

                            <h6 className="text-[14px] font-[500] mb-3">Street Address</h6>

                            <div className="flex items-center pb-5">
                                <div className="col w-[100%]">
                                    <TextField
                                        id="outlined-basic"
                                        label="House No, Street, Area, Landmark"
                                        variant="outlined"
                                        className="w-full"
                                        type="text"
                                        size="small"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center pb-5">
                                <div className="col w-[100%]">
                                    <TextField
                                        id="outlined-basic"
                                        label="Apartment, suite, unit, etc.(optional)"
                                        variant="outlined"
                                        className="w-full"
                                        type="text"
                                        size="small"
                                    />
                                </div>
                            </div>

                            <h6 className="text-[14px] font-[500] mb-3">Town / City</h6>

                            <div className="flex items-center pb-5">
                                <div className="col w-[100%]">
                                    <TextField
                                        id="outlined-basic"
                                        label="Town / City"
                                        variant="outlined"
                                        className="w-full"
                                        type="text"
                                        size="small"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center pb-5">
                                <div className="col w-[100%]">
                                    <TextField
                                        id="outlined-basic"
                                        label="State / country"
                                        variant="outlined"
                                        className="w-full"
                                        type="text"
                                        size="small"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-5 pb-5">
                                <div className="col w-[50%]">
                                    <TextField
                                        id="outlined-basic"
                                        label="Zip Code"
                                        variant="outlined"
                                        className="w-full"
                                        type="text"
                                        size="small"
                                        required
                                    />
                                </div>

                                <div className="col w-[50%]">
                                    <TextField
                                        id="outlined-basic"
                                        label="Phone Number"
                                        variant="outlined"
                                        className="w-full"
                                        type="text"
                                        size="small"
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="rightCol w-[30%]">
                    <div className="card shadow-md rounded-md bg-white p-5">
                        <h4 className="mb-4">Your Order</h4>

                        <div className="flex items-center justify-between border-b border-t border-[rgba(0,0,0,0.1)] py-3">
                            <span className="text-[14px] font-[600]">Products</span>
                            <span className="text-[14px] font-[600]">Subtotal</span>
                        </div>

                        <div className="scroll max-h-[250px] overflow-x-hidden  overflow-y-scroll pr-2">
                            <div className="flex items-center justify-between py-2">
                                <div className="part1 flex items-center gap-3">
                                    <div className="img w-[50px] h-[50px] object-cover rounded-md overflow-hidden group">
                                        <img
                                            src="https://serviceapi.spicezgold.com/download/1742462729828_zoom_0-1673275594.webp"
                                            alt=""
                                            className="w-full group-hover:scale-105 transition-all duration-150 cursor-pointer"
                                        />
                                    </div>

                                    <div className="info">
                                        <h4 className="text-[14px] font-[600]">Men Pure Cotton </h4>
                                        <span className="text-[13px]">Qty : 1</span>
                                    </div>
                                </div>

                                <span className="text-[14px] font-[600]">₹ 1,999</span>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <div className="part1 flex items-center gap-3">
                                    <div className="img w-[50px] h-[50px] object-cover rounded-md overflow-hidden group">
                                        <img
                                            src="https://serviceapi.spicezgold.com/download/1742462729828_zoom_0-1673275594.webp"
                                            alt=""
                                            className="w-full group-hover:scale-105 transition-all duration-150 cursor-pointer"
                                        />
                                    </div>

                                    <div className="info">
                                        <h4 className="text-[14px] font-[600]">Men Pure Cotton </h4>
                                        <span className="text-[13px]">Qty : 1</span>
                                    </div>
                                </div>

                                <span className="text-[14px] font-[600]">₹ 1,999</span>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <div className="part1 flex items-center gap-3">
                                    <div className="img w-[50px] h-[50px] object-cover rounded-md overflow-hidden group">
                                        <img
                                            src="https://serviceapi.spicezgold.com/download/1742462729828_zoom_0-1673275594.webp"
                                            alt=""
                                            className="w-full group-hover:scale-105 transition-all duration-150 cursor-pointer"
                                        />
                                    </div>

                                    <div className="info">
                                        <h4 className="text-[14px] font-[600]">Men Pure Cotton </h4>
                                        <span className="text-[13px]">Qty : 1</span>
                                    </div>
                                </div>

                                <span className="text-[14px] font-[600]">₹ 1,999</span>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <div className="part1 flex items-center gap-3">
                                    <div className="img w-[50px] h-[50px] object-cover rounded-md overflow-hidden group">
                                        <img
                                            src="https://serviceapi.spicezgold.com/download/1742462729828_zoom_0-1673275594.webp"
                                            alt=""
                                            className="w-full group-hover:scale-105 transition-all duration-150 cursor-pointer"
                                        />
                                    </div>

                                    <div className="info">
                                        <h4 className="text-[14px] font-[600]">Men Pure Cotton </h4>
                                        <span className="text-[13px]">Qty : 1</span>
                                    </div>
                                </div>

                                <span className="text-[14px] font-[600]">₹ 1,999</span>
                            </div>
                        </div>

                        <div className="pt-5">
                            <Link to="/checkout">
                                <Button className="!text-[14px] !bg-[#ff5252] !font-[600] !text-[#fff] !py-3 hover:!bg-[#000] hover:!text-[#ff5252] !transition-all !duration-150 w-full">
                                    <BsBagCheck className="mr-2 text-[20px]" /> Check Out
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;
