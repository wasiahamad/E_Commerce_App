import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { IoCloseOutline } from "react-icons/io5";
import { GoPlusCircle } from "react-icons/go";
import './style.css';
import { Link } from 'react-router-dom';
import { getData } from '../../../utils/api';
import { FiMinusCircle } from "react-icons/fi";



const CategoryPanel = (props) => {

    const [submenuIndex, setSubmenuIndex] = useState(null);
    const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getData('/api/v1/category');
                if (res && res.data) setCategories(res.data || []);
            } catch (err) {
                console.error('Failed to load categories for panel', err);
            }
        };
        load();
    }, []);

    const toggleDrawer = (open) => () => {
        props.setIsOpenCatPanel(open);
    };

    const openSubMenu = (index) => {
        if (submenuIndex === index) {
            setSubmenuIndex(null);
        } else {
            setSubmenuIndex(index);
        }
    };

    const openInnerSubMenu = (index) => {
        if (innerSubmenuIndex === index) {
            setInnerSubmenuIndex(null);
        } else {
            setInnerSubmenuIndex(index);
        }
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" className='categoryPanel'>

            <h3 className='text-[18px] font-semibold flex items-center justify-between p-3 border-b-[1px] '>
                Top Categories
                <IoCloseOutline size={25} className='cursor-pointer' onClick={toggleDrawer(false)} />
            </h3>

            <div className="scroll">
                <ul className="w-full">
                    {categories.map((cat, i) => (
                        <li key={cat._id} className="list-none flex items-center relative flex-col">
                            <Link to={`/productListing?categoryId=${cat._id}`} className='w-full'>
                                <Button className='w-full !justify-start !px-3 !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>
                                    {cat.name}
                                </Button>
                            </Link>
                            {
                                submenuIndex === i ?
                                    <FiMinusCircle size={20} className='absolute top-[10px] right-[15px] cursor-pointer '
                                        onClick={() => openSubMenu(i)} /> :
                                    <GoPlusCircle size={20} className='absolute top-[10px] right-[15px] cursor-pointer'
                                        onClick={() => openSubMenu(i)} />
                            }

                            {
                                submenuIndex === i && Array.isArray(cat.children) && (
                                    <ul className='submenu !w-full pl-3'>
                                        {cat.children.map((sub, j) => (
                                            <li key={sub._id} className="list-none relative">
                                                <Link to={`/productListing?subCatId=${sub._id}`} className='w-full' >
                                                    <Button className='!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !w-full !justify-start !px-3'>
                                                        {sub.name}
                                                    </Button>
                                                </Link>

                                                {
                                                    innerSubmenuIndex === `${i}-${j}` ?
                                                        <FiMinusCircle size={20} className='absolute top-[10px] right-[15px] cursor-pointer'
                                                            onClick={() => openInnerSubMenu(`${i}-${j}`)} /> :
                                                        <GoPlusCircle size={20} className='absolute top-[10px] right-[15px] cursor-pointer'
                                                            onClick={() => openInnerSubMenu(`${i}-${j}`)} />
                                                }

                                                {
                                                    innerSubmenuIndex === `${i}-${j}` && Array.isArray(sub.children) && (
                                                        <ul className='inner_submenu w-full '>
                                                            {sub.children.map((third) => (
                                                                <li key={third._id} className="list-none relative">
                                                                    {/* use thirdSubCatId for third-level categories */}
                                                                    <Link to={`/productListing?thirdSubCatId=${third._id}`} className='link hover:!text-[#ff5252] !w-full !justify-start !px-3 transition ease-in duration-200 text-[14px]'>
                                                                        <Button className='!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !w-full !justify-start' >{third.name}</Button>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                            </li>
                                        ))}
                                    </ul>
                                )
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </Box>
    );
    return (
        <>
            {/* <Button onClick={toggleDrawer(true)}>Navigation Panel</Button> */}
            <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    )
}

export default CategoryPanel
