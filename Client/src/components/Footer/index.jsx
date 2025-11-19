import React, { useContext } from 'react'
// import './index.css'
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { FiGift } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { CiChat1 } from "react-icons/ci";
import { Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import CardPanel from '../CardPanel';
import WishlistPanel from '../WishlistPanel';
import { IoMdClose } from 'react-icons/io';
import Drawer from "@mui/material/Drawer";
import { MyContext } from '../../App';


const Footer = () => {

    const context = useContext(MyContext);
    return (
        <>
            <footer className=" py-16 bg-[#fbfbfb]  ">
                <div className="container">
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <div className="col flex items-center justify-center flex-col group w-[15%]">
                            <LiaShippingFastSolid className='text-[40px] group-hover:text-[#ff5252] transition-all group-hover:-translate-y-1 duration-300 ' />
                            <h3 className="text-[16px] font-[600] text-[rgba(0,0,0,0.8)] mt-2 ">Free Shipping</h3>
                            <p className="text-[12px] font-[400] text-[rgba(0,0,0,0.6)] mt-1">On all orders over $50</p>
                        </div>

                        <div className="col flex items-center justify-center flex-col group w-[15%]">
                            <PiKeyReturnLight className='text-[40px] group-hover:text-[#ff5252] transition-all group-hover:-translate-y-1 duration-300 ' />
                            <h3 className="text-[16px] font-[600] text-[rgba(0,0,0,0.8)] mt-2 ">30 Days Returns</h3>
                            <p className="text-[12px] font-[400] text-[rgba(0,0,0,0.6)] mt-1">For an Exchange Product</p>
                        </div>

                        <div className="col flex items-center justify-center flex-col group w-[15%]">
                            <BsWallet2 className='text-[40px] group-hover:text-[#ff5252] transition-all group-hover:-translate-y-1 duration-300 ' />
                            <h3 className="text-[16px] font-[600] text-[rgba(0,0,0,0.8)] mt-2 ">Secured Payment</h3>
                            <p className="text-[12px] font-[400] text-[rgba(0,0,0,0.6)] mt-1">Payment Cards Accepted</p>
                        </div>

                        <div className="col flex items-center justify-center flex-col group w-[15%]">
                            <FiGift className='text-[40px] group-hover:text-[#ff5252] transition-all group-hover:-translate-y-1 duration-300 ' />
                            <h3 className="text-[16px] font-[600] text-[rgba(0,0,0,0.8)] mt-2 ">Special Gifts</h3>
                            <p className="text-[12px] font-[400] text-[rgba(0,0,0,0.6)] mt-1 ">Our First Product Order</p>
                        </div>

                        <div className="col flex items-center justify-center flex-col group w-[15%]">
                            <BiSupport className='text-[40px] group-hover:text-[#ff5252] transition-all group-hover:-translate-y-1 duration-300 ' />
                            <h3 className="text-[16px] font-[600] text-[rgba(0,0,0,0.8)] mt-2 ">Support 24/7</h3>
                            <p className="text-[12px] font-[400] text-[rgba(0,0,0,0.6)] mt-1">Contact us Anytime</p>
                        </div>
                    </div>


                    <hr />
                    <div className="footer flex py-8 ">
                        <div className="part1 w-[25%] border-r border-[rgba(0,0,0,0.1)]">
                            <h3 className="text-[20px] font-[600] text-[rgba(0,0,0,0.8)] ">Contact Us</h3>
                            <p className='text-[13px] font-[400] text-[rgba(0,0,0,0.6)] pb-4'>ClassyShop - Mega Super Store
                                <br />
                                507-Union Street, New York, USA
                            </p>
                            <Link className="link text-[13px] font-[400] text-[rgba(0,0,0,0.6)]" to="mailto:4ZDdX@example.com">
                                4ZDdX@example.com
                            </Link>

                            <span className="text-[22px] font-[600] block w-full mt-3 mb-5 text-primary">
                                (+91) 234 567 89
                            </span>

                            <div className="flex items-center gap-4">
                                <CiChat1 className='text-[40px] text-primary ' />
                                <span className='text-[16px] font-[600]'>Online Support <br /> Get Expert Help</span>
                            </div>

                        </div>

                        <div className="part2 w-[40%] flex pl-8  ">
                            <div className="part2_col1 w-[50%]">
                                <h2 className="text-[20px] font-[600] text-[rgba(0,0,0,0.8)] mb-4 ">
                                    Products
                                </h2>
                                <ul className='list text-[14px] font-[400] text-[rgba(0,0,0,0.7)]'>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link className='link' to="/about">Prices drop</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link className='link' to="/contact">New products</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link className='link' to="/contact">Best Sells</Link>
                                    </li>

                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link className='link' to="/privacy">Contact us</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link className='link' to="/terms">Sitemap</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link className='link' to="/about">Stores</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="part2_col2 w-[50%]">
                                <h2 className="text-[20px] font-[600] text-[rgba(0,0,0,0.8)] mb-4 ">
                                    Our company
                                </h2>
                                <ul className='list text-[14px] font-[400] text-[rgba(0,0,0,0.7)]'>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link className='link' to="/about">Delivery</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link className='link' to="/contact">Legal Notice</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link className='link' to="/privacy">Terms and conditions of use</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link className='link' to="/terms">About us</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link className='link' to="/about">Secure payment</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full mb-2'>
                                        <Link className='link' to="/login">Login</Link>
                                    </li>

                                </ul>
                            </div>

                        </div>

                        <div className="part3 w-[35%] pl-8">
                            <h2 className="text-[20px] font-[600] text-[rgba(0,0,0,0.8)] mb-4 ">
                                Newsletter
                            </h2>
                            <p className='text-[14px] font-[400] text-[rgba(0,0,0,0.7)] mb-4'>You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.</p>
                            <form action="" >
                                <input type="email" placeholder='Your email address' className='w-full border border-[#ddd] rounded-md p-2 outline-none mb-4 focus:border-[rgba(0,0,0,0.5)]' />
                                <Button className='!bg-primary !text-white p-2'>Subscribe</Button>

                            </form>
                            <FormControlLabel control={<Checkbox />} label="I agree to the Privacy Policy" />
                        </div>
                    </div>
                </div>
            </footer>
            <div className="copyright bg-[#fff] py-4 border-t border-[rgba(0,0,0,0.1)]">
                <div className="container flex items-center justify-between">
                    <ul className='flex items-center gap-4'>
                        <li className="list-none">
                            <Link className='link w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all ' to="/about">
                                <FaSquareInstagram className='!text-[15px] group-hover:text-white ' />
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link className='link w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all' to="/about">
                                <FaFacebook className='text-[15px] group-hover:text-white ' />
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link className='link w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all' to="/about">
                                <FaTwitter className='text-[15px] group-hover:text-white ' />
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link className='link w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all' to="/about">
                                <FaYoutube className='text-[15px] group-hover:text-white ' />
                            </Link>
                        </li>
                    </ul>

                    <p className='text-[14px] font-[400] text-[rgba(0,0,0,0.7)]'>© 2025 SaiFiroz. All rights reserved.</p>

                    <ul className='flex items-center gap-1'>
                        <li className="list-none">
                            <Link className='link w-[35px] h-[35px]  ' to="/">
                                <img src="https://ecommerce-frontend-view.netlify.app/carte_bleue.png" alt="" />
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link className='link w-[35px] h-[35px] ' to="/">
                                <img src="https://ecommerce-frontend-view.netlify.app/visa.png" alt="" />
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link className='link w-[35px] h-[35px]' to="/">
                                <img src="https://ecommerce-frontend-view.netlify.app/master_card.png" alt="" />
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link className='link w-[35px] h-[35px] ' to="/">
                                <img src="https://ecommerce-frontend-view.netlify.app/american_express.png" alt="" />
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link className='link w-[35px] h-[35px] ' to="/">
                                <img src="https://ecommerce-frontend-view.netlify.app/paypal.png" alt="" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* CardPanel */}

            <Drawer
                open={context.openCardPanel}
                onClose={context.toggleCardPanel(false)}
                anchor={"right"}
                className="cardPanel"
            >
                <div className=" w-[400px] flex items-center justify-between py-3 px-4 gap-4 border-b border-[rgba(0,0,0,0.1)]">
                    <h4>Shopping Cart (5)</h4>
                    <IoMdClose
                        className="text-[20px] cursor-pointer"
                        onClick={context.toggleCardPanel(false)}
                    />
                </div>
                <CardPanel />
            </Drawer>

            {/* Wishlist Panel Drawer */}
            <Drawer
                open={context.openCardPanel2}
                onClose={() => context.setOpenCardPanel2(false)}
                anchor={"right"}
                className="cardPanel"
            >
                <div className=" w-[400px] flex items-center justify-between py-3 px-4 gap-4 border-b border-[rgba(0,0,0,0.1)]">
                    <h4>Wishlist</h4>
                    <IoMdClose
                        className="text-[20px] cursor-pointer"
                        onClick={() => context.setOpenCardPanel2(false)}
                    />
                </div>
                <WishlistPanel />
            </Drawer>
        </>
    )
}

export default Footer