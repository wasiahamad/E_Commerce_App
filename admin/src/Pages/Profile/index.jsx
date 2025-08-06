import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { IoMdCloudUpload } from "react-icons/io";
import { editData, editUserData } from "../../utils/api";
import { Button, TextField } from "@mui/material";

const Profile = () => {
    const context = useContext(MyContext);
    const [uploadedImage, setUploadedImage] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);

    const [formFileds, setFormFileds] = useState({
        name: "",
        email: "",
        mobile: "",
    });

    const [changePassword, setChangePassword] = useState({
        email: "",
        password: "",
        newPassword: "",
        confirmPassword: "",
    });

    // useEffect to set initial form data
    useEffect(() => {
        if (context?.userData) {
            setFormFileds({
                name: context?.userData?.name,
                email: context?.userData?.email,
                mobile: context?.userData?.mobile,
            });

            setChangePassword({
                email: context?.userData?.email
            });
        }
    }, [context?.userData]);

    // check if all form fields are valid
    const validValue = Object.values(formFileds).every((item) => item);

    // function to handle input change
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFileds(() => {
            return {
                ...formFileds,
                [name]: value,
            };
        });

        setChangePassword(() => {
            return {
                ...changePassword,
                [name]: value,
            };
        });
    };

    // check if all form fields are valid
    const validValue2 = Object.values(changePassword).every((item) => item);



    // function to handle form submission for profile
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // API call
        editUserData(`/api/v1/user/${context.userId}`, formFileds)
            .then((res) => {
                console.log("response", res);
                if (res?.error !== true) {
                    context.alertBox("success", res?.message);
                    setFormFileds({
                        name: res?.data?.name,
                        email: res?.data?.email,
                        mobile: res?.data?.mobile,
                    });
                    setLoading(false);
                    navigate("/my-account");
                    context.setUserData(res?.data);
                } else {
                    context.alertBox("error", res?.message);
                    setLoading(false);
                }
            });
    };

    // function to handle password change
    const handleChangePassword = (e) => {
        e.preventDefault();
        setLoading2(true);

        if (changePassword.password === "") {
            setLoading2(false);
            context.alertBox("error", "Old password is required");
            return;
        }

        if (changePassword.newPassword === "" || changePassword.confirmPassword === "") {
            setLoading2(false);
            context.alertBox("error", "Please fill new password and confirm password");
            return;
        }

        if (changePassword.newPassword !== changePassword.confirmPassword) {
            setLoading2(false);
            context.alertBox("error", "New password and confirm password do not match");
            return;
        }

        // API call
        postData(`/api/v1/user/resetPassword`, changePassword, { withCredentials: true })
            .then((res) => {
                console.log("response", res);
                if (res?.error !== true) {
                    context.alertBox("success", res?.message);
                    setLoading2(false);
                    navigate("/profile");
                    // uske bad form ko bnd kr dena h 
                    setChangePassword({
                        password: "",
                        newPassword: "",
                        confirmPassword: "",
                    });

                } else {
                    context.alertBox("error", res?.message);
                    setLoading2(false);
                }
            });
    };

    useEffect(() => {
        // Fetch user avatar from local storage or API if needed
        const userAvatar = localStorage.getItem("userAvatar");
        if (userAvatar) {
            setPreviewImage(userAvatar);
        }
    }, [context?.userData]);

    let selectedImg = [];
    const formData = new FormData();

    // Function to handle file upload
    const onChangeFile = (e, apiUrl) => {
        try {
            setPreviewImage([]);
            const file = e.target.files;
            setUploadedImage(true);
            console.log(file);
            for (let i = 0; i < file.length; i++) {
                if (file[i] && file[i].type === "image/jpeg" || file[i].type === "image/png" || file[i].type === "image/jpg" || file[i].type === "image/webp") {
                    const files = file[i];
                    selectedImg.push(files);
                    formData.append("avatar", files);
                } else {
                    context.alertBox("error", "Invalid file format selected. Please select an image file.");
                    setUploadedImage(false);
                    return;
                }
            }

            editData("/api/v1/user/avatar", formData)
                .then((res) => {
                    console.log("res", res);
                    if (res?.error !== true) {
                        context.alertBox("success", res?.message || "Image uploaded successfully.");
                        setUploadedImage(false);
                        setPreviewImage(res?.data?.avatar);
                        localStorage.setItem("userAvatar", res?.data?.avatar);
                        // window.location.reload();
                    } else {
                        context.alertBox("error", "Invalid file format selected. Please select an image file.");
                        setUploadedImage(false);
                        return;
                    }
                });
        } catch (error) {
            console.error("Error uploading file:", error);
            context.alertBox("error", error.message || "Error uploading file");
        }
    }

    return (
        <>
            <div className={`contentRight  py-4 px-5 ${context.isSidebarOpen ? "w-[80%]" : "w-[100%] pl-0"} transition-all duration-300`}>

                <div className="w-full bg-white pt-5 px-5 border border-[rgba(0,0,0,0.1)] shadow-md sm:rounded-lg ">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[18px] font-[600]">
                            User Profile
                        </h2>
                        <Button onClick={() => setOpenChangePassword(!openChangePassword)}>
                            Change Password
                        </Button>
                    </div>
                    <br />

                    <div className="rounded-full w-[110px] h-[110px] overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200">

                        {
                            uploadedImage === true ? <CircularProgress color="inherit" />
                                : <>
                                    {previewImage ? (
                                        <img src={previewImage} alt="User Avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <img src="/user.jpg" alt="Default Avatar" className="w-full h-full object-cover" />
                                    )}

                                </>
                        }

                        <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center opacity-0 transition-all group-hover:opacity-100">
                            <IoMdCloudUpload className='text-[30px] text-white' />
                            <input type="file" className=' absolute top-0 left-0 w-[100%] h-[100%] cursor-pointer opacity-0 '
                                accept="image/*"
                                onChange={(e) => {
                                    onChangeFile(e, "/api/v1/user/avatar");
                                }}
                                name='avatar'
                            />
                        </div>
                    </div>

                    <form action="" className="mt-8" onSubmit={handleSubmit}>
                        <div className="form-group flex items-center gap-5">
                            <div className="w-[50%]">
                                <TextField
                                    id="name"
                                    label="Full Name"
                                    variant="outlined"
                                    className="w-full"
                                    type="text"
                                    size="small"
                                    name="name"
                                    onChange={onChangeInput}
                                    value={formFileds.name}
                                    disabled={loading === true ? true : false}
                                />
                            </div>

                            <div className="w-[50%]">
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    className="w-full"
                                    type="email"
                                    size="small"
                                    name="email"
                                    onChange={onChangeInput}
                                    value={formFileds.email}
                                    disabled={true}
                                />
                            </div>
                        </div>

                        <div className="form-group flex items-center gap-5 mt-4">
                            <div className="w-[50%]">
                                <TextField
                                    id="phone"
                                    label="Phone Number"
                                    variant="outlined"
                                    className="w-full"
                                    type="text"
                                    size="small"
                                    name="mobile"
                                    onChange={onChangeInput}
                                    value={formFileds.mobile}
                                    disabled={loading === true ? true : false}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="flex items-center ">
                            <Button variant='contained' className='!bg-[#f44336] font-[500]'
                                disabled={!validValue || loading === true ? true : false}
                                type="submit">
                                {
                                    loading === true ? <CircularProgress color="inherit" size={20} />
                                        :
                                        "Update Profile"
                                }
                            </Button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
};

export default Profile;