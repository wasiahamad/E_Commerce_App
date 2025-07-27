import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";
import CircularProgress from '@mui/material/CircularProgress';


const Register = () => {
    // loading state
    const [loading, setLoading] = useState(false);
    // password visibility state
    const [showPassword, setShowPassword] = useState(false);
    const context = useContext(MyContext);

    // passwors visibility function
    const isStrongPassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        return hasUppercase && hasLowercase && hasNumber;
    };

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

    // validate 
    const validValue = Object.values(formData).every((item) => item);

    // function to handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
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

                    setFormData({
                        name: "",
                        email: "",
                        password: "",
                    });
                    setLoading(false);
                } else {
                    context.alertBox("error", res?.message);
                    setLoading(false);
                }
            });


    };

    console.log("formData...", formData);

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
                    <form className="w-full mt-5 " onSubmit={handleSubmit}>
                        <div className="form-group relative w-full mb-5">
                            <TextField
                                id="name"
                                name="name"
                                value={formData.name}
                                disabled={loading === true ? true : false}
                                label="Full Name"
                                variant="outlined"
                                className="w-full"
                                type="text"
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className="form-group relative w-full mb-5">
                            <TextField
                                id="email"
                                name="email"
                                value={formData.email}
                                disabled={loading === true ? true : false}
                                label="Email Address"
                                variant="outlined"
                                className="w-full"
                                type="email"
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className="form-group relative w-full mb-5">
                            <TextField
                                id="password"
                                name="password"
                                value={formData.password}
                                disabled={loading === true ? true : false}
                                label="Password "
                                variant="outlined"
                                className="w-full"
                                onChange={onChangeInput}
                                type={showPassword ? "text" : "password"}
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
                                disabled={!validValue}
                                type="submit"
                                className="w-full !bg-[#ff5252] !text-white hover:!bg-black !rounded-md !h-[47px] !text-[14px] !font-[600] flex gap-3"
                            >
                                {
                                    loading === true ? <CircularProgress color="inherit" size={20} />
                                        :
                                        "Register"
                                }

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
