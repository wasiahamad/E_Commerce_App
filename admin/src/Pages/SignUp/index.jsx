import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa6";
import { TbLogin2 } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils/api';
import { MyContext } from '../../App';
import { useContext } from 'react';


const SignUp = () => {
    const navigate = useNavigate();
    const context = useContext(MyContext);

    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // passwors visibility function
    const isStrongPassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        return hasUppercase && hasLowercase && hasNumber;
    };

    const onChnageInput = (e) => {
        const { name, value } = e.target;
        setFormData(() => {
            return {
                ...formData,
                [name]: value
            }
        })
    }

    // validate 
    const validValue = Object.values(formData).every((item) => item);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // check validation here
        const password = formData.password;
        if (password.length < 6) {
            return context.alertBox("error", "Password must be at least 6 characters long");

        }

        // Password strength check
        if (!isStrongPassword(password)) {
            context.alertBox("error", "Password must include uppercase, lowercase, and number");
            return false;
        }

        // API call
        postData("/api/v1/user/register", formData)
            .then((res) => {
                console.log("response", res);
                if (res?.error !== true) {
                    context.alertBox("success", res?.message);
                    localStorage.setItem("userEmail", formData.email);
                    setFormData({
                        name: "",
                        email: "",
                        password: "",
                    });
                    setIsLoading(false);
                    navigate("/verify-account");
                } else {
                    context.alertBox("error", res?.message);

                }
            });
    };

    function handleClickGoogle() {
        setLoadingGoogle(true);
    }



    return (
        <section className=' bg-[#f1f1f1]'>
            <header className='w-full sticky top-0 px-4 py-2 flex items-center justify-between z-50'>
                <Link to="/">
                    <img src="https://serviceapi.spicezgold.com/download/1744255975457_logo.jpg" alt="" className='w-[200px]' />
                </Link>

                <div className="flex items-center gap-4">

                    <Link to="/login">
                        <Button
                            className=' !text-black !rounded-full !py-2 !px-4'>
                            <TbLogin2 size={18} className='mr-1' /> Log In
                        </Button>
                    </Link>

                    <NavLink to="/signup" activeClassName="isActive">
                        <Button
                            className=' !text-black !rounded-full !py-2 !px-4'>
                            <FaRegUser size={15} className='mr-1' /> Sign Up
                        </Button>
                    </NavLink>
                </div>
            </header>
            <img src="https://ecommerce-admin-view.netlify.app/patern.webp" alt="" className='w-full fixed top-0 left-0 opacity-10' />

            <div className="loginBox card w-[40%] h-[auto] mx-auto mt-[40px] pb-10 relative z-50">
                <div className="text-center mb-3">
                    <img src="https://ecommerce-admin-view.netlify.app/icon.svg" alt="" className='m-auto' />
                </div>

                <h1 className='text-center text-[35px] font-[800]'>Join us today! Get special <br />
                    benefits and stay up-to-date.
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
                        Sign up with Google
                    </Button>

                </div>

                <div className="flex w-full items-center justify-center gap-5 mt-5 pb-5">
                    <span className='flex items-center w-[150px] h-[1px] bg-slate-400 '></span>
                    <span className='text-[15px] font-[500] text-[#8a8a8a]'>or, Sign Up with Your Email</span>
                    <span className='flex items-center w-[150px] h-[1px] bg-slate-400 '></span>
                </div>

                <form action="" onSubmit={handleSubmit} className='w-full px-8 mt-5'>
                    <div className="form-group mb-4 w-full">
                        <h4 className='text-[14px] font-[500] mb-1'>Full Name</h4>
                        <input
                            type="name"
                            className='w-full h-[50px] border border-[rgba(0,0,0,0.2)] rounded-md px-4 focus:border-[rgba(0,0,0,0.5)] focus:outline-none'
                            placeholder='Enter Your Full Name'
                            name="name"
                            value={formData.name}
                            onChange={onChnageInput}
                            disabled={isLoading === true ? true : false}
                        />
                    </div>

                    <div className="form-group mb-4 w-full">
                        <h4 className='text-[14px] font-[500] mb-1'>Email</h4>
                        <input
                            type="email"
                            className='w-full h-[50px] border border-[rgba(0,0,0,0.2)] rounded-md px-4 focus:border-[rgba(0,0,0,0.5)] focus:outline-none'
                            placeholder='Enter Your Email'
                            name="email"
                            value={formData.email}
                            onChange={onChnageInput}
                            disabled={isLoading === true ? true : false}
                        />
                    </div>

                    <div className="form-group mb-4 w-full">
                        <h4 className='text-[14px] font-[500] mb-1'>Password</h4>
                        <div className="relative w-full ">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                className='w-full h-[50px] border border-[rgba(0,0,0,0.2)] rounded-md px-4 focus:border-[rgba(0,0,0,0.5)] focus:outline-none'
                                placeholder='Enter Your Password'
                                name="password"
                                value={formData.password}
                                onChange={onChnageInput}
                                disabled={isLoading === true ? true : false}

                            />

                            <Button className='!absolute !text-[rgba(0,0,0,0.7)] !right-[10px] !top-[8px] !rounded-full  !w-[35px] !h-[35px] !min-w-[35px] z-50'
                                onClick={() => { setIsPasswordVisible(!isPasswordVisible) }}>
                                {isPasswordVisible ? <FaEyeSlash size={20} /> : <FaRegEye size={20} />}
                            </Button>
                        </div>
                    </div>

                    <div className="form-group mb-5 w-full flex items-center justify-between ">
                        <span className='text-[15px] font-[500] text-[#8a8a8a]'>Already have an account?</span>

                        <Link to="/login" className='text-[15px] font-[600] text-[#3838ff] hover:underline hover:text-[#000]'>
                            Log In
                        </Link>
                    </div>

                    <Button
                        type='submit'
                        disabled={!validValue}
                        className='!bg-[#3838ff] !text-white hover:!bg-[#000] !capitalize !rounded-md font-[600] !text-[15px] !py-2 !px-4 w-full'
                    >
                        {
                            isLoading === true ? <CircularProgress color="inherit" size={20} />
                                :
                                "Sign Up"
                        }
                    </Button>
                </form>
            </div>
        </section>
    )
}

export default SignUp;