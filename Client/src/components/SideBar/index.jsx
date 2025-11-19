import React, { useState, useEffect } from 'react'
import './style.css'
import { Link } from 'react-router-dom';
import { getData } from '../../utils/api';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Collapse } from 'react-collapse';
import { FaAngleDown } from "react-icons/fa6";
import { Button } from '@mui/material';
import { FaAngleUp } from "react-icons/fa6";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Rating from '@mui/material/Rating';



const SideBar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isSizeOpen, setIsSizeOpen] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getData('/api/v1/category');
                if (res && res.data) setCategories(res.data || []);
            } catch (err) {
                console.error('Failed to load categories', err);
            }
        };
        load();
    }, []);

    return (
        <aside className='sidebar py-5' >
            <div className="box">
                <h3 className='w-full text-[16px] font-[600] mb-3 flex items-center pr-5 '>
                    Shop by Category
                    <Button onClick={() => setIsOpen(!isOpen)} className='!w-[30px] !h-[30px] !min-w[30px] !rounded-full !text-[#000] !ml-auto '>
                        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </Button>
                </h3>
                <Collapse isOpened={isOpen}>
                    <div className="scroll px-3 relative -left-[10px]">
                        {/* Render categories fetched from server with nested children */}
                        {categories.map(cat => (
                            <div key={cat._id} className="mb-2">
                                <Link to={`/productListing?categoryId=${cat._id}`} className="block text-[14px] text-black hover:text-primary">{cat.name}</Link>
                                {Array.isArray(cat.children) && cat.children.length > 0 && (
                                    <div className="pl-4 mt-1">
                                        {cat.children.map(sub => (
                                            <div key={sub._id}>
                                                <Link to={`/productListing?subCatId=${sub._id}`} className="block text-[13px] text-gray-600 hover:text-primary">- {sub.name}</Link>
                                                {Array.isArray(sub.children) && sub.children.length > 0 && (
                                                    <div className="pl-4 mt-1">
                                                        {sub.children.map(third => (
                                                            // third-level categories should use thirdSubCatId so server can distinguish
                                                            <Link key={third._id} to={`/productListing?thirdSubCatId=${third._id}`} className="block text-[12px] text-gray-500">-- {third.name}</Link>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </Collapse>
            </div>

            <div className="box mt-4">
                <h3 className='w-full text-[16px] font-[600] mb-3 flex items-center pr-5 '>
                    Shop by Category
                    <Button onClick={() => setIsSizeOpen(!isSizeOpen)} className='!w-[30px] !h-[30px] !min-w[30px] !rounded-full !text-[#000] !ml-auto '>
                        {isSizeOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </Button>
                </h3>
                <Collapse isOpened={isSizeOpen}>
                    <div className="scroll px-3 relative -left-[10px]">
                        <FormControlLabel control={<Checkbox size="small" />} label="Small (50)" className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="Medium (55) " className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="Large (60) " className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="Extra Large (65) " className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="Xtra Extra Large (70) " className='w-full' />
                    </div>
                </Collapse>
            </div>

            <div className="box mt-4">
                <h3 className='w-full text-[16px] font-[600] mb-3 flex items-center pr-5 '>
                    Filter by Price
                </h3>
                <RangeSlider />
                <div className="flex pt-4 pb-2 priceRange">
                    <span className='text-[13px]'>
                        from: <strong className='text-dark'>Rs: 50</strong>
                    </span>
                    <span className='ml-auto text-[13px]'>
                        from: <strong className='text-dark'>Rs: 5000</strong>
                    </span>
                </div>
            </div>

            <div className="box mt-4">
                <h3 className='w-full text-[16px] font-[600] mb-3 flex items-center pr-5 '>
                    Filter by Rating
                </h3>

                <div className="w-full">
                    <FormControlLabel control={<Checkbox size='small' />} label={<Rating name="size-small" defaultValue={5} size="small" readOnly />} />
                </div>
                <div className="w-full">
                    <FormControlLabel control={<Checkbox size='small' />} label={<Rating name="size-small" defaultValue={4} size="small" readOnly />} />
                </div>
                <div className="w-full">
                    <FormControlLabel control={<Checkbox size='small' />} label={<Rating name="size-small" defaultValue={3} size="small" readOnly />} />
                </div>
                <div className="w-full">
                    <FormControlLabel control={<Checkbox  size='small'/>} label={<Rating name="size-small" defaultValue={2} size="small" readOnly />}/>
                </div>
                <div className="w-full">
                    <FormControlLabel control={<Checkbox size='small' />} label={<Rating name="size-small" defaultValue={1} size="small" readOnly />} />
                </div>

            </div>
        </aside>
    )
}

export default SideBar