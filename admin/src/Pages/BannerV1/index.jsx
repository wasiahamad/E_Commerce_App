import React, { useContext, useEffect, useState } from "react";
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

import { MyContext } from "../../App";
import { getData, deleteData } from '../../utils/api';

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
    { id: "image", label: "Image", minWidth: 250 },
    { id: "action", label: "Action", minWidth: 100 },

];

const BannerV1 = (props) => {
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
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const res = await getData('/api/v1/banner/admin/all');
                if (!mounted) return;
                if (res && res.success) setBanners(res.data || []);
            } catch (err) {
                console.error('Error loading banners', err);
            }
        }
        load();
        return () => { mounted = false };
    }, [context.refresh]);

    return (
        <div className={`contentRight py-4 px-5 ${context.isSidebarOpen ? "w-[80%]" : "w-[100%]"} transition-all duration-300`}>
            <div className="w-full flex flex-col gap-4 ">
                <div className="flex items-center justify-between">
                    <h2 className="text-[20px] font-[600] text-[rgba(0,0,0,0.8)] pl-2 pt-5">
                        Add Home Banner List 1
                    </h2>
                    <div className="flex items-center gap-2">
                        <Button
                            className="btn-blue !mt-5 !capitalize "
                            onClick={() => context.setIsOpenAddProductForm({ isOpen: true, model: "Add Banner List-1" })}
                        >
                            <FaPlus className="mr-1 text-[18px]" />
                            Add Home Banner List 1
                        </Button>
                    </div>
                </div>
                <div className="w-full bg-white pt-5 border border-[rgba(0,0,0,0.1)] shadow-md sm:rounded-lg ">

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
                                {banners && banners.length > 0 ? (
                                    banners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((b) => (
                                        <TableRow key={b._id} hover role="checkbox" tabIndex={-1}>
                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <div className="flex items-center gap-4 w-[300px] ">
                                                    <div className="img w-[200px] h-[130px] rounded-md overflow-hidden group">
                                                        {b.link ? (
                                                            <Link to={b.link} data-discover="true">
                                                                <img src={b.img} alt={b.title || ''} className="w-full h-full object-cover transition-all duration-150 group-hover:scale-105" />
                                                            </Link>
                                                        ) : (
                                                            <img src={b.img} alt={b.title || ''} className="w-full h-full object-cover" />
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <div className="flex items-center gap-1">
                                                    <Tooltip title="Edit" placement="top">
                                                        <Button onClick={() => context.setIsOpenAddProductForm({ isOpen: true, model: 'Edit Banner', data: b })} className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                            <AiOutlineEdit className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                        </Button>
                                                    </Tooltip>

                                                    <Tooltip title="delete" placement="top">
                                                        <Button onClick={async () => {
                                                            if (!window.confirm('Delete this banner?')) return;
                                                            try {
                                                                await deleteData(`/api/v1/banner/delete/${b._id}`);
                                                                context.setRefresh(!context.refresh);
                                                            } catch (err) {
                                                                console.error('Delete banner error', err);
                                                            }
                                                        }} className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                            <MdDeleteOutline className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                        </Button>
                                                    </Tooltip>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={2} className="text-center py-8">No banners found</TableCell>
                                    </TableRow>
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
        </div>
    );
};

export default BannerV1;
