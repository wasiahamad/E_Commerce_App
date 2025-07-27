import React from 'react';

import { Button, TextField } from '@mui/material';

import AccountSideBar from '../../components/AccountSideBar';


const MyAccount = () => {
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

                        <form action="" className=" my-5">
                            <div className="form-group flex items-center gap-5">
                                <div className="w-[50%]">
                                    <TextField
                                        id="name"
                                        label="Full Name"
                                        variant="outlined"
                                        className="w-full"
                                        type="text"
                                        size="small"
                                        required
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
                                        required
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
                                        required
                                    />
                                </div>
                            </div>
<br />
                               <div className="flex items-center ">
                                    <Button variant='contained' className='!bg-[#f44336] font-[500]'>Save Changes</Button>
                               </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyAccount;