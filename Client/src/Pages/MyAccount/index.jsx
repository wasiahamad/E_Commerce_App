import { useContext, useEffect, useState } from 'react';

import { Button, CircularProgress, TextField } from '@mui/material';
import { Collapse } from 'react-collapse';
import AccountSideBar from '../../components/AccountSideBar';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { editUserData, postData } from '../../utils/api';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';


const MyAccount = () => {
    const context = useContext(MyContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const [phone, setPhone] = useState("");

    const [formData, setFormData] = useState({
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
            setFormData({
                name: context?.userData?.name,
                email: context?.userData?.email,
                mobile: context?.userData?.mobile,
            });

            const ph = `${context?.userData?.mobile}`;
            setPhone(ph);

            setChangePassword({
                email: context?.userData?.email
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
        editUserData(`/api/v1/user/${context.userId}`, formData)
            .then((res) => {
                console.log("response", res);
                if (res?.error !== true) {
                    context.alertBox("success", res?.message);
                    setFormData({
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
                    navigate("/my-account");
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

    return (
        <section className='py-10 w-full'>
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <AccountSideBar />
                </div>

                <div className="col2 w-[50%]">
                    <div className="card shadow-md mb-5 rounded-md bg-white p-5">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className='pb-3'>My Profile</h2>
                            <Button onClick={() => setOpenChangePassword(!openChangePassword)}>
                                Change Password
                            </Button>
                        </div>
                        <hr />

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
                                        disabled={true}
                                    />
                                </div>
                            </div>

                            <div className="form-group flex items-center gap-5 mt-4">
                                <div className=" w-[50%]">
                                    <PhoneInput
                                        defaultCountry="in"
                                        value={phone}
                                        disabled={loading === true ? true : false}
                                        onChange={(phone) => setPhone(phone)}
                                        name="mobile"
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

                    <Collapse isOpened={openChangePassword}>
                        <div className="card shadow-md rounded-md bg-white p-5">
                            <div className="flex items-center justify-between pb-3">
                                <h2 className='pb-0'>Change Password</h2>
                            </div>
                            <hr />
                            <form action="" className="mt-8" onSubmit={handleChangePassword}>
                                <div className="form-group flex items-center gap-5">
                                    <div className="w-[50%]">
                                        <TextField
                                            id="password"
                                            label="Old Password"
                                            variant="outlined"
                                            className="w-full"
                                            type="password"
                                            size="small"
                                            name="password"
                                            onChange={onChangeInput}
                                            value={changePassword.password}
                                            disabled={loading2 === true ? true : false}
                                        />
                                    </div>

                                    <div className="w-[50%]">
                                        <TextField
                                            id="newPassword"
                                            label="New Password"
                                            variant="outlined"
                                            className="w-full"
                                            type="password"
                                            size="small"
                                            name="newPassword"
                                            onChange={onChangeInput}
                                            value={changePassword.newPassword}
                                            disabled={loading2 === true ? true : false}
                                        />
                                    </div>
                                </div>

                                <div className="form-group flex items-center gap-5 mt-4">
                                    <div className="w-[50%]">
                                        <TextField
                                            id="confirmPassword"
                                            label="Confirm Password"
                                            variant="outlined"
                                            className="w-full"
                                            type="text"
                                            size="small"
                                            name="confirmPassword"
                                            onChange={onChangeInput}
                                            value={changePassword.confirmPassword}
                                            disabled={loading2 === true ? true : false}
                                        />
                                    </div>
                                </div>
                                <br />
                                <div className="flex items-center ">
                                    <Button variant='contained' className='!bg-[#f44336] font-[500]'
                                        disabled={!validValue2 || loading2 === true ? true : false}
                                        type="submit">
                                        {
                                            loading2 === true ? <CircularProgress color="inherit" size={20} />
                                                :
                                                "Change Password"
                                        }
                                    </Button>
                                </div>
                            </form>

                        </div>
                    </Collapse>
                </div>
            </div>
        </section>
    );
};

export default MyAccount;