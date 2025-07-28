import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from "../../utils/api";



const Login = (props) => {
    // loading state
    const [loading, setLoading] = useState(false);
    // password visibility state
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    // validate 
    const validValue = Object.values(formData).every((item) => item);

    // function to handle password visibility
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const context = useContext(MyContext);
    const history = useNavigate();

    // function to handle input change
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData(() => {
            return {
                ...formData,
                [name]: value,
            };
        });
    };

    // handle to the form
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // API call
        postData("/api/v1/user/login", formData, { withCredentials: true })
            .then((res) => {
                console.log("response", res);
                if (res?.error !== true) {
                    context.alertBox("success", res?.message);
                    setFormData({
                        email: "",
                        password: "",
                    });
                    setLoading(false);
                    localStorage.setItem("accessToken", res?.accessToken);
                    localStorage.setItem("refreshToken", res?.refreshToken);
                    console.log("username", res?.data?.name);
                    context.setIsLoggedIn(true);
                    history("/");

                } else {
                    context.alertBox("error", res?.message);
                    setLoading(false);
                }
            });
    };

    const forgotPassword = () => {
        if (formData.email === "") {
            context.alertBox("error", "Please enter your email address");
        } else {
            localStorage.setItem("userEmail", formData.email);
            localStorage.setItem("actionType", 'forgot-password');
           history("/verify");
           context.alertBox("success", "An OTP has been sent to your email address");

        }
    }

    return (
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[400px] mx-auto rounded-md bg-white p-5 px-12 ">
                    <h2 className="text-[18px] font-semibold text-black text-center mb-4">
                        Login to your account
                    </h2>
                    <form action="" className="w-full mt-5 " onSubmit={handleSubmit}>
                        <div className="form-group relative w-full mb-5">
                            <TextField
                                id="email"
                                label="Email Address"
                                variant="outlined"
                                className="w-full"
                                type="email"
                                name="email"
                                onChange={onChangeInput}
                                value={formData.email}
                                disabled={loading === true ? true : false}
                            />
                        </div>
                        <div className="form-group relative w-full mb-5">
                            <TextField
                                id="password"
                                label="Password "
                                variant="outlined"
                                className="w-full"
                                name="password"
                                onChange={onChangeInput}
                                value={formData.password}
                                disabled={loading === true ? true : false}
                                type={showPassword ? "text" : "password"}
                            />

                            <Button
                                type="submit"
                                className="!w-[35px] !h-[35px] !min-w-[35px] !absolute !rounded-full top-[10px] right-[10px] opacity-75 "
                                onClick={(e) => {
                                    handlePasswordVisibility();
                                }}

                            >
                                {showPassword ? (
                                    <IoEyeSharp className="text-[#000] !text-[20px] " />
                                ) : (
                                    <IoEyeOffSharp className="text-[#000] !text-[20px] " />
                                )}
                            </Button>
                        </div>

                        <a href="" className="text-[#000] link text-[14px] font-semibold"
                            onClick={forgotPassword}>
                            Forgot Password?
                        </a>

                        <div className="flex items-center mt-4">
                            <Button
                                disabled={!validValue}
                                type="submit"
                                className="w-full !bg-[#ff5252] !text-white hover:!bg-black !rounded-md !h-[47px] !text-[14px] !font-[600] flex gap-3"
                            >
                                {
                                    loading === true ? <CircularProgress color="inherit" size={20} />
                                        :
                                        "Login"
                                }
                            </Button>
                        </div>

                        <p className="text-[#000] text-[14px] font-[400] text-center">
                            Not Registered?{" "}
                            <Link to="/register" className="text-[#ff5252] font-[600]">
                                Sign Up
                            </Link>
                        </p>
                        <p className="text-[#000] text-[14px] font-[500] text-center">
                            Or continue with social account
                        </p>
                        <div className="flex items-center justify-center mt-4 ">
                            <Button
                                className="w-full !bg-[#f1f1f1] !text-[#000] !rounded-md !h-[45px] !text-[14px] !font-[600] "
                            >
                                <FcGoogle className="!text-[20px] mr-2" />
                                Continue with Google
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
