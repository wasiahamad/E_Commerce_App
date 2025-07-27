import React, { useContext, useState } from "react";
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

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
    { id: "name", label: "PRODUCT", minWidth: 170 },
    { id: "code", label: "CATEGORY", minWidth: 150 },
    {
        id: "population",
        label: "SUB CATEGORY",
        minWidth: 150,
        align: "left",
    },
    {
        id: "size",
        label: "PRICE",
        minWidth: 150,
        align: "left",
    },
    {
        id: "density",
        label: "SALES",
        minWidth: 150,
        align: "left",
    },
    {
        id: "size",
        label: "STOCK",
        minWidth: 150,
        align: "left",
    },
    {
        id: "size",
        label: "RATING",
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

const ProductTable = (props) => {
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

    const [age, setAge] = useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const context = useContext(MyContext);

    return (
        <div className="w-full flex flex-col gap-4 ">
            <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-[600] text-[rgba(0,0,0,0.8)] pl-2 pt-5">
                    Products
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
            </div>
            <div className="w-full bg-white pt-5 border border-[rgba(0,0,0,0.1)] shadow-md sm:rounded-lg ">
                <div className="flex items-center justify-between w-full pl-6 gap-2">
                    <div className="col1 w-[25%] ">
                        <h3 className="font-[600] text-[14px]">Category By</h3>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={age}
                            size="small"
                            className="w-full mt-2 mb-6"
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </div>

                    <div className="col1 w-[25%] ">
                        <h3 className="font-[600] text-[14px]">Sub Category By</h3>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={age}
                            size="small"
                            className="w-full mt-2 mb-6"
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </div>

                    <div className="col1 w-[25%] ">
                        <h3 className="font-[600] text-[14px]">Third Level Sub Category By</h3>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={age}
                            size="small"
                            className="w-full mt-2 mb-6"
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </div>

                    <div className="col2 w-[25%] ml-auto mr-5">
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
                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                            <Link to="/product/455" data-discover="true">
                                                <img
                                                    src="https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg"
                                                    alt=""
                                                    className="w-full transition-all duration-150 group-hover:scale-105"
                                                />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
                                                <a href="/product/455" data-discover="true">
                                                    New Clean & Clear Pimple Clearing Face Wash With
                                                    Salicylic Acid 80 gm
                                                </a>
                                            </h3>
                                            <span className="text-[12px]">Shirt</span>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Fashion
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Men
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex gap-1 flex-col">
                                        <span className="text-[14px] font-[500] line-through leading-3 text-gray-500 ">
                                            ₹ 2222.00
                                        </span>
                                        <span className="font-[600] text-[14px] text-[#3872fa] ">
                                            ₹ 1000.00
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className="text-[14px] w-[100px] ">
                                        <span className="font-[600]">253</span> sale
                                    </p>
                                    <LinearProgress
                                        className="w-[60px]"
                                        color="success"
                                        variant="determinate"
                                        value={40}
                                    />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    4698
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Rating defaultValue={2.5} readOnly size="small" />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-1">
                                        <Tooltip title="Edit" placement="top">
                                            <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                <AiOutlineEdit className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                            </Button>
                                        </Tooltip>

                                        <Tooltip title="eyes" placement="top">
                                            <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                <FaRegEye className="text-[rgba(0,0,0,0.8)] text-[20px]" />
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
                                    <Checkbox {...label} size="small" />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-4 w-[300px] ">
                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                            <Link to="/product/455" data-discover="true">
                                                <img
                                                    src="https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg"
                                                    alt=""
                                                    className="w-full transition-all duration-150 group-hover:scale-105"
                                                />
                                            </Link>
                                        </div>
                                        <div className="info w-[75%]">
                                            <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
                                                <a href="/product/455" data-discover="true">
                                                    New Clean & Clear Pimple Clearing Face Wash With
                                                    Salicylic Acid 80 gm
                                                </a>
                                            </h3>
                                            <span className="text-[12px]">Shirt</span>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Fashion
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    Men
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex gap-1 flex-col">
                                        <span className="text-[14px] font-[500] line-through leading-3 text-gray-500 ">
                                            ₹ 2222.00
                                        </span>
                                        <span className="font-[600] text-[14px] text-[#3872fa] ">
                                            ₹ 1000.00
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <p className="text-[14px] w-[100px] ">
                                        <span className="font-[600]">253</span> sale
                                    </p>
                                    <LinearProgress
                                        className="w-[60px]"
                                        color="success"
                                        variant="determinate"
                                        value={40}
                                    />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    4698
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <Rating defaultValue={2.5} readOnly size="small" />
                                </TableCell>

                                <TableCell style={{ minWidth: columns.minWidth }}>
                                    <div className="flex items-center gap-1">
                                        <Tooltip title="Edit" placement="top">
                                            <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                <AiOutlineEdit className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                            </Button>
                                        </Tooltip>

                                        <Tooltip title="eyes" placement="top">
                                            <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                <FaRegEye className="text-[rgba(0,0,0,0.8)] text-[20px]" />
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
    );
};

export default ProductTable;
