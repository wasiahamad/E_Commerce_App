import React, { useContext, useEffect, useState } from 'react'
import AccountSideBar from '../../components/AccountSideBar'
import { Radio } from '@mui/material'
import { MyContext } from '../../App';
import { Drawer } from "@mui/material";
import AddAddressForm from './AddAddress';
import { getData, postData } from '../../utils/api';




const Address = () => {
    const context = useContext(MyContext);
    const [address, setAddress] = useState([]);
    const [open, setOpen] = useState(false);

    // radio button handler
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);

        // store in localStorage
        localStorage.setItem("selected", value);

        postData("/api/v1/address/select-address", { addressId: value })
            .then((res) => console.log(res));
    };

    // useEffect for setting initial selected address
    useEffect(() => {
        // Try localStorage first
        const savedAddress = localStorage.getItem("selected");

        if (savedAddress) {
            setSelectedValue(savedAddress);
        } else if (context?.userData?.address) {
            setSelectedValue(context.userData.address);
        }
    }, [context?.userData?.address]);

    useEffect(() => {
        if (context?.userData) {
            getData(`/api/v1/address/get/${context.userData._id}`).then((res) => {
                console.log("response", res);
                setAddress(res.data);
            });
        }
    }, [context?.userData]);
       
    return (
        <section className='py-10 w-full'>
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <AccountSideBar />
                </div>

                <div className="col2 w-[50%]">
                    <div className="shadow-md rounded-md bg-white p-5">
                        <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                            <h4 className="text-[18px] font-[600] text-[#000] opacity-75">Your Address</h4>
                        </div>

                        {/* <div className="flex items-center justify-center p-5 border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer "
                            onClick={() => { context.setAddressModal(true) }}>
                            <span className="text-[15px] font-[500] text-[#262424]">Add Address</span>
                        </div> */}

                        <div
                            className="flex items-center justify-center p-5 border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
                            onClick={() => setOpen(true)}
                        >
                            <span className="text-[15px] font-[500] text-[#262424]">
                                Add Address
                            </span>
                        </div>

                        {/* Right Side Drawer */}
                        <Drawer
                            anchor="right"
                            open={open}
                            onClose={() => setOpen(false)}
                            PaperProps={{
                                sx: { width: 500, padding: 2 } // drawer width
                            }}
                        >
                            {/* Close button */}
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-semibold">Add Delivery Address</h2>
                                <button onClick={() => setOpen(false)} className="text-gray-600 hover:text-black">
                                    ✕
                                </button>
                            </div>

                            {/* Form */}
                            <AddAddressForm />
                        </Drawer>

                        <div className="flex gap-4 flex-col ">
                            {
                                address?.length > 0 && address.map((item, index) => {
                                    return (
                                        <label key={index} className="addressBox w-full flex items-center justify-center bg-[#f1faff] border border-dashed border-[rgba(0,0,0,0.2)] hover:bg-[#e7f3f9] cursor-pointer p-5 mt-4">
                                            <Radio
                                                checked={selectedValue === item?._id}
                                                onChange={handleChange}
                                                value={item?._id}
                                                name="radio-buttons"
                                                inputProps={{ 'aria-label': 'A' }}
                                            />
                                            <span className="text-[15px] font-[500] ">{item?.address_line + ", " + item?.country + ", " + item?.city + ", " + item?.state + ", " + item?.pincode + ", " + item?.mobile}</span>
                                        </label>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Address