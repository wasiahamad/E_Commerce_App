import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa6";
import { TbLogin2 } from "react-icons/tb";
import OtpBox from '../../Components/OtpBox';
import { MyContext } from '../../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../utils/api';


const VerifyAccount = () => {
    const navigate = useNavigate();
    const context = useContext(MyContext);

    const [otp, setOtp] = useState('');

    const handleOtpChange = (e) => {
        setOtp(e);
    };

    const verifyOtp = (e) => {
        e.preventDefault();

        const actionType = localStorage.getItem("actionType");
        if (actionType !== 'forgot-password') {
            postData("/api/v1/user/verify-email", {
                email: localStorage.getItem("userEmail"),
                otp: otp, // ✅ Fix here
            }).then((res) => {
                console.log(res);
                if (res?.error === false) {
                    context.alertBox("success", res?.message);
                    localStorage.removeItem("userEmail")
                    navigate("/login");
                    // Navigate or clear localStorage if needed
                } else {
                    context.alertBox("error", res?.message || "OTP verification failed.");
                }
            }).catch((err) => {
                console.error(err);
                context.alertBox("error", "An error occurred while verifying OTP.");
            });
        } else {
            postData("/api/v1/user/verify-otp", {
                email: localStorage.getItem("userEmail"),
                otp: otp,
            }).then((res) => {
                console.log(res);
                if (res?.error === false) {
                    context.alertBox("success", res?.message);
                    // localStorage.removeItem("userEmail")
                    navigate("/change-password");
                    // Navigate or clear localStorage if needed
                } else {
                    context.alertBox("error", res?.message || "OTP verification failed.");
                }
            }).catch((err) => {
                console.error(err);
                context.alertBox("error", "An error occurred while verifying OTP.");
            });
        }


    };

    return (
        <section className=' bg-[#fff] w-full h-[100vh]'>
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
                    <img src="https://ecommerce-admin-view.netlify.app/verify3.png" alt="" className='m-auto w-[100px] h-[100px]' />
                </div>

                <h1 className='text-center text-[35px] font-[800]'>Welcome Back! <br />
                    Please Verify your Email
                </h1>
                <br />
                <p className='text-center text-[15px] text-[rgba(0,0,0,0.8)]'>OTP send to <span className='font-bold text-[#3838ff]'> {localStorage.getItem("userEmail")}</span></p>

                <div className="flex items-center justify-center text-center flex-col mt-5 ">
                    <OtpBox length={6} onChange={handleOtpChange} />
                </div>

                <div className="text-center mt-5 ">
                    <Button
                        type='submit'
                        onClick={verifyOtp}
                        className='!bg-[#3838ff] !text-white !py-2 !px-4 w-[300px] !rounded-md !capitalize font-[600] mt-5 mx-auto'
                    >
                        Verify
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default VerifyAccount;