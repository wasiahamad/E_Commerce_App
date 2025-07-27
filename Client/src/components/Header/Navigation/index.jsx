import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import { RiMenu2Fill } from "react-icons/ri";
import { TfiAngleDown } from "react-icons/tfi";
import { IoRocket } from "react-icons/io5";
import CategoryPanel from './CategoryPanel';
import './style.css';


const Navigation = () => {

    const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

    const openCategoryPanel = () => {
        setIsOpenCatPanel(true);
    }
    return (
        <>
            <nav>
                <div className="container flex justify-end items-center gap-8 py-3">
                    <div className='col_1 w-[20%]'>
                        <Button className='!text-black gap-2 w-full' onClick={openCategoryPanel}>
                            <RiMenu2Fill size={18} /> Shop By Category
                            <TfiAngleDown className='ml-auto font-semibold' /></Button>
                    </div>

                    <div className='col_2 w-[60%]'>
                        <ul className="flex items-center gap-5 nav">
                            <li className='text-[14px] font-[500] list-none'>
                                <Link className='link transition ease-in duration-200 ' to="/">
                                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Home</Button>
                                </Link>
                            </li>

                            <li className=' list-none'>
                                <Link className='link transition ease-in duration-200 ' to="/fashion">
                                    <Button className='link transition !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Fashion</Button>
                                </Link>

                                <div className="submenu absolute top-[95%] left-[28%] min-w-[150px] bg-white shadow-md opacity-0 transition-all duration-300 ease-in-out ">
                                    <ul>
                                        <li className='list-none w-full relative inner-submenu'>
                                            <Link className='w-full' to="/fashion/men">
                                                <Button className='w-full !text-left !justify-start !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Men</Button>
                                            </Link>

                                            <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-md opacity-0 transition-all duration-300 ease-in-out ">
                                                <ul>
                                                    <li className='list-none w-full'>
                                                        <Link className='w-full' to="/fashion/men">
                                                            <Button className='w-full !text-left !justify-start !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>T-shirts</Button>
                                                        </Link>
                                                    </li>

                                                    <li className=' list-none w-full'>
                                                        <Link className='w-full' to="/fashion/women">
                                                            <Button className='w-full !text-left !justify-start !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Casual Shirts</Button>
                                                        </Link>
                                                    </li>

                                                    <li className='list-none w-full'>
                                                        <Link className=' w-full' to="/fashion/kids">
                                                            <Button className='!text-left !justify-start w-full transition !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Blazers and Coats</Button>
                                                        </Link>
                                                    </li>

                                                    <li className='list-none w-full'>
                                                        <Link className=' w-full' to="/fashion/kids">
                                                            <Button className='!text-left !justify-start w-full !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Jeans</Button>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>

                                        </li>

                                        <li className='list-none w-full'>
                                            <Link className='w-full' to="/fashion/women">
                                                <Button className='w-full !text-left !justify-start !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Women</Button>
                                            </Link>
                                        </li>

                                        <li className='list-none w-full'>
                                            <Link className='w-full' to="/fashion/kids">
                                                <Button className='!text-left !justify-start w-full  !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Kids</Button>
                                            </Link>
                                        </li>

                                        <li className=' list-none w-full '>
                                            <Link className=' w-full ' to="/fashion/kids">
                                                <Button className='!text-left !justify-start w-full !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Girls</Button>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className='text-[14px] font-[500] list-none'>
                                <Link className='link transition ease-in duration-200 ' to="/electronics">
                                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Electronics</Button>
                                </Link>
                            </li>

                            <li className='text-[14px] font-[500] list-none'>
                                <Link className='link transition ease-in duration-200 ' to="/bags">
                                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Bags</Button>
                                </Link>
                            </li>

                            <li className='text-[14px] font-[500] list-none'>
                                <Link className='link transition ease-in duration-200 ' to="/footwear">
                                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Footwear</Button>
                                </Link>
                            </li>

                            <li className='text-[14px] font-[500] list-none'>
                                <Link className='link transition ease-in duration-200 ' to="/beauty">
                                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Beauty</Button>
                                </Link>
                            </li>

                            <li className='text-[14px] font-[500] list-none'>
                                <Link className='link transition ease-in duration-200 ' to="/grocery">
                                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Grocery</Button>
                                </Link>
                            </li>

                            <li className='text-[14px] font-[500] list-none'>
                                <Link className='link transition ease-in duration-200 ' to="/wellness">
                                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Wellness</Button>
                                </Link>
                            </li>

                            <li className='text-[14px] font-[500] list-none'>
                                <Link className='link transition ease-in duration-200 ' to="/jewellery">
                                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Jewellery</Button>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className='col_3 w-[20%]'>
                        <p className='text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0'> <IoRocket size={18} />Free International Delivery</p>
                    </div>
                </div>
            </nav>
            <CategoryPanel isOpenCatPanel={isOpenCatPanel} setIsOpenCatPanel={setIsOpenCatPanel} />
        </>

    )
}

export default Navigation