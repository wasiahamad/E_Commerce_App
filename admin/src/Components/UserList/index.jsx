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
import { Link, Navigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchBox from "../SearchBox";
import { searchUsers } from "../../utils/api";
import { MyContext } from "../../App";
import { MdOutlineMailLock } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { getData, getUsers } from "../../utils/api";
import { useState } from "react";
import { useEffect } from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

// Helper: format a date string into Indian Standard Time (IST)
const formatToIST = (dateString) => {
    if (!dateString) return "-";
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        const options = {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Kolkata",
        };
        const formatter = new Intl.DateTimeFormat("en-IN", options);
        return formatter.format(date) + " IST";
    } catch (err) {
        return dateString;
    }
};
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

const UserList = () => {
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

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [users, setUsers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const context = useContext(MyContext);

    // get all users list with details
    // Debounce helper
    const debounceRef = React.useRef(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                let res;
                if (searchQuery && searchQuery.trim().length > 0) {
                    res = await searchUsers(searchQuery, page + 1, rowsPerPage);
                } else {
                    res = await getUsers(page + 1, rowsPerPage);
                }

                // Normalize response shapes from backend
                let usersList = [];
                let total = 0;

                if (!res) {
                    usersList = [];
                } else if (Array.isArray(res)) {
                    usersList = res;
                } else if (Array.isArray(res.data)) {
                    usersList = res.data;
                    total = res.count || res.total || res.totalDocs || usersList.length;
                } else {
                    usersList = res.data?.data || res.data?.users || res.data || res.users || [];
                    if (!Array.isArray(usersList)) usersList = [];
                    total = res.count || res.total || res.data?.count || res.data?.total || usersList.length;
                }

                setUsers(usersList);
                setTotalCount(total || usersList.length);
            } catch (err) {
                console.error("Error fetching users:", err);
                context?.alertBox?.("error", "Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };

        // clear previous debounce
        if (debounceRef.current) clearTimeout(debounceRef.current);
        // debounce 300ms
        debounceRef.current = setTimeout(() => {
            fetchUsers();
        }, 300);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [page, rowsPerPage, searchQuery]);

    console.log("usersList", users);

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
                        <SearchBox value={searchQuery} onChange={setSearchQuery} placeholder="Search users by name or email" />
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
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        <div className="py-4">Loading users...</div>
                                    </TableCell>
                                </TableRow>
                            ) : users.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        <div className="py-4">No users found</div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((u) => (
                                    <TableRow key={u._id || u.id || u.email} hover>
                                        <TableCell>
                                            <Checkbox {...label} size="small" />
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-4 w-[300px] ">
                                                <div className="img w-[50px] h-[50px] rounded-md overflow-hidden group">
                                                    <Link to={`/user/${u._id || u.id}`}>
                                                        <img
                                                            src={u.avatar ? u.avatar : "https://serviceapi.spicezgold.com/download/1742453278959_fgfg1.jpg"}
                                                            alt={u.name || "user"}
                                                            className="w-full transition-all duration-150 group-hover:scale-105"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="info w-[75%]">
                                                    <Link to={`/user/${u._id || u.id}`}>
                                                        <h3 className="font-[500] text-[14px] leading-4 mb-2">{u.name || u.fullName || u.email}</h3>
                                                    </Link>
                                                    <p className="text-[16px] flex gap-2"><MdOutlineMailLock size={16} /> {u.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <p className="text-[16px] flex gap-2"><FaPhone size={16} className="mr-1 " /> {u.mobile || u.phone}</p>
                                        </TableCell>

                                        <TableCell>
                                            <p className="text-[14px] flex gap-2"><SlCalender size={15} className="mr-1 " /> {formatToIST(u?.createdAt || u?.created_at || u?.created)}</p>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Tooltip title="View">
                                                    <Link to={`/user/${u._id || u.id}`}>
                                                        <Button className="!capitalize"><FaRegEye /></Button>
                                                    </Link>
                                                </Tooltip>
                                                <Tooltip title="Edit">
                                                    <Button className="!capitalize"><AiOutlineEdit /></Button>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <Button className='btn-red !capitalize'><MdDelete size={18} />Delete</Button>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
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
