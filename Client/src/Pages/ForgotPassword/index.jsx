import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";

const ForgotPassword = () => {
    // password visibility state
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);


    // function to handle password visibility
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const context = useContext(MyContext);
    const history = useNavigate();

    return (
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[400px] mx-auto rounded-md bg-white p-5 px-12 ">
                    <h2 className="text-[18px] font-semibold text-black text-center mb-4">
                        Login to your account
                    </h2>
                    <form action="" className="w-full mt-5 ">
                        <div className="form-group relative w-full mb-5">
                            <TextField
                                id="password"
                                label="New Password "
                                variant="outlined"
                                className="w-full"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                            />

                            <Button
                                type="submit"
                                className="!w-[35px] !h-[35px] !min-w-[35px] !absolute !rounded-full top-[10px] right-[10px] opacity-75 "
                                onClick={(e) => {
                                    setShowPassword(!showPassword);
                                }}

                            >
                                {showPassword ? (
                                    <IoEyeSharp className="text-[#000] !text-[20px] " />
                                ) : (
                                    <IoEyeOffSharp className="text-[#000] !text-[20px] " />
                                )}
                            </Button>
                        </div>
                        <div className="form-group relative w-full mb-5">
                            <TextField
                                id="confirmpassword"
                                label="Confirm Password "
                                variant="outlined"
                                className="w-full"
                                name="confirmpassword"
                                type={showPassword2 ? "text" : "password"}
                                required
                            />

                            <Button
                                type="submit"
                                className="!w-[35px] !h-[35px] !min-w-[35px] !absolute !rounded-full top-[10px] right-[10px] opacity-75 "
                                onClick={(e) => {
                                    setShowPassword2(!showPassword2);
                                }}

                            >
                                {showPassword2 ? (
                                    <IoEyeSharp className="text-[#000] !text-[20px] " />
                                ) : (
                                    <IoEyeOffSharp className="text-[#000] !text-[20px] " />
                                )}
                            </Button>
                        </div>

                        <div className="flex items-center mt-4">
                            <Button
                                className="w-full !bg-[#ff5252] !text-white !rounded-md !h-[47px] !text-[14px] !font-[600] "
                            >
                                Change Password
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
