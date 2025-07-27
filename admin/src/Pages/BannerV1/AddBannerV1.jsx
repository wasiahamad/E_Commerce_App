
import { Button, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import Rating from '@mui/material/Rating';
import UploadBox from '../../Components/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import { MdCloudUpload } from "react-icons/md";


const AddBannerV1 = () => {
    // const [age, setAge] = useState("");

    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };

    const [category1, setCategory1] = useState('');
    const [category2, setCategory2] = useState('');
    const [category3, setCategory3] = useState('');
    const [category4, setCategory4] = useState('');


    return (
        <section className='p-5 bg-gray-50'>
            <form action="" className='form py-3 p-8'>
                <div className=' max-h-[70vh] overflow-y-scroll pr-4'>

                    <div className="grid grid-cols-5 mb-3 gap-4">
                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Banner Title</h3>
                            <input type="text" placeholder='Product Name' className='w-full h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3' />
                        </div>

                        <div className='mb-3'>
                            <label className='block mt-1 font-medium text-sm'>Category</label>
                            <Select
                                value={category1}
                                onChange={(e) => setCategory1(e.target.value)}
                                size="small"
                                displayEmpty
                                className="w-full"
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>

                        <div className='mb-3'>
                            <label className='block mt-1 font-medium text-sm'>Sub Category</label>
                            <Select
                                value={category2}
                                onChange={(e) => setCategory2(e.target.value)}
                                size="small"
                                displayEmpty
                                className="w-full"
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>

                        <div className='mb-3'>
                            <label className='block mt-1 font-medium text-sm'>Third Level Category</label>
                            <Select
                                value={category3}
                                onChange={(e) => setCategory3(e.target.value)}
                                size="small"
                                displayEmpty
                                className="w-full"
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>

                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Price</h3>
                            <input type="text" placeholder='price' className='w-full h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3' />
                        </div>

                        <div className='mb-3'>
                            <label className='block mt-1 font-medium text-sm'>Align Info</label>
                            <Select
                                value={category4}
                                onChange={(e) => setCategory4(e.target.value)}
                                size="small"
                                displayEmpty
                                className="w-full"
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>

                    </div>



                    <div className="col w-full p-5 px-0 ">
                        <h3 className='font-[700] text-[18px] mb-3'>Media & Images</h3>
                        <div className="grid grid-cols-7 gap-4 ">
                            <div className="uploadBoxWrapper relative">
                                <span className='absolute z-50 bg-red-700 -top-[5px] -right-[5px] rounded-full flex items-center justify-center text-white w-[20px] h-[20px] cursor-pointer'
                                ><IoMdClose className='text-white' size={16} />
                                </span>
                                <div className="uploadBox  rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] cursor-pointer hover:bg-gray-200 flex flex-col items-center justify-center relative ">
                                    <LazyLoadImage
                                        // alt={image.alt}
                                        className='w-[100%] h-[100%] object-cover'
                                        effect="blur"
                                        wrapperProps={{
                                            // If you need to, you can tweak the effect transition using the wrapper style.
                                            style: { transitionDelay: "1s" },
                                        }}
                                        src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                                </div>
                            </div>
                            <UploadBox multiple={true} />
                        </div>
                    </div>
                </div>
                {/* <br /><hr /> */}
                <div className='w-[250px]'>
                    <Button type="submit" className='!w-full !font-[600] !text-[16px] !bg-[#3872fa] !text-white !py-2 !rounded-[5px] !mt-5 !hover:bg-[#1a6df1]'>
                        <MdCloudUpload size={25} className='mr-2' />
                        Publish and View
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default AddBannerV1;