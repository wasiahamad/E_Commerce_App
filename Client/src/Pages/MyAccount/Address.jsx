import React, { useContext, useEffect, useState } from 'react'
import AccountSideBar from '../../components/AccountSideBar'
import { Menu, MenuItem, Radio } from '@mui/material'
import { MyContext } from '../../App';
import { Drawer } from "@mui/material";
import AddAddressForm from './AddAddress';
import { deleteData, getData, postData } from '../../utils/api';
import { CiMenuKebab } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Address = () => {
    const context = useContext(MyContext);
    const [address, setAddress] = useState([]);
    const [open, setOpen] = useState(false);
    const [editDataField, setEditDataField] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null); // ✅ stores the clicked address
    const [selectedValue, setSelectedValue] = useState(''); // currently selected address id

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event, addressItem) => {
        setAnchorEl(event.currentTarget);
        setSelectedAddress(addressItem); // ✅ store this address

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // radio button handler
    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);

        // store in localStorage
        localStorage.setItem("selectedAddress", value);

        // notify server about selected address
        postData("/api/v1/address/select-address", { addressId: value })
            .then((res) => {
                if (res && !res.error) {
                    // update local address state to reflect selection
                    setAddress((prev) => prev.map(a => ({ ...a, selected: a._id === value })));
                    context.alertBox("success", "Address selected");
                }
            })
            .catch((err) => console.error(err));
    };

    // useEffect for setting initial selected address after addresses load
    useEffect(() => {
        const saved = localStorage.getItem("selectedAddress");
        if (saved) {
            setSelectedValue(saved);
        }
    }, []);

    // 

    useEffect(() => {
        if (context?.userData) {
            getData(`/api/v1/address/get/${context.userData._id}`).then((res) => {
                console.log("response", res);
                setAddress(res.data);
                try {
                    localStorage.setItem('addresses_cache', JSON.stringify(res.data || []));
                } catch (err) {
                    console.error('Failed to cache addresses', err);
                }
            });
        }
    }, [context?.userData]);

    // fetch addresses function
    const fetchAddresses = () => {
        if (context?.userData) {
            getData(`/api/v1/address/get/${context.userData._id}`).then((res) => {
                setAddress(res.data);
            });
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [context?.userData]);

    // delete address function
    const handleDelete = () => {
        if (!selectedAddress?._id) return;

        deleteData(`/api/v1/address/delete/${selectedAddress._id}`)
            .then((res) => {
                if (res && !res.error) {
                    context.alertBox("success", res?.message || "Address deleted successfully");

                    // ✅ Remove from local state without reload
                    setAddress((prev) => prev.filter(addr => addr._id !== selectedAddress._id));
                } else {
                    context.alertBox("error", res?.message || "Failed to delete address");
                }
            })
            .catch(() => {
                context.alertBox("error", "Something went wrong");
            })
            .finally(() => {
                handleClose();
            });
    };

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
                            onClick={() => {
                                setOpen(true);
                                setEditDataField(null);
                            }}
                        >
                            <span className="text-[15px] font-[500] text-[#262424]">
                                Add Address
                            </span>
                        </div>

                        {/* Right Side Drawer */}
                        <Drawer
                            anchor="right"
                            open={open}
                            onClose={() => {
                                setOpen(false);
                                setEditDataField(null);
                            }}

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
                            <AddAddressForm editDataField={editDataField}
                                onClose={() => {
                                    setOpen(false);
                                    setEditDataField(null);
                                }}
                                onRefresh={fetchAddresses}
                            />
                        </Drawer>

                        <div className="flex gap-4 flex-col ">
                            {
                                address?.length > 0 && address.map((item, index) => {
                                    return (
                                        <label key={index} className="addressBox w-full flex items-center justify-between bg-[#fafafa] border border-dashed border-[rgba(0,0,0,0.2)] hover:bg-[#f1faff] cursor-pointer p-5 mt-4">
                                            <Radio
                                                checked={selectedValue === item?._id}
                                                onChange={handleChange}
                                                value={item?._id}
                                                name="selected-address"
                                                inputProps={{ 'aria-label': 'Select address' }}
                                            />
                                            <span className="text-[15px] font-[500] ">{item?.address_line + ", " + item?.country + ", " + item?.city + ", " + item?.state + ", " + item?.pincode + ", " + item?.mobile}</span>

                                            <span>
                                                <CiMenuKebab size={25} onClick={(event) => handleClick(event, item)} />
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleClose}
                                                >
                                                    <MenuItem onClick={() => {
                                                        // setEditDataField(item); // set the current address to edit
                                                        setEditDataField(selectedAddress); // ✅ always correct address
                                                        setOpen(true); // open drawer
                                                        handleClose(); // close menu
                                                    }}>
                                                        Edit
                                                    </MenuItem>
                                                    <MenuItem onClick={handleDelete} >Delete</MenuItem>
                                                </Menu>
                                            </span>
                                        </label>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Address