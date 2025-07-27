import React, { useContext } from "react";
import {
    Button,
    Checkbox,
    LinearProgress,
    Rating,
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
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchBox from "../SearchBox";
import { MyContext } from "../../App";
import { MdOutlineMailLock } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { MdDelete } from "react-icons/md";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
    { id: "name", label: "User", minWidth: 170 },
    { id: "code", label: "USER PHONE NO", minWidth: 150 },
    {
        id: "population",
        label: "CREATED",
        minWidth: 150,
        align: "left",
    },
    {
        id: "size",
        label: "ACTIONS",
        minWidth: 150,
        align: "left",
    },
];

const UserList = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // slected row

    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const context = useContext(MyContext);

    return (
        <div className="w-full flex flex-col gap-4 ">
            {/* <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-[600] text-[rgba(0,0,0,0.8)] pl-2 pt-5">
                    Users
                </h2>
                <div className="flex items-center gap-2">
                    <Button className="btn-red !mt-5 !capitalize">
                        <FaPlus className="mr-1 text-[18px]" />
                        Delete
                    </Button>
                    <Button
                        className="btn-blue !mt-5 !capitalize "
                        onClick={() => context.setIsOpenAddProductForm({ isOpen: true , model: "Add Product"})}
                    >
                        <FaPlus className="mr-1 text-[18px]" />
                        Add Products
                    </Button>
                </div>
            </div> */}
            <div className="w-full bg-white pt-5 border border-[rgba(0,0,0,0.1)] shadow-md sm:rounded-lg ">
                <div className="flex items-center justify-between w-full pl-6  mb-5">
                    <div className="col1 w-[25%]">
                        <h3 className="font-[600] text-[20px]">Users</h3>
                        
                    </div>

                    <div className="col2 w-[45%] ml-auto mr-5">
                        <SearchBox />
                    </div>
                </div>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Checkbox {...label} size="small" />
                                </TableCell>
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
                                    <Checkbox {...label} size="small" />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-4 w-[300px] ">
                                        <div className="img w-[50px] h-[50px] rounded-md overflow-hidden group">
                                            <Link to="/product/455" data-discover="true">
                                                <img
                                                    src="https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg"
                                                    alt=""
                                                    className="w-full transition-all duration-150 group-hover:scale-105"
                                                />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[500] text-[14px] leading-4 mb-2">
                                                Raman Raghav
                                            </h3>
                                            <p className="text-[16px] flex gap-2"><MdOutlineMailLock size={16} /> *******</p>
                                        </div>
                                        
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className="text-[16px] flex gap-2"><FaPhone size={16} className="mr-1 " /> ********</p>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className="text-[14px] flex gap-2"><SlCalender size={15} className="mr-1 " /> 2023-10-01</p>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    {/* <div className="flex gap-1 flex-col"> */}
                                        <Button className='btn-red !capitalize !mr-5'><MdDelete size={18} />Delete</Button>
                                    {/* </div> */}
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
    );
};

export default UserList;
