import React, { useState } from 'react'
import SideBar from '../../components/SideBar'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ProductsItem from '../../components/ProductsItem';
import ProductsItemList from '../../components/ProductsItemListView';
import { Button } from '@mui/material';
import { IoGrid } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';

const ProductListing = () => {

    const [itemView, setItemView] = useState("grid");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <section className='py-5'>
            <div className="container">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/" className='link transition'>
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/"
                        className='link transition'
                    >
                        Fashion
                    </Link>

                </Breadcrumbs>
            </div>
            <div className="bg-white p-3 mt-4">
                <div className='container flex gap-3'>
                    <div className="sidebarWrapper w-[20%] h-full bg-white  ">
                        <SideBar />
                    </div>

                    <div className="rightContent w-[80%] py-3">

                        <div className="w-full bg-[#f1f1f1] p-2 mb-4 rounded-md flex items-center justify-between">
                            <div className="col1 flex items-center itemViewActions">
                                <Button
                                    className={`!text-[#000]  !rounded-full !h-[40px] !w-[40px] !min-w-[40px] ${itemView === "list" && "active"}`}
                                    onClick={() => setItemView("list")}
                                >
                                    <IoMenu className='text-[rgba(0,0,0,0.6)] text-[24px] ' />
                                </Button>

                                <Button
                                    className={`!text-[#000]  !rounded-full !h-[40px] !w-[40px] !min-w-[40px] ${itemView === "grid" && "active"}`}
                                    onClick={() => setItemView("grid")}
                                >
                                    <IoGrid className='text-[rgba(0,0,0,0.6)] text-[18px] ' />
                                </Button>

                                <span className='text-[rgba(0,0,0,0.6)] text-[14px] ml-4'>Showing 1-9 of 12 results</span>
                            </div>

                            <div className="col1 flex items-center">
                                <span className='font-[500] text-[14px] mr-4'>Sort By  </span>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    className='!text-[12px] !text-[#000] !border-2 !border-[#000]  !bg-white !capitalize'
                                >
                                    <span className='text-[rgba(0,0,0,0.6)] text-[14px]'>Default Sorting</span>
                                    <span className='text-[rgba(0,0,0,0.6)] text-[14px]'>&#9662;</span>
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleClose} className='!text-[12px] !text-[#000] !border-2 !border-[#000] !capitalize'>Name, A to Z</MenuItem>
                                    <MenuItem onClick={handleClose} className='!text-[12px] !text-[#000] !border-2 !border-[#000] !capitalize'>Name, Z to A</MenuItem>
                                    <MenuItem onClick={handleClose} className='!text-[12px] !text-[#000] !border-2 !border-[#000] !capitalize'>Price, low to high</MenuItem>
                                    <MenuItem onClick={handleClose} className='!text-[12px] !text-[#000] !border-2 !border-[#000] !capitalize'>Price, high to low</MenuItem>
                                </Menu>
                            </div>
                        </div>


                        <div className={`grid ${itemView === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" : "grid-cols-1 gap-4"} `}>
                            {itemView === "grid" ? (
                                <>
                                    <ProductsItem />
                                    <ProductsItem />
                                    <ProductsItem />
                                    <ProductsItem />
                                    <ProductsItem />
                                    <ProductsItem />
                                    <ProductsItem />
                                    <ProductsItem />
                                    <ProductsItem />
                                    <ProductsItem />
                                    <ProductsItem />
                                    <ProductsItem />
                                    <ProductsItem />
                                    <ProductsItem />
                                    <ProductsItem />
                                    <ProductsItem />
                                </>
                            ) : (
                                <>
                                <ProductsItemList   />
                                <ProductsItemList   />  
                                <ProductsItemList   />  
                                <ProductsItemList   />  
                                <ProductsItemList   />  
                                <ProductsItemList   />
                                </>
                            )}
                           
                        </div>
                        <div className="pagination flex items-center justify-center mt-10">
                            {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
                            <Pagination count={10} showFirstButton showLastButton />
                        </div>

                    </div>
                </div>
            </div>

        </section>
    )
}

export default ProductListing