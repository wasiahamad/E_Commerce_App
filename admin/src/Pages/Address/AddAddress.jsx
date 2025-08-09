// // import { Button, MenuItem, Select } from '@mui/material';
// // import React, { useContext, useState } from 'react'
// // import { MdCloudUpload } from 'react-icons/md';
// // import { PhoneInput } from 'react-international-phone';
// // import { MyContext } from '../../App';
// // import { postData } from '../../utils/api';

// // const AddAddress = () => {
// //     const [isStatus, setIsStatus] = useState(false);
// //     const [phone, setPhone] = useState("");
// //     const [loading, setLoading] = useState(false);

// //     const context = useContext(MyContext);

// //     const [formFileds, setFormFileds] = useState({
// //         address_line: "",
// //         city: "",
// //         state: "",
// //         country: "",
// //         pincode: "",
// //         mobile: "",
// //         status: "",
// //         userId: context?.userData?._id
// //     });
// //     const onChangeInput = (e) => {
// //         const { name, value } = e.target;
// //         setFormFileds(() => {
// //             return {
// //                 ...formFileds,
// //                 [name]: value,
// //             };
// //         });
// //     };

// //     // function to handle form submission for profile
// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         setLoading(true);
// //         console.log("formFileds", formFileds);
// //         if (formFileds.address_line == "" || formFileds.city == "" || formFileds.state == "" || formFileds.country == "" || formFileds.pincode == "" || formFileds.mobile == "") {
// //             context.alertBox("error", "Please fill all the fields");
// //             setLoading(false);
// //             return
// //         }

// //         // Add full phone with country code to form fields
// //         const updatedForm = { ...formFileds, mobile: phone };

// //         // API call
// //         postData("/api/v1/address/add", updatedForm)
// //             .then((res) => {
// //                 console.log("response", res);
// //                 if (res?.error !== true) {
// //                     context.alertBox("success", res?.message);
// //                     setFormFileds({
// //                         name: res?.data?.name,
// //                         email: res?.data?.email,
// //                         mobile: res?.data?.mobile,
// //                     });
// //                     setLoading(false);
// //                     context.setUserData(res?.data);

// //                     // ✅ Sirf success hone par redirect
// //                     window.location.href = "/profile";
// //                 } else {
// //                     context.alertBox("error", res?.message);
// //                     setLoading(false);
// //                 }
// //             });
// //     };

// //     return (
// //         <section className='p-5 bg-gray-50'>
// //             <form action="" className='form py-3 p-8' onSubmit={handleSubmit}>
// //                 <div className=' max-h-[70vh]  pr-4'>
// //                     <div className="grid grid-cols-4 mb-3 gap-5">
// //                         <div className="col">
// //                             <h3 className='text-[14px] font-[500] mb-1'> address_line </h3>
// //                             <input
// //                                 onChange={onChangeInput}
// //                                 name="address_line"
// //                                 type="text"
// //                                 placeholder='address line'
// //                                 className='w-full h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3' />
// //                         </div>

// //                         <div className="col">
// //                             <h3 className='text-[14px] font-[500] mb-1'> City</h3>
// //                             <input
// //                                 onChange={onChangeInput}
// //                                 value={formFileds.city}
// //                                 name="city"
// //                                 type="text"
// //                                 placeholder='city'
// //                                 className='w-full h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3' />
// //                         </div>

// //                         <div className="col">
// //                             <h3 className='text-[14px] font-[500] mb-1'> State</h3>
// //                             <input
// //                                 onChange={onChangeInput}
// //                                 value={formFileds.state}
// //                                 name="state"
// //                                 type="text"
// //                                 placeholder='state'
// //                                 className='w-full h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3' />
// //                         </div>

// //                         <div className="col">
// //                             <h3 className='text-[14px] font-[500] mb-1'>Country</h3>
// //                             <input
// //                                 onChange={onChangeInput}
// //                                 value={formFileds.country}
// //                                 name="country"
// //                                 type="text"
// //                                 placeholder='Country'
// //                                 className='w-full h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3' />
// //                         </div>

// //                         <div className="col">
// //                             <h3 className='text-[14px] font-[500] mb-1'>Pincode</h3>
// //                             <input
// //                                 onChange={onChangeInput}
// //                                 value={formFileds.pincode}
// //                                 name="pincode"
// //                                 type="text"
// //                                 placeholder='pincode'
// //                                 className='w-full h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3' />
// //                         </div>

// //                         <div className="col mt-7">
// //                             <PhoneInput
// //                                 defaultCountry="in"
// //                                 value={formFileds.mobile}
// //                                 disabled={loading === true ? true : false}
// //                                 onChange={(value) => setFormFileds(prev => ({ ...prev, mobile: value }))}
// //                                 name="mobile"
// //                             />
// //                         </div>

// //                         <div className='col'>
// //                             <label className='block mb-1 font-medium text-sm'>Status</label>
// //                             <Select
// //                                 value={formFileds.status}
// //                                 onChange={(e) => setFormFileds(prev => ({ ...prev, status: e.target.value }))}
// //                                 size="small"
// //                                 displayEmpty
// //                                 className="w-full"
// //                                 inputProps={{ 'aria-label': 'Without label' }}
// //                             >
// //                                 <MenuItem value={true}>True</MenuItem>
// //                                 <MenuItem value={false}>False</MenuItem>
// //                             </Select>
// //                         </div>
// //                     </div>

// //                 </div>
// //                 {/* <br /><hr /> */}
// //                 <div className='w-[250px]'>
// //                     <Button type="submit" className='!w-full !font-[600] !text-[16px] !bg-[#3872fa] !text-white !py-2 !rounded-[5px] !mt-5 !hover:bg-[#1a6df1]'>
// //                         <MdCloudUpload size={25} className='mr-2' />
// //                         Publish and View
// //                     </Button>
// //                 </div>
// //             </form>
// //         </section>
// //     )
// // }

// // export default AddAddress


// import { Button, MenuItem, Select } from "@mui/material";
// import React, { useContext, useState } from "react";
// import { MdCloudUpload } from "react-icons/md";
// import { PhoneInput } from "react-international-phone";
// import { MyContext } from "../../App";
// import { postData } from "../../utils/api";

// const AddAddress = () => {
//     const [loading, setLoading] = useState(false);
//     const context = useContext(MyContext);

//     const [formFileds, setFormFileds] = useState({
//         address_line: "",
//         city: "",
//         state: "",
//         country: "",
//         pincode: "",
//         mobile: "",
//         status: false,
//         userId: context?.userData?._id,
//     });

//     const onChangeInput = (e) => {
//         const { name, value } = e.target;
//         setFormFileds((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setLoading(true);



//         const { address_line, city, state, country, pincode, mobile } = formFileds;

//         // Validation
//         if (!address_line || !city || !state || !country || !pincode || !mobile) {
//             context.alertBox("error", "Please fill all the fields");
//             setLoading(false);
//             return;
//         }

//         // API call
//         postData("/api/v1/address/add", formFileds).then((res) => {
//             console.log("response", res);

//             if (res && res.error !== true) {
//                 context.alertBox("success", res?.message);
//                 context.setUserData(res?.data);

//                 setLoading(false);

//                 // ✅ Redirect only if truly successful
//                 window.location.href = "/profile";
//             } else {
//                 context.alertBox("error", res?.message || "Something went wrong");
//                 setLoading(false);
//             }
//         });
//     };

//     return (
//         <section className="p-5 bg-gray-50">
//             <form className="form py-3 p-8" onSubmit={handleSubmit}>
//                 <div className="max-h-[70vh] pr-4">
//                     <div className="grid grid-cols-4 mb-3 gap-5">
//                         <div className="col">
//                             <h3 className="text-[14px] font-[500] mb-1">Address Line</h3>
//                             <input
//                                 onChange={onChangeInput}
//                                 name="address_line"
//                                 value={formFileds.address_line}
//                                 type="text"
//                                 placeholder="address line"
//                                 className="w-full h-[40px] rounded-[5px] focus:outline-none border p-3"
//                             />
//                         </div>

//                         <div className="col">
//                             <h3 className="text-[14px] font-[500] mb-1">City</h3>
//                             <input
//                                 onChange={onChangeInput}
//                                 value={formFileds.city}
//                                 name="city"
//                                 type="text"
//                                 placeholder="city"
//                                 className="w-full h-[40px] rounded-[5px] focus:outline-none border p-3"
//                             />
//                         </div>

//                         <div className="col">
//                             <h3 className="text-[14px] font-[500] mb-1">State</h3>
//                             <input
//                                 onChange={onChangeInput}
//                                 value={formFileds.state}
//                                 name="state"
//                                 type="text"
//                                 placeholder="state"
//                                 className="w-full h-[40px] rounded-[5px] focus:outline-none border p-3"
//                             />
//                         </div>

//                         <div className="col">
//                             <h3 className="text-[14px] font-[500] mb-1">Country</h3>
//                             <input
//                                 onChange={onChangeInput}
//                                 value={formFileds.country}
//                                 name="country"
//                                 type="text"
//                                 placeholder="Country"
//                                 className="w-full h-[40px] rounded-[5px] focus:outline-none border p-3"
//                             />
//                         </div>

//                         <div className="col">
//                             <h3 className="text-[14px] font-[500] mb-1">Pincode</h3>
//                             <input
//                                 onChange={onChangeInput}
//                                 value={formFileds.pincode}
//                                 name="pincode"
//                                 type="text"
//                                 placeholder="pincode"
//                                 className="w-full h-[40px] rounded-[5px] focus:outline-none border p-3"
//                             />
//                         </div>

//                         <div className="col mt-7">
//                             <PhoneInput
//                                 defaultCountry="in"
//                                 value={formFileds.mobile}
//                                 disabled={loading}
//                                 onChange={(value) =>
//                                     setFormFileds((prev) => ({ ...prev, mobile: value }))
//                                 }
//                                 name="mobile"
//                             />
//                         </div>

//                         <div className="col">
//                             <label className="block mb-1 font-medium text-sm">Status</label>
//                             <Select
//                                 value={formFileds.status}
//                                 onChange={(e) =>
//                                     setFormFileds((prev) => ({
//                                         ...prev,
//                                         status: e.target.value,
//                                     }))
//                                 }
//                                 size="small"
//                                 displayEmpty
//                                 className="w-full"
//                                 inputProps={{ "aria-label": "Without label" }}
//                             >
//                                 <MenuItem value={true}>True</MenuItem>
//                                 <MenuItem value={false}>False</MenuItem>
//                             </Select>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="w-[250px]">
//                     <Button
//                         type="submit"
//                         className="!w-full !font-[600] !text-[16px] !bg-[#3872fa] !text-white !py-2 !rounded-[5px] !mt-5 !hover:bg-[#1a6df1]"
//                         disabled={loading}
//                     >
//                         <MdCloudUpload size={25} className="mr-2" />
//                         Publish and View
//                     </Button>
//                 </div>
//             </form>
//         </section>
//     );
// };

// export default AddAddress;


import { Button, MenuItem, Select } from "@mui/material";
import React, { useContext, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { PhoneInput } from "react-international-phone";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";

const AddAddress = () => {
    const [loading, setLoading] = useState(false);
    const context = useContext(MyContext);

    const [formFileds, setFormFileds] = useState({
        address_line: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        mobile: "",
        status: false
    });

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFileds((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // ✅ Ensure user is logged in
        if (!context?.userData?._id) {
            context.alertBox("error", "User not logged in");
            setLoading(false);
            return;
        }

        const { address_line, city, state, country, pincode, mobile } = formFileds;

        // ✅ Validation
        if (!address_line || !city || !state || !country || !pincode || !mobile) {
            context.alertBox("error", "Please fill all the fields");
            setLoading(false);
            return;
        }

        // ✅ Add userId before sending
        const updatedForm = {
            ...formFileds,
            userId: context.userData._id
        };

        postData("/api/v1/address/add", updatedForm)
            .then((res) => {
                console.log("response", res);

                if (res && res.error !== true) {
                    context.alertBox("success", res?.message);
                    context.setUserData(res?.data);
                    setLoading(false);
                    window.location.href = "/profile";
                } else {
                    context.alertBox("error", res?.message || "Something went wrong");
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error(err);
                context.alertBox("error", "Something went wrong");
                setLoading(false);
            });
    };

    return (
        <section className="p-5 bg-gray-50">
            <form className="form py-3 p-8" onSubmit={handleSubmit}>
                <div className="max-h-[70vh] pr-4">
                    <div className="grid grid-cols-4 mb-3 gap-5">
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Address Line</h3>
                            <input
                                onChange={onChangeInput}
                                name="address_line"
                                value={formFileds.address_line}
                                type="text"
                                placeholder="address line"
                                className="w-full h-[40px] rounded-[5px] focus:outline-none border p-3"
                            />
                        </div>

                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">City</h3>
                            <input
                                onChange={onChangeInput}
                                value={formFileds.city}
                                name="city"
                                type="text"
                                placeholder="city"
                                className="w-full h-[40px] rounded-[5px] focus:outline-none border p-3"
                            />
                        </div>

                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">State</h3>
                            <input
                                onChange={onChangeInput}
                                value={formFileds.state}
                                name="state"
                                type="text"
                                placeholder="state"
                                className="w-full h-[40px] rounded-[5px] focus:outline-none border p-3"
                            />
                        </div>

                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Country</h3>
                            <input
                                onChange={onChangeInput}
                                value={formFileds.country}
                                name="country"
                                type="text"
                                placeholder="Country"
                                className="w-full h-[40px] rounded-[5px] focus:outline-none border p-3"
                            />
                        </div>

                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Pincode</h3>
                            <input
                                onChange={onChangeInput}
                                value={formFileds.pincode}
                                name="pincode"
                                type="text"
                                placeholder="pincode"
                                className="w-full h-[40px] rounded-[5px] focus:outline-none border p-3"
                            />
                        </div>

                        <div className="col mt-7">
                            <PhoneInput
                                defaultCountry="in"
                                value={formFileds.mobile}
                                disabled={loading}
                                onChange={(value) =>
                                    setFormFileds((prev) => ({ ...prev, mobile: value }))
                                }
                                name="mobile"
                            />
                        </div>

                        <div className="col">
                            <label className="block mb-1 font-medium text-sm">Status</label>
                            <Select
                                value={formFileds.status}
                                onChange={(e) =>
                                    setFormFileds((prev) => ({
                                        ...prev,
                                        status: e.target.value,
                                    }))
                                }
                                size="small"
                                displayEmpty
                                className="w-full"
                                inputProps={{ "aria-label": "Without label" }}
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="w-[250px]">
                    <Button
                        type="submit"
                        className="!w-full !font-[600] !text-[16px] !bg-[#3872fa] !text-white !py-2 !rounded-[5px] !mt-5 !hover:bg-[#1a6df1]"
                        disabled={loading}
                    >
                        <MdCloudUpload size={25} className="mr-2" />
                        {loading ? "Processing..." : "Publish and View"}
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default AddAddress;

