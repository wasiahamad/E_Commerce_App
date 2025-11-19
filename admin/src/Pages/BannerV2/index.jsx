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

    const [banners, setBanners] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const res = await getData('/api/v1/banner/admin/all');
            if (res && res.data) {
                // only show banners created for Banner List-2 (listType === 'banner2')
                const list2 = res.data.filter(b => (b.listType || '').toString() === 'banner2');
                setBanners(list2);
            }
        } catch (err) {
            console.error('Failed to load banners', err);
        }
        setLoading(false);
    };

    React.useEffect(() => { load(); }, []);

    const handleDelete = async (id) => {
        if (!confirm('Delete this banner?')) return;
        try {
            await deleteData(`/api/v1/banner/delete/${id}`);
            load();
        } catch (err) { console.error(err); }
    };

    return (
        <div className={`contentRight py-4 px-5 ${context.isSidebarOpen ? "w-[80%]" : "w-[100%]"} transition-all duration-300`}>
            <div className="w-full flex flex-col gap-4 ">
                <div className="flex items-center justify-between">
                    <h2 className="text-[20px] font-[600] text-[rgba(0,0,0,0.8)] pl-2 pt-5">
                        Home Banner List-2
                    </h2>
                    <div className="flex items-center gap-2">
                        <Button
                            className="btn-blue !mt-5 !capitalize "
                            onClick={() => context.setIsOpenAddProductForm({ isOpen: true, model: "Add Banner List-2" })}
                        >
                            <FaPlus className="mr-1 text-[18px]" />
                            Add Home Banner List-2
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
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={2}><LinearProgress /></TableCell>
                                    </TableRow>
                                ) : (
                                    banners.map(b => (
                                        <TableRow key={b._id}>
                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <div className="flex items-center gap-4 w-[300px] ">
                                                    <div className="img w-[220px] h-[125px] rounded-md overflow-hidden group">
                                                        <Link to="#">
                                                            <img src={b.img} alt="" className="w-full h-full object-cover" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell style={{ minWidth: columns.minWidth }}>
                                                <div className="flex items-center gap-1">
                                                    <Tooltip title="Edit" placement="top">
                                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] " onClick={() => context.setIsOpenAddProductForm({ isOpen: true, model: 'Edit Banner', data: b })}>
                                                            <AiOutlineEdit className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                        </Button>
                                                    </Tooltip>

                                                    <Tooltip title="delete" placement="top">
                                                        <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] " onClick={() => handleDelete(b._id)}>
                                                            <MdDeleteOutline className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                        </Button>
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
                        count={banners.length || 0}
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
