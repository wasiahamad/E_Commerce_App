import React, { use, useContext, useEffect, useState } from 'react';

import { Button, CircularProgress, TextField } from '@mui/material';

import AccountSideBar from '../../components/AccountSideBar';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { editUserData } from '../../utils/api';


const MyAccount = () => {
    const context = useContext(MyContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(context.userId || "");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
    });

    // useEffect to set initial form data
    useEffect(() => {
        if (context?.userData) {
            setFormData({
                name: context?.userData?.name,
                email: context?.userData?.email,
                mobile: context?.userData?.mobile,
            });
        }
    }, [context?.userData]);

    // check if all form fields are valid
    const validValue = Object.values(formData).every((item) => item);


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

    // function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // API call
        editUserData(`/api/v1/user/${context.userId}`, formData)
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
                    navigate("/");

                } else {
                    context.alertBox("error", res?.message);
                    setLoading(false);
                }
            });
    };

    return (
        <section className='py-10 w-full'>
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <AccountSideBar />
                </div>

                <div className="col2 w-[50%]">
                    <div className="card shadow-md rounded-md bg-white p-5">
                        <h2 className='pb-3'>My Profile</h2>
                        <hr />

                        <form action="" className=" my-5" onSubmit={handleSubmit}>
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
                                        value={formData.name}
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
                                        value={formData.email}
                                        disabled={loading === true ? true : false}
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
                                        value={formData.mobile}
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
            </div>
        </section>
    );
};

export default MyAccount;