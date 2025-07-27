import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa6";
import { TbLogin2 } from "react-icons/tb";



const ForgotPassword = () => {

    return (
        <section className=' bg-[#fff] w-full'>
            <header className='w-full sticky top-0 px-4 py-2 flex items-center justify-between z-10'>
                <Link to="/">
                    <img src="https://serviceapi.spicezgold.com/download/1744255975457_logo.jpg" alt="" className='w-[200px]' />
                </Link>

                <div className="flex items-center gap-4">
                    <NavLink to="/login" exact={true} activeClassName="isActive">
                        <Button
                            className=' !text-black  !rounded-full !py-2 !px-4'>
                            <TbLogin2 size={18} className='mr-1' /> Log In
                        </Button>
                    </NavLink>

                    <Link to="/signup">
                    <Button 
                        className=' !text-black !rounded-full !py-2 !px-4'>
                        <FaRegUser size={15} className='mr-1' /> Sign Up
                    </Button>
                    </Link>
                </div>
            </header>
            <img src="https://ecommerce-admin-view.netlify.app/patern.webp" alt="" className='w-full fixed top-0 left-0 opacity-5' />

            <div className="loginBox card w-[40%] h-[auto] mx-auto mt-[40px] pb-10 relative z-50">
                <div className="text-center mb-3">
                    <img src="https://ecommerce-admin-view.netlify.app/icon.svg" alt="" className='m-auto' />
                </div>

                <h1 className='text-center text-[35px] font-[800]'>Having Trouble to Sign in! <br />
                     Reset Your password
                </h1>

                <form action="" className='w-full px-8 mt-5'>
                    <div className="form-group mb-4 w-full">
                        <h4 className='text-[14px] font-[500] mb-1'>Email</h4>
                        <input type="email"
                            className='w-full h-[50px] border border-[rgba(0,0,0,0.2)] rounded-md px-4 focus:border-[rgba(0,0,0,0.5)] focus:outline-none'
                            placeholder='Enter Your Email' />
                    </div>

                    <Button
                        type='submit'
                        className='!bg-[#3838ff] !text-white hover:!bg-[#000] !capitalize !rounded-md font-[600] !text-[15px] !py-2 !px-4 w-full'
                    >
                        Reset Password
                    </Button>
                    <br /><br />

                    <div className="form-group mb-5 w-full flex items-center justify-between ">
                        <span className='text-[15px] font-[500] text-[#8a8a8a]'>Don't want to reset?</span>

                        <Link to="/signup" className='text-[15px] font-[600] text-[#3838ff] hover:underline hover:text-[#000]'>
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default ForgotPassword;