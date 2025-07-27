
import React, { useState } from 'react';
import { Button, MenuItem, Select } from '@mui/material';
import { MdCloudUpload } from "react-icons/md";

const AddSubCategoryList = () => {
    const [productCategory1, setProductCategory1] = useState('');
    const [productCategory2, setProductCategory2] = useState('');

    return (
        <section className='p-6 bg-gray-50 min-h-screen'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                {/* Add Sub Category Form */}
                <form className='bg-white p-6 rounded-md shadow-sm'>
                    <h3 className='font-semibold text-lg mb-4'>Add Sub Category</h3>

                    <div className='mb-6'>
                        <label className='block mb-1 font-medium text-sm'>Product Category</label>
                        <Select
                            value={productCategory1}
                            onChange={(e) => setProductCategory1(e.target.value)}
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

                    <div className='mb-6'>
                        <label className='block mb-1 font-medium text-sm'>Sub Category Name</label>
                        <input
                            type="text"
                            placeholder='Sub Category Name'
                            className='w-full h-10 border border-gray-300 rounded px-3 focus:outline-none focus:border-gray-600'
                        />
                    </div>

                    <Button
                        type="submit"
                        className='!w-full !font-semibold !text-white !bg-blue-600 !py-2 !rounded !hover:bg-blue-700 flex items-center justify-center gap-2'
                    >
                        <MdCloudUpload size={20} />
                        PUBLISH AND VIEW
                    </Button>
                </form>

                {/* Add Third Level Category Form */}
                <form className='bg-white p-6 rounded-md shadow-sm'>
                    <h3 className='font-semibold text-lg mb-4'>Add Third Level Category</h3>

                    <div className='mb-6'>
                        <label className='block mb-1 font-medium text-sm'>Product Category</label>
                        <Select
                            value={productCategory2}
                            onChange={(e) => setProductCategory2(e.target.value)}
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

                    <div className='mb-6'>
                        <label className='block mb-1 font-medium text-sm'>Sub Category Name</label>
                        <input
                            type="text"
                            placeholder='Sub Category Name'
                            className='w-full h-10 border border-gray-300 rounded px-3 focus:outline-none focus:border-gray-600'
                        />
                    </div>

                    <Button
                        type="submit"
                        className='!w-full !font-semibold !text-white !bg-blue-600 !py-2 !rounded !hover:bg-blue-700 flex items-center justify-center gap-2'
                    >
                        <MdCloudUpload size={20} />
                        PUBLISH AND VIEW
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default AddSubCategoryList;
