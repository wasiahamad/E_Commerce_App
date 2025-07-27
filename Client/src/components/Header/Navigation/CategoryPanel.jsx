import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { IoCloseOutline } from "react-icons/io5";
import { GoPlusCircle } from "react-icons/go";
import './style.css';
import { Link } from 'react-router-dom';
import { FiMinusCircle } from "react-icons/fi";



const CategoryPanel = (props) => {

    const [submenuIndex, setSubmenuIndex] = useState(null);
    const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

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
                    <li className="list-none flex items-center relative flex-col">
                        <Link to="/fashion" className='w-full'>
                            <Button className='w-full !justify-start !px-3 !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>
                                Fashion
                            </Button>
                        </Link>
                        {
                            submenuIndex === 0 ?
                                <FiMinusCircle size={20} className='absolute top-[10px] right-[15px] cursor-pointer '
                                    onClick={() => openSubMenu(0)} /> :
                                <GoPlusCircle size={20} className='absolute top-[10px] right-[15px] cursor-pointer'
                                    onClick={() => openSubMenu(0)} />
                        }

                        {
                            submenuIndex === 0 && (
                                <ul className='submenu !w-full pl-3'>
                                    <li className="list-none relative">
                                        <Link to="/fashion" className='w-full' >
                                            <Button className='!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !w-full !justify-start !px-3'>
                                                Apparel
                                            </Button>
                                        </Link>

                                        {
                                            innerSubmenuIndex === 0 ?
                                                <FiMinusCircle size={20} className='absolute top-[10px] right-[15px] cursor-pointer'
                                                    onClick={() => openInnerSubMenu(0)} /> :
                                                <GoPlusCircle size={20} className='absolute top-[10px] right-[15px] cursor-pointer'
                                                    onClick={() => openInnerSubMenu(0)} />
                                        }

                                        {
                                            innerSubmenuIndex === 0 && (
                                                <ul className='inner_submenu w-full '>
                                                    <li className="list-none relative">
                                                        <Link to="/fashion" className='link hover:!text-[#ff5252] !w-full !justify-start !px-3 transition ease-in duration-200 text-[14px]'>
                                                            <Button className='!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !w-full !justify-start' >Smart Tablet</Button>
                                                        </Link>
                                                    </li>

                                                    <li className="list-none relative">
                                                        <Link to="/fashion" className='link hover:!text-[#ff5252] !w-full !justify-start !px-3 transition ease-in duration-200 text-[14px]'>
                                                            <Button className='!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !w-full !justify-start' >Crepe T-shirt</Button>
                                                        </Link>
                                                    </li>

                                                    <li className="list-none relative">
                                                        <Link to="/fashion" className='link hover:!text-[#ff5252] !w-full !justify-start !px-3 transition ease-in duration-200 text-[14px]'>
                                                            <Button className='!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !w-full !justify-start' >Leather Watch</Button>
                                                        </Link>
                                                    </li>

                                                    <li className="list-none relative">
                                                        <Link to="/fashion" className='link hover:!text-[#ff5252] !w-full !justify-start !px-3 transition ease-in duration-200 text-[14px]'>
                                                            <Button className='!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !w-full !justify-start' >Rolling Diamond</Button>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            )}
                                    </li>
                                </ul>
                            )
                        }
                    </li>

                    <li className="list-none flex items-center relative flex-col">
                        <Link to="/fashion" className='w-full'>
                            <Button className='w-full !justify-start !px-3 !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252]'>
                                Fashion
                            </Button>
                        </Link>
                        {
                            submenuIndex === 1 ?
                                <FiMinusCircle size={20} className='absolute top-[10px] right-[15px] cursor-pointer '
                                    onClick={() => openSubMenu(1)} /> :
                                <GoPlusCircle size={20} className='absolute top-[10px] right-[15px] cursor-pointer'
                                    onClick={() => openSubMenu(1)} />
                        }

                        {
                            submenuIndex === 1 && (
                                <ul className='submenu  !w-full pl-3'>
                                    <li className="list-none relative">
                                        <Link to="/fashion" className='w-full' >
                                            <Button className='!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !w-full !justify-start !px-3'>
                                                Apparel
                                            </Button>
                                        </Link>

                                        {
                                            innerSubmenuIndex === 1 ?
                                                <FiMinusCircle size={20} className='absolute top-[10px] right-[15px] cursor-pointer'
                                                    onClick={() => openInnerSubMenu(1)} /> :
                                                <GoPlusCircle size={20} className='absolute top-[10px] right-[15px] cursor-pointer'
                                                    onClick={() => openInnerSubMenu(1)} />
                                        }

                                        {
                                            innerSubmenuIndex === 1 && (
                                                <ul className='inner_submenu w-full '>
                                                    <li className="list-none relative">
                                                        <Link to="/fashion" className='link hover:!text-[#ff5252] !w-full !justify-start !px-3 transition ease-in duration-200 text-[14px]'>
                                                            <Button className='!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !w-full !justify-start' >Smart Tablet</Button>
                                                        </Link>
                                                    </li>

                                                    <li className="list-none relative">
                                                        <Link to="/fashion" className='link hover:!text-[#ff5252] !w-full !justify-start !px-3 transition ease-in duration-200 text-[14px]'>
                                                            <Button className='!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !w-full !justify-start' >Crepe T-shirt</Button>
                                                        </Link>
                                                    </li>

                                                    <li className="list-none relative">
                                                        <Link to="/fashion" className='link hover:!text-[#ff5252] !w-full !justify-start !px-3 transition ease-in duration-200 text-[14px]'>
                                                            <Button className='!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !w-full !justify-start' >Leather Watch</Button>
                                                        </Link>
                                                    </li>

                                                    <li className="list-none relative">
                                                        <Link to="/fashion" className='link hover:!text-[#ff5252] !w-full !justify-start !px-3 transition ease-in duration-200 text-[14px]'>
                                                            <Button className='!text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !w-full !justify-start' >Rolling Diamond</Button>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            )}
                                    </li>
                                </ul>
                            )
                        }
                    </li>
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
