import React, { useContext, useState } from "react";
import {
    Button,
    Tooltip,
} from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

import { MyContext } from "../../App";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
    { id: "image", label: "Image", minWidth: 150 },
    { id: "name", label: "Category Name", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 100 },

];

const CategoryList = (props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // slected row

    const [age, setAge] = useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const context = useContext(MyContext);

    return (
        <>
            <div className={`contentRight py-2 px-5 ${context.isSidebarOpen ? "w-[80%]" : "w-[100%]"} transition-all duration-300`}>
                <div className="w-full flex flex-col gap-4 ">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[20px] font-[600] text-[rgba(0,0,0,0.8)] pl-2 pt-5">
                            Category List
                        </h2>
                        <div className="flex items-center gap-2">
                            <Button
                                className="btn-blue !mt-5 !capitalize "
                                onClick={() => context.setIsOpenAddProductForm({ isOpen: true, model: "Add Category" })}
                            >
                                <FaPlus className="mr-1 text-[18px]" />
                                Add Category
                            </Button>
                        </div>
                    </div>
                    <div className="w-full bg-white py-5 border border-[rgba(0,0,0,0.1)] shadow-md sm:rounded-lg ">

                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            <div className="flex items-center gap-4 w-[100px] ">
                                                <div className="img w-[50px] h-[50px] rounded-md overflow-hidden group">
                                                    <Link to="/product/455" data-discover="true">
                                                        <img
                                                            src="https://serviceapi.spicezgold.com/download/1744509970781_fash.png"
                                                            alt=""
                                                            className="w-full h-full object-cover transition-all duration-150 group-hover:scale-105"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            Fashion
                                        </TableCell>

                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            <div className="flex items-center gap-1">
                                                <Tooltip title="Edit" placement="top">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                        <AiOutlineEdit className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                    </Button>
                                                </Tooltip>

                                                <Tooltip title="delete" placement="top">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                        <MdDeleteOutline className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            <div className="flex items-center gap-4 w-[100px] ">
                                                <div className="img w-[50px] h-[50px] rounded-md overflow-hidden group">
                                                    <Link to="/product/455" data-discover="true">
                                                        <img
                                                            src="https://serviceapi.spicezgold.com/download/1741660988059_ele.png"
                                                            alt=""
                                                            className="w-full h-full object-cover transition-all duration-150 group-hover:scale-105"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            Electronics
                                        </TableCell>

                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            <div className="flex items-center gap-1">
                                                <Tooltip title="Edit" placement="top">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                        <AiOutlineEdit className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                    </Button>
                                                </Tooltip>

                                                <Tooltip title="delete" placement="top">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                        <MdDeleteOutline className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            <div className="flex items-center gap-4 w-[100px] ">
                                                <div className="img w-[50px] h-[50px] rounded-md overflow-hidden group">
                                                    <Link to="/product/455" data-discover="true">
                                                        <img
                                                            src="https://serviceapi.spicezgold.com/download/1741661045887_bag.png"
                                                            alt=""
                                                            className="w-full h-full object-cover transition-all duration-150 group-hover:scale-105"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            Bags
                                        </TableCell>

                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            <div className="flex items-center gap-1">
                                                <Tooltip title="Edit" placement="top">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                        <AiOutlineEdit className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                    </Button>
                                                </Tooltip>

                                                <Tooltip title="delete" placement="top">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                        <MdDeleteOutline className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            <div className="flex items-center gap-4 w-[100px] ">
                                                <div className="img w-[50px] h-[50px] rounded-md overflow-hidden group">
                                                    <Link to="/product/455" data-discover="true">
                                                        <img
                                                            src="https://serviceapi.spicezgold.com/download/1741661061379_foot.png"
                                                            alt=""
                                                            className="w-full h-full object-cover transition-all duration-150 group-hover:scale-105"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            Footwear
                                        </TableCell>

                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            <div className="flex items-center gap-1">
                                                <Tooltip title="Edit" placement="top">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                        <AiOutlineEdit className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                    </Button>
                                                </Tooltip>

                                                <Tooltip title="delete" placement="top">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                        <MdDeleteOutline className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            <div className="flex items-center gap-4 w-[100px] ">
                                                <div className="img w-[50px] h-[50px] rounded-md overflow-hidden group">
                                                    <Link to="/product/455" data-discover="true">
                                                        <img
                                                            src="https://serviceapi.spicezgold.com/download/1741661077633_gro.png"
                                                            alt=""
                                                            className="w-full h-full object-cover transition-all duration-150 group-hover:scale-105"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            Grocery
                                        </TableCell>

                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            <div className="flex items-center gap-1">
                                                <Tooltip title="Edit" placement="top">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                        <AiOutlineEdit className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                    </Button>
                                                </Tooltip>

                                                <Tooltip title="delete" placement="top">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                        <MdDeleteOutline className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            <div className="flex items-center gap-4 w-[100px] ">
                                                <div className="img w-[50px] h-[50px] rounded-md overflow-hidden group">
                                                    <Link to="/product/455" data-discover="true">
                                                        <img
                                                            src="https://serviceapi.spicezgold.com/download/1741661092792_beauty.png"
                                                            alt=""
                                                            className="w-full h-full object-cover transition-all duration-150 group-hover:scale-105"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            Beauty
                                        </TableCell>

                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            <div className="flex items-center gap-1">
                                                <Tooltip title="Edit" placement="top">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                        <AiOutlineEdit className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                    </Button>
                                                </Tooltip>

                                                <Tooltip title="delete" placement="top">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                        <MdDeleteOutline className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            <div className="flex items-center gap-4 w-[100px] ">
                                                <div className="img w-[50px] h-[50px] rounded-md overflow-hidden group">
                                                    <Link to="/product/455" data-discover="true">
                                                        <img
                                                            src="https://serviceapi.spicezgold.com/download/1741661105893_well.png"
                                                            alt=""
                                                            className="w-full h-full object-cover transition-all duration-150 group-hover:scale-105"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            Wellness
                                        </TableCell>

                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            <div className="flex items-center gap-1">
                                                <Tooltip title="Edit" placement="top">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                        <AiOutlineEdit className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                    </Button>
                                                </Tooltip>

                                                <Tooltip title="delete" placement="top">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                        <MdDeleteOutline className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            <div className="flex items-center gap-4 w-[100px] ">
                                                <div className="img w-[50px] h-[50px] rounded-md overflow-hidden group">
                                                    <Link to="/product/455" data-discover="true">
                                                        <img
                                                            src="https://serviceapi.spicezgold.com/download/1741661120743_jw.png"
                                                            alt=""
                                                            className="w-full h-full object-cover transition-all duration-150 group-hover:scale-105"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            Jewelry & Watches
                                        </TableCell>

                                        <TableCell style={{ minWidth: columns.minWidth }}>
                                            <div className="flex items-center gap-1">
                                                <Tooltip title="Edit" placement="top">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                        <AiOutlineEdit className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                    </Button>
                                                </Tooltip>

                                                <Tooltip title="delete" placement="top">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                        <MdDeleteOutline className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            // count={rows.length}
                            count={100}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryList;
