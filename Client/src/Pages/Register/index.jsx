import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";



const Register = () => {
    // password visibility state
    const [showPassword, setShowPassword] = useState(false);

    // from backend data state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

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

    // function to handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    console.log(formData);

    // function to handle password visibility
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    return (
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[400px] mx-auto rounded-md bg-white p-5 px-12 ">
                    <h2 className="text-[18px] font-semibold text-black text-center mb-4">
                        Register with a new account
                    </h2>
                    <form action="" className="w-full mt-5 " onSubmit={handleSubmit}>
                        <div className="form-group relative w-full mb-5">
                            <TextField
                                id="name"
                                name="name"
                                label="Full Name"
                                variant="outlined"
                                className="w-full"
                                type="text"
                                onChange={onChangeInput}
                                required
                            />
                        </div>
                        <div className="form-group relative w-full mb-5">
                            <TextField
                                id="email"
                                name="email"
                                label="Email Address"
                                variant="outlined"
                                className="w-full"
                                type="email"
                                onChange={onChangeInput}
                                required
                            />
                        </div>
                        <div className="form-group relative w-full mb-5">
                            <TextField
                                id="password"
                                name="password"
                                label="Password "
                                variant="outlined"
                                className="w-full"
                                onChange={onChangeInput}
                                type={showPassword ? "text" : "password"}
                                required
                            />

                            <Button
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
                        <div className="flex items-center mt-4">
                            <Button
                                className="w-full !bg-[#ff5252] !text-white !rounded-md !h-[47px] !text-[14px] !font-[600] "
                            >
                                Register
                            </Button>
                        </div>

                        <p className="text-[#000] text-[14px] font-[400] text-center">
                        Already have an account? {" "}
                            <Link to="/login" className="text-[#ff5252] font-[600]">
                                Login
                            </Link>
                        </p>
                        <p className="text-[#000] text-[14px] font-[500] text-center">
                            Or continue with social account
                        </p>
                        <div className="flex items-center justify-center mt-4 ">
                            <Button
                                className="w-full !bg-[#f1f1f1] !text-[#000] !rounded-md !h-[45px] !text-[13px] !font-[600] "
                            >
                                <FcGoogle className="!text-[20px] mr-2" />
                                SignUp with Google
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    );
};

export default Register;
