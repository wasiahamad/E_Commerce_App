import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { IoMdGitCompare } from "react-icons/io";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation/index.jsx";
import { MyContext } from "../../App.jsx";
import { FaRegUser } from "react-icons/fa";
import { Button } from "@mui/material";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { SlLocationPin } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa6";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
        padding: "0 4px",
    },
}));
const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const context = useContext(MyContext);

    return (
        <header className="bg-white sticky shadow-sm top-0 z-50">
            <div className="top-strip py-2 border-b-[1px] border-t-[1px] border-gray-250 ">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div className="col1 w-[50%] ">
                            <p className="text-[14px] font-[500] ">
                                Get free shipping on all orders over $50
                            </p>
                        </div>
                        <div className="flex items-center gap-2 col2 w-[50%] justify-end">
                            <ul className="flex items-center gap-2">
                                <li className="text-[13px] font-[500] list-none">
                                    <Link
                                        className="link transition ease-in duration-200  "
                                        to="/help-center"
                                    >
                                        Help Center
                                    </Link>
                                </li>
                                <li className="text-[13px] font-[500] list-none">
                                    <Link
                                        className="link transition ease-in duration-200  "
                                        to="/order-tracking"
                                    >
                                        Order-Tracking
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="header py-4 border-b-[1px] border-gray-250 ">
                <div className="container flex items-center justify-between">
                    <div className="col1 w-[25%]">
                        <Link to="/">
                            <img
                                className="w-[150px] h-[80px] md:w-[150px] md:h-[80px]"
                                src="/src/assets/logo.png"
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className="col2 w-[40%]">
                        <Search />
                    </div>
                    <div className="col3 w-[35%] px-4">
                        <ul className="flex items-center gap-3 justify-end w-[100%] ">
                            {context.isLoggedIn === false ? (
                                <li className="text-[15px] font-[500] list-none">
                                    <Link
                                        className="link transition ease-in duration-200  "
                                        to="/login"
                                    >
                                        Login
                                    </Link>{" "}
                                    /{" "}
                                    <Link
                                        className="link transition ease-in duration-200  "
                                        to="/register"
                                    >
                                        Register
                                    </Link>
                                </li>
                            ) : (
                                <>
                                    <Button
                                        className="!text-[#000] !capitalize myAccountWrap flex items-center gap-3 "
                                        onClick={handleClick}
                                    >
                                        <Button className="!min-w-[40px] !w-[40px] !h-[40px] !rounded-full !bg-[#e5e5e5] !text-[#000] opacity-75">
                                            <FaRegUser size={18} />
                                        </Button>

                                        <div className="info flex flex-col">
                                            <h4 className="text-[14px] font-[300] text-left justify-start leading-3 text-[rgba(0,0,0,0.6)]">
                                                Md Abir Hossain
                                            </h4>
                                            <span className="text-[13px] text-left justify-start text-[rgba(0,0,0,0.6)]">
                                                random85@gmail.com
                                            </span>
                                        </div>
                                    </Button>

                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        slotProps={{
                                            paper: {
                                                elevation: 0,
                                                sx: {
                                                    overflow: "visible",
                                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                                    mt: 1.5,
                                                    "& .MuiAvatar-root": {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    "&::before": {
                                                        content: '""',
                                                        display: "block",
                                                        position: "absolute",
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: "background.paper",
                                                        transform: "translateY(-50%) rotate(45deg)",
                                                        zIndex: 0,
                                                    },
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                    >
                                        <Link to="/my-account" className="w-full block">
                                            <MenuItem
                                                onClick={handleClose}
                                                className="flex gap-2 opacity-75 !py-2"
                                            >
                                                <FaRegUser className="text-[18px]" />{" "}
                                                <span className="text-[14px]">My account</span>
                                            </MenuItem>
                                        </Link>

                                        <Link to="/address" className="w-full block">
                                            <MenuItem
                                                onClick={handleClose}
                                                className="flex gap-2 opacity-75 !py-2"
                                            >
                                                <SlLocationPin className="text-[20px]" />
                                                <span className="text-[14px]"> Address</span>
                                            </MenuItem>
                                        </Link>

                                        <Link to="/my-order" className="w-full block">
                                            <MenuItem
                                                onClick={handleClose}
                                                className="flex gap-2 opacity-75 !py-2"
                                            >
                                                <IoBagCheckOutline className="text-[21px]" />{" "}
                                                <span className="text-[14px]">Order</span>
                                            </MenuItem>
                                        </Link>

                                        <Link to="/my-list" className="w-full block">
                                            <MenuItem
                                                onClick={handleClose}
                                                className="flex gap-2 opacity-75 !py-2"
                                            >
                                                <FaRegHeart className="text-[18px]" />
                                                <span className="text-[14px]"> My List</span>
                                            </MenuItem>
                                        </Link>
                                        <MenuItem
                                            onClick={handleClose}
                                            className="flex gap-2 opacity-75 !py-2"
                                        >
                                            <MdLogout className="text-[18px]" />{" "}
                                            <span className="text-[14px]">Logout</span>
                                        </MenuItem>
                                    </Menu>
                                </>
                            )}

                            <li>
                                <Tooltip title="Cart" arrow>
                                    <IconButton
                                        aria-label="cart"
                                        onClick={() => context.setOpenCardPanel(true)}
                                    >
                                        <StyledBadge badgeContent={4} color="secondary">
                                            <MdOutlineShoppingCart />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                            </li>

                            <li>
                                <Tooltip title="Wishlist" arrow>
                                    <IconButton aria-label="wishlist">
                                        <StyledBadge badgeContent={4} color="secondary">
                                            <FiHeart />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                            </li>

                            <li>
                                <Tooltip title="Compare" arrow>
                                    <IconButton aria-label="compare">
                                        <StyledBadge badgeContent={4} color="secondary">
                                            <IoMdGitCompare className="icon" />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <Navigation />
        </header>
    );
};

export default Header;
