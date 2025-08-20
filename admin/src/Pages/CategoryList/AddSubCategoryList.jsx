import React, { useState, useEffect, useContext } from 'react';
import { Button, MenuItem, Select } from '@mui/material';
import { MdCloudUpload } from "react-icons/md";
import axios from "axios";
import { MyContext } from '../../App';

const AddSubCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [productCategory1, setProductCategory1] = useState('');
    const [productCategory2, setProductCategory2] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');
    const [thirdSubCategoryName, setThirdSubCategoryName] = useState('');
    const context = useContext(MyContext);

    // ✅ Categories fetch
    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/category")
            .then(res => {
                console.log(res.data); // check karo kya aa raha
                setCategories(res.data.data || []);
            })
            .catch(err => console.error(err));
    }, []);

    // ✅ Add SubCategory
    const handleAddSubCategory = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken"); // login ke time save kiya hoga

            await axios.post("http://localhost:8000/api/v1/category/create", {
                parentCatId: productCategory1,
                parentCatName: categories.find(c => c._id === productCategory1)?.name,
                name: subCategoryName,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ token bhejna mandatory hai
                }
            });

            context.alertBox("success", "Subcategory Created Successfully");
            setSubCategoryName('');
            setProductCategory1('');
        } catch (error) {
            console.error(error);
            context.alertBox("error", "Failed to add Subcategory");
        }
    };

    // ✅ Add Third SubCategory
    const handleAddThirdSubCategory = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");

            await axios.post("http://localhost:8000/api/v1/category/create", {
                parentCatId: productCategory2,
                parentCatName: categories.find(c => c._id === productCategory2)?.name,
                name: thirdSubCategoryName,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ token bhejna mandatory hai
                }
            });

            context.alertBox("success", "Third Subcategory added successfully");
            setThirdSubCategoryName('');
            setProductCategory2('');
        } catch (error) {
            console.error(error);
            context.alertBox("error", "Failed to add Third Subcategory");
        }
    };


    return (
        <section className='p-6 bg-gray-50 min-h-screen'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                {/* ✅ Add Sub Category Form */}
                <form className='bg-white p-6 rounded-md shadow-sm' onSubmit={handleAddSubCategory}>
                    <h3 className='font-semibold text-lg mb-4'>Add Sub Category</h3>

                    <div className='mb-6'>
                        <label className='block mb-1 font-medium text-sm'>Select Main Category</label>
                        <Select
                            value={productCategory1}
                            onChange={(e) => setProductCategory1(e.target.value)}
                            size="small"
                            displayEmpty
                            className="w-full"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {categories
                                .filter(cat => !cat.parentCatId) // ✅ only main categories
                                .map(cat => (
                                    <MenuItem key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </div>

                    <div className='mb-6'>
                        <label className='block mb-1 font-medium text-sm'>Sub Category Name</label>
                        <input
                            type="text"
                            value={subCategoryName}
                            onChange={(e) => setSubCategoryName(e.target.value)}
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


                {/* ✅ Add Third Level Category Form */}
                <form className='bg-white p-6 rounded-md shadow-sm' onSubmit={handleAddThirdSubCategory}>
                    <h3 className='font-semibold text-lg mb-4'>Add Third Level Category</h3>

                    <div className='mb-6'>
                        <label className='block mb-1 font-medium text-sm'>Select Category / Sub Category</label>
                        <Select
                            value={productCategory2}
                            onChange={(e) => setProductCategory2(e.target.value)}
                            size="small"
                            displayEmpty
                            className="w-full"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                            {categories?.flatMap((cat) => [
                                // ✅ Sub Categories
                                ...(cat.children?.map((sub) => (
                                    <MenuItem key={sub._id} value={sub._id}>
                                        {sub.name}
                                    </MenuItem>
                                )) || []),
                            ])}
                        </Select>
                    </div>



                    <div className='mb-6'>
                        <label className='block mb-1 font-medium text-sm'>Third Sub Category Name</label>
                        <input
                            type="text"
                            value={thirdSubCategoryName}
                            onChange={(e) => setThirdSubCategoryName(e.target.value)}
                            placeholder='Third Sub Category Name'
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
