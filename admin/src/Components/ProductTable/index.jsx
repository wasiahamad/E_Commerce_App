import { useContext, useState, useEffect } from "react";
import {
    Button, Checkbox, LinearProgress, Rating, Tooltip
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
import { MyContext } from "../../App";
import { deleteProduct, getProducts } from "../../utils/api";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
    { id: "name", label: "PRODUCT", minWidth: 170 },
    { id: "code", label: "CATEGORY", minWidth: 150 },
    { id: "subCategory", label: "SUB CATEGORY", minWidth: 150, align: "left" },
    { id: "prize", label: "PRICE", minWidth: 150, align: "left" },
    { id: "sale", label: "SALES", minWidth: 150, align: "left" },
    { id: "stock", label: "STOCK", minWidth: 150, align: "left" },
    { id: "rating", label: "RATING", minWidth: 150, align: "left" },
    { id: "action", label: "ACTIONS", minWidth: 150, align: "left" },
];

const ProductTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [editProduct, setEditProduct] = useState(null); // for selected product


    const context = useContext(MyContext);

    // Fetch products
    const fetchProducts = async () => {
        const res = await getProducts(page + 1, rowsPerPage); // backend me page 1-based hai
        if (!res.error) {
            setProducts(res.data);
            setTotal(res.totalPost);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // inside ProductTable component
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        const res = await deleteProduct(id);
        if (!res.error) {
            context.alertBox("success", "Product deleted successfully");
            fetchProducts(); // 🔄 refresh list
        } else {
            context.alertBox("error", "Error deleting product");
        }
    };

    // products edit handler
    const handleEdit = (product) => {
        setEditProduct(product); // pass product data to form
        context.setIsOpenAddProductForm({ isOpen: true, model: "Edit Product" });
    };

    return (
        <div className="w-full flex flex-col gap-4 ">
            <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-[600] text-[rgba(0,0,0,0.8)] pl-2 pt-5">
                    Products
                </h2>
                <div className="flex items-center gap-2">
                    <Button className="btn-red !mt-5 !capitalize">
                        <FaPlus className="mr-1 text-[18px]" /> Delete
                    </Button>
                    <Button
                        className="btn-blue !mt-5 !capitalize "
                        onClick={() => context.setIsOpenAddProductForm({ isOpen: true, model: "Add Product" })}
                    >
                        <FaPlus className="mr-1 text-[18px]" /> Add Products
                    </Button>
                </div>
            </div>

            <div className="w-full bg-white pt-5 border border-[rgba(0,0,0,0.1)] shadow-md sm:rounded-lg ">
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell><Checkbox {...label} size="small" /></TableCell>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell><Checkbox {...label} size="small" /></TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-4 w-[300px] ">
                                            <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                                <Link to={`/product/${product._id}`} data-discover="true">
                                                    <img
                                                        src={product.image?.[0] || "https://via.placeholder.com/65"}
                                                        alt={product.name}
                                                        className="w-full transition-all duration-150 group-hover:scale-105"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="info w-[75%]">
                                                <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa] ">
                                                    {product.name}
                                                </h3>
                                                <span className="text-[12px]">{product.brand}</span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>{product.catName || "-"}</TableCell>
                                    <TableCell>{product.subCatName || "-"}</TableCell>

                                    <TableCell>
                                        <div className="flex gap-1 flex-col">
                                            {product.oldPrice && (
                                                <span className="text-[14px] font-[500] line-through leading-3 text-gray-500 ">
                                                    ₹ {product.oldPrice}
                                                </span>
                                            )}
                                            <span className="font-[600] text-[14px] text-[#3872fa] ">
                                                ₹ {product.price}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <p className="text-[14px] w-[100px] ">
                                            <span className="font-[600]">{product.sales || 0}</span> sale
                                        </p>
                                        <LinearProgress
                                            className="w-[60px]"
                                            color="success"
                                            variant="determinate"
                                            value={40}
                                        />
                                    </TableCell>

                                    <TableCell>{product.countInStock}</TableCell>
                                    <TableCell><Rating value={product.rating || 0} readOnly size="small" /></TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Tooltip title="Edit" placement="top">
                                                <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                    <AiOutlineEdit
                                                        className="text-[rgba(0,0,0,0.8)] text-[20px]"
                                                        onClick={() =>
                                                            context.setIsOpenAddProductForm({
                                                                isOpen: true,
                                                                model: "Edit Product",
                                                                data: product,   // 🔑 yaha se pura product bhejna
                                                            })
                                                        }
                                                    />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="View" placement="top">
                                                <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                    <FaRegEye className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Delete" placement="top">
                                                <Button
                                                    className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] "
                                                    onClick={() => handleDelete(product._id)}
                                                >
                                                    <MdDeleteOutline className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={total}
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

