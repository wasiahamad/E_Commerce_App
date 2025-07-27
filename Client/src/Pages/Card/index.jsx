import React from 'react'
import { Link } from 'react-router-dom'
import CartItems from './CartItems';
import { Button} from '@mui/material';
import { BsBagCheck } from "react-icons/bs";



const Card = () => {

    return (
        <section className="section py-10 pb-10">
            <div className="container w-[80%] max-w-[80%] flex gap-5">

                <div className="leftPart w-[70%]">
                    <div className="shadow-md rounded-md bg-white ">
                        <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                            <h4 className="text-[20px] font-[600] text-[#000]opacity-75">Your Cart</h4>
                            <p className="mt-0">
                                There are <span className="font-bold text-primary">4</span> items in your cart
                            </p>
                        </div>
                        <CartItems size="S" qty="1" />
                        <CartItems size="S" qty="1" />
                        <CartItems size="S" qty="1" />
                        <CartItems size="S" qty="1" />
                        <CartItems size="S" qty="1" />
                    </div>
                </div>

                <div className="rightPart w-[30%]">
                    <div className="shadow-md rounded-md bg-white p-5 ">
                        <div className="pb-3 border-b border-[rgba(0,0,0,0.1)]">
                            <h4 className="text-[15px] font-[600] text-[#000]">
                                Order Summary
                            </h4>
                        </div>

                        <div>
                            <p className="flex items-center justify-between">
                                <span className="text-[14px] font-[500] text-[rgba(0,0,0,0.8)]">Subtotal</span>
                                <span className="text-[14px] font-bold text-[#ff5252]">₹7999.00</span>
                            </p>

                            <p className="flex items-center justify-between">
                                <span className="text-[14px] font-[500] text-[rgba(0,0,0,0.8)]">Shipping</span>
                                <span className="text-[14px] font-bold">Free</span>
                            </p>

                            <p className="flex items-center justify-between">
                                <span className="text-[14px] font-[500] text-[rgba(0,0,0,0.8)]">Estimate for</span>
                                <span className="text-[14px] font-bold ">India</span>
                            </p>

                            <p className="flex items-center justify-between">
                                <span className="text-[14px] font-[500] text-[rgba(0,0,0,0.8)]">Total</span>
                                <span className="text-[14px] font-bold text-[#ff5252]">₹7999</span>
                            </p>
                        </div>

                        <div className="pt-5">
                            <Link to="/checkout">
                                <Button className='!text-[14px] !bg-[#ff5252] !font-[600] !text-[#fff] !py-3 hover:!bg-[#000] hover:!text-[#ff5252] !transition-all !duration-150 w-full'>
                                    <BsBagCheck className='mr-2 text-[20px]' /> Check Out
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    )
}

export default Card