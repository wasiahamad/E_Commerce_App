import React, { use, useContext, useState } from "react";
import Button from "@mui/material/Button";
import { IoSearchOutline } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FaRegBell } from "react-icons/fa6";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Divider, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { MyContext } from "../../App";


const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {

  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMyAcc = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  const context = useContext(MyContext);

  const logout = () => {
    setAnchorEl(null);
    postData("/api/v1/user/logout", { withCredentials: true }).then((res) => {
      console.log(res);
      if (res?.error !== true) {
        context.alertBox("success", res?.message);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userEmail");
        context.setIsLoggedIn(false);
        window.location.href = "/"; // Redirect to home page
      }
    });
  }



  return (
    <header className={`w-full h-[auto] py-2 pr-7 ${context.isSidebarOpen ? "pl-[320px]" : "pl-[10px]"} flex items-center justify-between bg-white shadow-md`}>
      <div className="part1">
        <Button onClick={() => {
          context.setIsSidebarOpen(!context.isSidebarOpen);
        }}
          className="!w-[40px] !h-[40px] !min-w-[40px] !text-black !rounded-full">
          <RiMenu2Line className="text-[18px] text-[rgba(0,0,0,0.5)]" />
        </Button>
      </div>

      {/* part2 */}

      <div className="part2 w-[40%] flex items-center justify-end gap-5">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={3} color="secondary">
            <FaRegBell className="text-[22px] text-[rgba(0,0,0,0.5)]" />
          </StyledBadge>
        </IconButton>
        {context.isLoggedIn === true ?
          <div className="relative">
            <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer " onClick={handleClickMyAcc}>
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <Menu
              anchorMyAcc={anchorMyAcc}
              id="account-menu"
              open={openMyAcc}
              onClose={handleCloseMyAcc}
              onClick={handleCloseMyAcc}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleCloseMyAcc} className="!bg-white">
                <div className="flex items-center gap-3">
                  <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer " onClick={handleClickMyAcc}>
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="info flex flex-col">
                    <h3 className="text-[15px] font-[500] leading-4">{context?.userData?.name}</h3>
                    <span className="text-[12px] font-[400]  text-[rgba(0,0,0,0.5)]">{context?.userData?.email}</span>
                  </div>
                </div>
              </MenuItem>
              <Divider />

              <MenuItem onClick={handleCloseMyAcc}>
                <Link to="/profile" className="flex items-center gap-2 text-[14px] opacity-80"><FaRegUser size={15} /> Profile</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseMyAcc}>
                <Link to="/login" className="flex items-center gap-2 text-[14px] opacity-80"><PiSignOutBold size={16}
                  onClick={logout} />Sign out</Link>
              </MenuItem>
            </Menu>

          </div>
          :
          <Button className="btn-blue !rounded-full">Sign In</Button>
        }
      </div>
    </header>
  );
};

export default Header;
