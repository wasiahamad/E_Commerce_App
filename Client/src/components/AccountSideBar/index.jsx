import React, { use, useContext, useEffect, useState } from 'react'
import { SlLocationPin } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa6";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { IoMdCloudUpload } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { Button } from '@mui/material';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { editData } from '../../utils/api';

const AccountSideBar = () => {
    const context = useContext(MyContext);
    // State variables for image handling
    const [previewImage, setPreviewImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(false);

    let selectedImg = [];
    const formData = new FormData();

    useEffect   (() => {
        // Fetch user avatar from local storage or API if needed
        const userAvatar = localStorage.getItem("userAvatar");
        if (userAvatar) {
            setPreviewImage(userAvatar);
        }
    }, [context?.userData]);

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
        <div className="card shadow-md rounded-md bg-white sticky top-[250px]">
            <div className="w-full p-5 flex items-center justify-center flex-col  ">
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

                <h3>{context?.userData?.name}</h3>
                <h6 className='text-[rgba(0,0,0,0.6)] text-[13px] font-[500]'>{context?.userData?.email}</h6>
            </div>

            <ul className='list-none pb-5 bg-[#f1f1f1] myAccountTabs'>
                <li className='w-full'>
                    <NavLink to="/my-account" exact={true} activeClassName="isActive">
                        <Button className='flex items-center !justify-start !py-2 gap-2 w-full !rounded-none !capitalize !text-[rgba(0,0,0,0.8)] !px-5'>
                            <FaRegUser size={15} /> My Profile
                        </Button>
                    </NavLink>
                </li>

                <li className='w-full'>
                    <NavLink to="/address" exact={true} activeClassName="isActive">
                        <Button className='flex items-center !justify-start !py-2 gap-2 w-full !rounded-none !capitalize !text-[rgba(0,0,0,0.8)] !px-5'>
                            <SlLocationPin size={17} /> Address
                        </Button>
                    </NavLink>
                </li>

                <li className='w-full'>
                    <NavLink to="/my-list" exact={true} activeClassName="isActive">
                        <Button className='flex items-center !justify-start !py-2 gap-2 w-full !rounded-none !capitalize !text-[rgba(0,0,0,0.8)] !px-5'>
                            <FaRegHeart size={15} /> My List
                        </Button>
                    </NavLink>
                </li>

                <li className='w-full'>
                    <NavLink to="/my-orders" exact={true} activeClassName="isActive">
                        <Button className='flex items-center !justify-start !py-2 gap-2 w-full !rounded-none !capitalize !text-[rgba(0,0,0,0.8)] !px-5'>
                            <IoBagCheckOutline size={17} /> My Orders
                        </Button>
                    </NavLink>
                </li>

                <li className='w-full'>
                    <NavLink to="/logout" exact={true} activeClassName="isActive">
                        <Button className='flex items-center !justify-start !py-2 gap-2 w-full !rounded-none !capitalize !text-[rgba(0,0,0,0.8)] !px-5'>
                            <MdLogout size={17} /> Logout
                        </Button>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default AccountSideBar