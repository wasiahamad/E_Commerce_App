import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa6";
import { TbLogin2 } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


const LogIn = () => {

    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function handleClickGoogle() {
        setLoadingGoogle(true);
    }

   

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

                <h1 className='text-center text-[35px] font-[800]'>Welcome Back! <br />
                    Sign in with your credentials.
                </h1>

                <div className="flex items-center justify-center w-full mt-5 ">
                    <Button
                        size="small"
                        onClick={handleClickGoogle}
                        endIcon={<FcGoogle size={25} />}
                        loading={loadingGoogle}
                        loadingPosition="end"
                        variant="outlined"
                        className='!bg-[#f1faff] !text-black !capitalize hover:!bg-[#fafafa] !rounded-md font-[600] !text-[15px] !py-2 !px-4'
                    >
                        Sign in with Google
                    </Button>

                </div>

                <div className="flex w-full items-center justify-center gap-5 mt-5 pb-5">
                    <span className='flex items-center w-[150px] h-[1px] bg-slate-400 '></span>
                    <span className='text-[15px] font-[500] text-[#8a8a8a]'>or, Sign in with Your Email</span>
                    <span className='flex items-center w-[150px] h-[1px] bg-slate-400 '></span>
                </div>

                <form action="" className='w-full px-8 mt-5'>
                    <div className="form-group mb-4 w-full">
                        <h4 className='text-[14px] font-[500] mb-1'>Email</h4>
                        <input type="email"
                            className='w-full h-[50px] border border-[rgba(0,0,0,0.2)] rounded-md px-4 focus:border-[rgba(0,0,0,0.5)] focus:outline-none'
                            placeholder='Enter Your Email' />
                    </div>

                    <div className="form-group mb-4 w-full">
                        <h4 className='text-[14px] font-[500] mb-1'>Password</h4>
                        <div className="relative w-full ">
                            <input 
                                type={isPasswordVisible ? "text" : "password"}
                                className='w-full h-[50px] border border-[rgba(0,0,0,0.2)] rounded-md px-4 focus:border-[rgba(0,0,0,0.5)] focus:outline-none'
                                placeholder='Enter Your Password' />

                                <Button className='!absolute !text-[rgba(0,0,0,0.7)] !right-[10px] !top-[8px] !rounded-full  !w-[35px] !h-[35px] !min-w-[35px] z-50'
                                onClick={() => {setIsPasswordVisible(!isPasswordVisible)}}>
                                    {isPasswordVisible ? <FaEyeSlash size={20} /> : <FaRegEye size={20} />}
                                </Button>
                        </div>
                    </div>

                    <div className="form-group mb-2 w-full flex items-center justify-between ">
                        <FormControlLabel control={<Checkbox />} label="Remember Me" />

                        <Link to="/forgot-password" className='text-[15px] font-[600] text-[#3838ff] hover:underline hover:text-[#000]'>
                            Forgot Password?
                        </Link>
                    </div>

                    <div className="form-group mb-5 w-full flex items-center justify-between ">
                        <span className='text-[15px] font-[500] text-[#8a8a8a]'>Don't have an account?</span>

                        <Link to="/signup" className='text-[15px] font-[600] text-[#3838ff] hover:underline hover:text-[#000]'>
                            Sign Up
                        </Link>
                    </div>

                    <Button
                        type='submit'
                        className='!bg-[#3838ff] !text-white hover:!bg-[#000] !capitalize !rounded-md font-[600] !text-[15px] !py-2 !px-4 w-full'
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </section>
    )
}

export default LogIn