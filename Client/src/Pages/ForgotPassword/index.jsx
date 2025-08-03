import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress } from "@mui/material";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

const ForgotPassword = () => {
    // password visibility state
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [loading, setLoading] = useState(false);

    const context = useContext(MyContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: localStorage.getItem("userEmail"),
        newPassword: "",
        confirmPassword: "",
    })

    const validValue = Object.values(formData).every((item) => item);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData(() => {
            return {
                ...formData,
                [name]: value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.newPassword === "" || formData.confirmPassword === "") {
            setLoading(false);
            return context.alertBox("error", "All fields are required");
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setLoading(false);
            return context.alertBox("error", "Passwords do not match");
        }

        // API call
        postData("/api/v1/user/resetPasswordWithOtp", formData)
            .then((res) => {
                console.log("response", res);
                if (res?.error !== true) {
                    context.alertBox("success", res?.message);
                    setFormData({
                        newPassword: "",
                        confirmPassword: "",
                    });
                    localStorage.removeItem("userEmail");
                    // Clear localStorage or perform any other necessary actions
                    setLoading(false);
                    navigate("/login");
                } else {
                    context.alertBox("error", res?.message);
                    setLoading(false);
                }
            });
    };



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
                                id="password"
                                label="New Password "
                                variant="outlined"
                                className="w-full"
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                onChange={onChangeInput}
                                value={formData.newPassword}
                                disabled={loading === true ? true : false}
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
                                name="confirmPassword"
                                type={showPassword2 ? "text" : "password"}
                                onChange={onChangeInput}
                                value={formData.confirmPassword}
                                disabled={loading === true ? true : false}
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
                                disabled={!validValue}
                                type="submit"
                                className="w-full !bg-[#ff5252] !text-white hover:!bg-black !rounded-md !h-[47px] !text-[14px] !font-[600] flex gap-3"
                            >
                                {
                                    loading === true ? <CircularProgress color="inherit" size={20} />
                                        :
                                        "Change Password"
                                }
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
