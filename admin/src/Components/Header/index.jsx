import React, { use, useContext, useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { MyContext } from "../../App";
import { postData, getData, putData } from "../../utils/api";


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
  const [anchorNotif, setAnchorNotif] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const openMyAcc = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };

  const openNotif = Boolean(anchorNotif);
  const handleOpenNotif = (event) => {
    setAnchorNotif(event.currentTarget);
    // fetch latest notifications when opening
    fetchNotifications();
  };
  const handleCloseNotif = () => {
    setAnchorNotif(null);
  };

  const context = useContext(MyContext);
  const navigate =  useNavigate();

  // fetch unread count periodically
  useEffect(() => {
    let mounted = true;
    let intervalId = null;

    const fetchCount = async () => {
      try {
        const res = await getData('/api/v1/notify/count');
        if (!mounted) return;
        if (res && res.data) setUnreadCount(res.data.count || 0);
      } catch (err) {
        // ignore network errors
      }
    };

    // start polling only when page is visible to avoid extra background requests
    const startPolling = () => {
      // initial fetch
      fetchCount();
      // poll every 60s (reduce frequency to avoid frequent server hits)
      intervalId = setInterval(fetchCount, 60000);
    };

    const stopPolling = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    // Visibility change handler
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') startPolling();
      else stopPolling();
    };

    // start or stop depending on current visibility
    if (document.visibilityState === 'visible') startPolling();

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      mounted = false;
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // fetch notifications list (shows latest 10)
  const fetchNotifications = async () => {
    try {
      const res = await getData('/api/v1/notify?unread=true');
      if (res && res.data) {
        setNotifications(res.data.slice(0, 10));
        // update unread count as well
        const cntRes = await getData('/api/v1/notify/count');
        if (cntRes && cntRes.data) setUnreadCount(cntRes.data.count || 0);
      }
    } catch (err) {
      console.error('Error fetching notifications', err);
    }
  };

  const handleNotificationClick = async (n) => {
    try {
      // mark as read in backend
      await putData(`/api/v1/notify/${n._id}/read`, {});
      // optimistic UI update
      setNotifications((prev) => prev.map(item => item._id === n._id ? { ...item, read: true } : item));
      setUnreadCount((c) => Math.max(0, c - 1));
      // navigate to notify requests page to view details
      navigate('/product/notify-requests');
    } catch (err) {
      console.error('Error marking notification read', err);
    }
  };

  // const logout = () => {
  //   setAnchorEl(null);
  //   postData("/api/v1/user/logout", { withCredentials: true }).then((res) => {
  //     if (res?.error !== true) {
  //       context.alertBox("success", res?.message);

  //       // Clear tokens
  //       console.log("Before removeItem:", localStorage.getItem("accessToken"));
  //       localStorage.removeItem("accessToken");
  //       localStorage.removeItem("refreshToken");
  //       localStorage.removeItem("userEmail");
  //       console.log("After removeItem:", localStorage.getItem("accessToken"));


  //       // Update context and redirect
  //       context.setIsLoggedIn(false);
  //       window.location.href = "/login";
  //     }
  //   });
  // };

  const logout = () => {
    console.log("Logging out...");
    setAnchorEl(null);

    // Ensure correct axios config
    postData("/api/v1/user/logout", { withCredentials: true }).then((res) => {
      if (res?.error !== true) {
        context.alertBox("success", res?.message);

        console.log("Before removeItem:", localStorage.getItem("accessToken"));

        // Remove tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userEmail");

        console.log("After removeItem:", localStorage.getItem("accessToken"));

        // Redirect to login
        context.setIsLoggedIn(false);
        navigate("/login");
      }
    });
  };

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
        <div>
          <IconButton aria-label="notifications" onClick={handleOpenNotif}>
            <StyledBadge badgeContent={unreadCount} color="secondary">
              <FaRegBell className="text-[22px] text-[rgba(0,0,0,0.5)]" />
            </StyledBadge>
          </IconButton>

          <Menu
            anchorEl={anchorNotif}
            id="notif-menu"
            open={openNotif}
            onClose={handleCloseNotif}
            onClick={handleCloseNotif}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <div className="px-4 py-2 w-[360px]">
              <h3 className="text-sm font-semibold">Notifications</h3>
              <div className="mt-2 max-h-[360px] overflow-auto">
                {notifications && notifications.length > 0 ? (
                  notifications.map((n) => (
                    <MenuItem key={n._id} onClick={() => handleNotificationClick(n)} className="flex flex-col items-start">
                      <div className="text-[13px] font-medium">{n.productName || 'Product'}</div>
                      <div className="text-[12px] text-gray-600">Requested by {n.userName || n.userEmail}</div>
                      <div className="text-[11px] text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString()}</div>
                    </MenuItem>
                  ))
                ) : (
                  <div className="text-[13px] text-gray-500 p-3">No notifications</div>
                )}
              </div>
              <div className="mt-2 text-right">
                <Link to="/product/notify-requests" className="text-sm text-blue-600">View all</Link>
              </div>
            </div>
          </Menu>
        </div>
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
              anchorEl={anchorMyAcc}
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
                <Button className="flex items-center gap-2 text-[14px] opacity-80" onClick={logout}><PiSignOutBold size={16}
                />Sign out
                </Button>
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
