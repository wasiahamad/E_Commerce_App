import React from 'react'
import { SlLocationPin } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa6";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { IoMdCloudUpload } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { Button } from '@mui/material';

const AccountSideBar = () => {
    return (
        <div className="card shadow-md rounded-md bg-white sticky top-[250px]">
            <div className="w-full p-5 flex items-center justify-center flex-col  ">
                <div className="rounded-full w-[110px] h-[110px] overflow-hidden mb-4 relative group">
                    <img src="https://media.istockphoto.com/id/499728904/photo/unknown-person-silhouette.webp?a=1&b=1&s=612x612&w=0&k=20&c=KlJLp3zZ9Wsj2FCKcjJnH2vwjZiSiS7-3dhk00SeBrA=" alt="" className='w-full h-full object-cover' />

                    <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center opacity-0 transition-all group-hover:opacity-100">
                        <IoMdCloudUpload className='text-[30px] text-white' />
                        <input type="file" className=' absolute top-0 left-0 w-[100%] h-[100%] cursor-pointer opacity-0 ' />
                    </div>
                </div>

                <h3>John Doe</h3>
                <h6 className='text-[rgba(0,0,0,0.6)] text-[13px] font-[500]'>johndoe45@gmail.com</h6>
            </div>

            <ul className='list-none pb-5 bg-[#f1f1f1] myAccountTabs'>
                <li className='w-full'>
                    <NavLink to="/my-account" exact={true} activeClassName="isActive">
                        <Button className='flex items-center !justify-start !py-2 gap-2 w-full !rounded-none !capitalize !text-[rgba(0,0,0,0.8)] !px-5'>
                            <FaRegUser size={15} /> My Profile
                        </Button>
                    </NavLink>
                </li>

                <li className='w-full'>
                    <NavLink to="/address" exact={true} activeClassName="isActive">
                        <Button className='flex items-center !justify-start !py-2 gap-2 w-full !rounded-none !capitalize !text-[rgba(0,0,0,0.8)] !px-5'>
                            <SlLocationPin size={17} /> Address
                        </Button>
                    </NavLink>
                </li>

                <li className='w-full'>
                    <NavLink to="/my-list" exact={true} activeClassName="isActive">
                        <Button className='flex items-center !justify-start !py-2 gap-2 w-full !rounded-none !capitalize !text-[rgba(0,0,0,0.8)] !px-5'>
                            <FaRegHeart size={15} /> My List
                        </Button>
                    </NavLink>
                </li>

                <li className='w-full'>
                    <NavLink to="/my-orders" exact={true} activeClassName="isActive">
                        <Button className='flex items-center !justify-start !py-2 gap-2 w-full !rounded-none !capitalize !text-[rgba(0,0,0,0.8)] !px-5'>
                            <IoBagCheckOutline size={17} /> My Orders
                        </Button>
                    </NavLink>
                </li>

                <li className='w-full'>
                    <NavLink to="/logout" exact={true} activeClassName="isActive">
                        <Button className='flex items-center !justify-start !py-2 gap-2 w-full !rounded-none !capitalize !text-[rgba(0,0,0,0.8)] !px-5'>
                            <MdLogout size={17} /> Logout
                        </Button>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default AccountSideBar