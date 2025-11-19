import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import { RiMenu2Fill } from "react-icons/ri";
import { TfiAngleDown } from "react-icons/tfi";
import { IoRocket } from "react-icons/io5";
import CategoryPanel from './CategoryPanel';
import { getData } from '../../../utils/api';
import './style.css';


const Navigation = () => {

    const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getData('/api/v1/category');
                if (res && res.data) setCategories(res.data || []);
            } catch (err) {
                console.error('Failed to load categories for navigation', err);
            }
        };
        load();
    }, []);

    const openCategoryPanel = () => {
        setIsOpenCatPanel(true);
    }
    return (
        <>
            <nav>
                <div className="container flex justify-end items-center gap-8 py-3">
                    <div className='col_1 w-[20%]'>
                        <Button className='!text-black gap-2 w-full' onClick={openCategoryPanel}>
                            <RiMenu2Fill size={18} /> Shop By Category
                            <TfiAngleDown className='ml-auto font-semibold' /></Button>
                    </div>

                    <div className='col_2 w-[60%]'>
                        <ul className="flex items-center gap-5 nav">
                            <li className='text-[14px] font-[500] list-none'>
                                <Link className='link transition ease-in duration-200 ' to="/">
                                    <Button className='link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>Home</Button>
                                </Link>
                            </li>

                            {/* dynamically render categories */}
                            {categories.map((cat) => (
                                <li key={cat._id} className=' list-none relative'>
                                    <Link className='link transition ease-in duration-200 ' to={`/productListing?categoryId=${cat._id}`}>
                                            <Button className='link transition !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>{cat.name}</Button>
                                        </Link>

                                    {Array.isArray(cat.children) && cat.children.length > 0 && (
                                        <div className="submenu absolute top-[95%] left-0 min-w-[200px] bg-white shadow-md opacity-0 transition-all duration-300 ease-in-out ">
                                            <ul>
                                                {cat.children.map((sub) => (
                                                    <li key={sub._id} className='list-none w-full relative inner-submenu'>
                                                        <Link className='w-full' to={`/productListing?subCatId=${sub._id}`}>
                                                            <Button className='w-full !text-left !justify-start !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>{sub.name}</Button>
                                                        </Link>

                                                        {Array.isArray(sub.children) && sub.children.length > 0 && (
                                                            <div className="submenu absolute top-[0%] left-[100%] min-w-[180px] bg-white shadow-md opacity-0 transition-all duration-300 ease-in-out ">
                                                                <ul>
                                                                    {sub.children.map((third) => (
                                                                        <li key={third._id} className='list-none w-full'>
                                                                            {/* third-level categories use thirdSubCatId */}
                                                                            <Link className='w-full' to={`/productListing?thirdSubCatId=${third._id}`}>
                                                                                <Button className='w-full !text-left !justify-start !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>{third.name}</Button>
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='col_3 w-[20%]'>
                        <p className='text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0'> <IoRocket size={18} />Free International Delivery</p>
                    </div>
                </div>
            </nav>
            <CategoryPanel isOpenCatPanel={isOpenCatPanel} setIsOpenCatPanel={setIsOpenCatPanel} />
        </>

    )
}

export default Navigation