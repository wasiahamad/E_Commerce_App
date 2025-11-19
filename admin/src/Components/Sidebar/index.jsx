import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiGalleryFill } from "react-icons/ri";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiProductHuntLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { IoBagHandleOutline } from "react-icons/io5";
import { SiBloglovin } from "react-icons/si";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { Collapse } from "react-collapse";
import { FaAngleUp } from "react-icons/fa6";
import { MyContext } from "../../App";
import { IoBagCheckOutline } from "react-icons/io5";
// import { MyContext } from "../../App";

const Sidebar = ({ isOpen }) => {
  const [subMenuIndex, setSubMenuIndex] = useState(null);
  const isOpenSubMenu = (id) => {
    if (subMenuIndex === id) {
      setSubMenuIndex(null);
    } else {
      setSubMenuIndex(id);
    }
  };

  const context = useContext(MyContext);
  return (
    <div className={`sidebar fixed top-0 left-0 bg-[#fff] ${context.isSidebarOpen ? "w-[20%]" : "w-[0px] opacity-0"} h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-4`} >
      <div className="py-2 w-full">
        <Link to="/">
          <img
            src="https://media.istockphoto.com/id/499728904/photo/unknown-person-silhouette.jpg?s=612x612&w=is&k=20&c=Kc9zIAG4mEkV-1Mjfhe6KRaoTE7QtUPOfS5i3_hhmPo="
            alt=""
            className="w-[120px]"
          />
        </Link>
      </div>

      <ul className="mt-4 ">
        <li className="text-[16px] pb-2">
          <Link to="/">
            <Button className="!w-full !capitalize !justify-start flex items-center gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] font-[500]"
            >
              <MdOutlineSpaceDashboard size={20} />
              <span> Dashboard</span>
            </Button>
          </Link>
        </li>

        <li className="text-[16px] pb-2">

          <Button className="!w-full !capitalize !justify-start flex items-center gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] font-[500]"
            onClick={() => {
              isOpenSubMenu(1);
            }}
          >
            <RiGalleryFill size={20} />
            <span> Home Slider</span>
            <span
              className="ml-auto w-[30px] h-[30px] flex items-center"

            >
              {" "}
              {subMenuIndex === 1 ? <FaAngleUp /> : <FaAngleDown />}
            </span>
          </Button>


          <Collapse isOpened={subMenuIndex === 1 ? true : false}>
            <ul className="w-full">
              <li className="w-full">
                <Link to="/homeslider/list">
                  <Button className="!w-full !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11 flex gap-3">
                    <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                    Home Banner List
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button className="!w-full  flex gap-3 !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11"
                  onClick={() => context.setIsOpenAddProductForm({ isOpen: true, model: "Add Home Slider" })}>
                  <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                  Add Home Banner List
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>

        <li className="text-[16px] pb-2">

          <Button
            className="!w-full !capitalize !justify-start flex items-center gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] font-[500]"
            onClick={() => {
              isOpenSubMenu(2);
            }}
          >
            <MdOutlineDashboardCustomize size={20} />
            <span> Category</span>
            <span className="ml-auto w-[30px] h-[30px] flex items-center">
              {subMenuIndex === 2 ? <FaAngleUp /> : <FaAngleDown />}
            </span>
          </Button>


          <Collapse isOpened={subMenuIndex === 2 ? true : false}>
            <ul className="w-full">
              <li className="w-full">
                <Link to="/category/list">
                  <Button className="!w-full  flex gap-3 !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11">
                    <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                    Category List
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button className="!w-full  flex gap-3 !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11"
                  onClick={() => context.setIsOpenAddProductForm({ isOpen: true, model: "Add Category" })}>
                  <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                  Add a Category List
                </Button>
              </li>

              <li className="w-full">
                <Link to="/subCategory/list">
                  <Button className="!w-full  flex gap-3 !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11">
                    <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                    Sub Category List
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                {/* <Link to="/sub-category-list"> */}
                  <Button className="!w-full  flex gap-3 !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11"
                  onClick={() => context.setIsOpenAddProductForm({ isOpen: true, model: "Add Sub Category" })}
                  >
                    <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                    Add Sub Category List
                  </Button>
                {/* </Link> */}
              </li>
            </ul>
          </Collapse>
        </li>

        <li className="text-[16px] pb-2">

          <Button className="!w-full !capitalize !justify-start flex items-center gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] font-[500]"
            onClick={() => {
              isOpenSubMenu(3);
            }}>
            <RiProductHuntLine size={20} />
            <span> Product</span>
            <span className="ml-auto w-[30px] h-[30px] flex items-center">
              <FaAngleDown />
            </span>
          </Button>

          <Collapse isOpened={subMenuIndex === 3 ? true : false}>
            <ul className="w-full">
              <li className="w-full">
                <Link to="/product">
                  <Button className="!w-full  flex gap-3 !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11">
                    <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                    Product List
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button className="!w-full  flex gap-3 !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11"
                  onClick={() => context.setIsOpenAddProductForm({ isOpen: true, model: "Add Product" })}>
                  <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                  Product Update
                </Button>
              </li>

              <li className="w-full">
                <Link to="/product/rams">
                  <Button className="!w-full  flex gap-3 !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11">
                    <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                    Add Product RAMS
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Link to="/scan">
                  <Button className="!w-full  flex gap-3 !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11">
                    <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                    Scan Product
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Link to="/sub-category-list">
                  <Button className="!w-full  flex gap-3 !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11">
                    <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                    Add Product WEIGHT
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Link to="/sub-category-list">
                  <Button className="!w-full  flex gap-3 !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11">
                    <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                    Add Product SIZE
                  </Button>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>

        <li className="text-[16px] pb-2">
          <Link to="/users">
            <Button className="!w-full !capitalize !justify-start flex items-center gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] font-[500]">
              <LuUsers size={20} />
              <span> Users</span>
            </Button>
          </Link>
        </li>

        <li className="text-[16px] pb-2">
          <Link to="/orders">
            <Button className="!w-full !capitalize !justify-start flex items-center gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] font-[500]">
              <IoBagCheckOutline size={20} />
              <span> Orders</span>
            </Button>
          </Link>
        </li>

        <li className="text-[16px] pb-2">
          <Button className="!w-full !capitalize !justify-start flex items-center gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] font-[500]"
            onClick={() => {
              isOpenSubMenu(4);
            }}>
            <IoBagHandleOutline size={20} />
            <span> Banners</span>
            <span className="ml-auto w-[30px] h-[30px] flex items-center">
              <FaAngleDown />
            </span>
          </Button>
          <Collapse isOpened={subMenuIndex === 4 ? true : false}>
            <ul className="w-full">
              <li className="w-full">
                <Link to="/bannerV1/list">
                  <Button className="!w-full  flex gap-3 !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11">
                    <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                    Home Banner List
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button className="!w-full  flex gap-3 !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11"
                  onClick={() => context.setIsOpenAddProductForm({ isOpen: true, model: "Add Banner List-1" })}>
                  <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                  Add Home Banner
                </Button>
              </li>

              <li className="w-full">
                <Link to="/bannerV2/list">
                  <Button className="!w-full  flex gap-3 !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11">
                    <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                    Home Banner List 2
                  </Button>
                </Link>
              </li>

              <li className="w-full">
                <Button className="!w-full  flex gap-3 !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11"
                  onClick={() => context.setIsOpenAddProductForm({ isOpen: true, model: "Add Banner List-2" })}>
                  <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                  Add Home Banner List-2
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>

        <li className="text-[16px] pb-2">
          <Button className="!w-full !capitalize !justify-start flex items-center gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] font-[500]"
            onClick={() => {
              isOpenSubMenu(5);
            }}>
            <SiBloglovin size={20} />
            <span> Blogs</span>
            <span className="ml-auto w-[30px] h-[30px] flex items-center">
              <FaAngleDown />
            </span>
          </Button>

          <Collapse isOpened={subMenuIndex === 5 ? true : false}>
            <ul className="w-full">
              <li className="w-full">
                <Link to="/blog/list">
                  <Button className="!w-full  flex gap-3 !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11">
                    <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                    Blog List
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button className="!w-full  flex gap-3 !capitalize !justify-start !text-[rgba(0,0,0,0.6)] !text-[13px] !font-[600] !pl-11"
                  onClick={() => context.setIsOpenAddProductForm({ isOpen: true, model: "Add Blog" })}>
                  <span className="w-[5px] h-[5px] bg-[rgba(0,0,0,0.4)] rounded-full block"></span> {"  "}
                  Add Blog
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>

        <li className="text-[16px] pb-2">
          <Link to="/manage-logo">
            <Button className="!w-full !capitalize !justify-start flex items-center gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] font-[500]">
              <MdOutlineLibraryBooks size={20} />
              <span> Manage Logo</span>
            </Button>
          </Link>
        </li>

        <li className="text-[16px] pb-2">
          <Link to="/orders">
            <Button className="!w-full !capitalize !justify-start flex items-center gap-3 !text-[14px] !text-[rgba(0,0,0,0.8)] font-[500]">
              <MdLogout size={20} />
              <span> Logout</span>
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
