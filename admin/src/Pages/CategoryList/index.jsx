import React, { useContext, useState, useEffect } from "react";
import {
    Button,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { MyContext } from "../../App";
import { getData } from "../../utils/api"; // make sure you have a GET helper

const columns = [
    { id: "image", label: "Image", minWidth: 150 },
    { id: "name", label: "Category Name", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 100 },
];

const CategoryList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [categories, setCategories] = useState([]);
    const context = useContext(MyContext);

    const getCategories = async () => {
        const res = await getData("/api/v1/category");
        if (res?.success) {
            setCategories(res.data); // rootCategories
        } else {
            context.alertBox("error", res?.message || "Failed to fetch categories");
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className={`contentRight py-2 px-5 ${context.isSidebarOpen ? "w-[80%]" : "w-[100%]"} transition-all duration-300`}>
            <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-[600]">Category List</h2>
                <Button
                    className="btn-blue !capitalize"
                    onClick={() => context.setIsOpenAddProductForm({ isOpen: true, model: "Add Category" })}
                >
                    <FaPlus className="mr-1" /> Add Category
                </Button>
            </div>

            <TableContainer sx={{ maxHeight: 440 }} className="bg-white mt-4 border shadow-md">
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.length > 0 ? (
                            categories
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((cat) => (
                                    <TableRow key={cat._id}>
                                        <TableCell>
                                            <div className="w-[50px] h-[50px] rounded-md overflow-hidden">
                                                <img
                                                    src={cat.image}
                                                    alt={cat.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>{cat.name}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Tooltip title="Edit">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1]">
                                                        <AiOutlineEdit size={22}/>
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1]">
                                                        <MdDeleteOutline size={22} />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    No categories found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                count={categories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default CategoryList;

