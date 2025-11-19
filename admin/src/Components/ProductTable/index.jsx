import { useContext, useState, useEffect, useRef } from "react";
import {
    Button, Checkbox, LinearProgress, MenuItem, Rating, Select, Tooltip, CircularProgress
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
import { deleteProduct, getAllProductsByCatId, getProducts, searchProducts } from "../../utils/api";

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
    const [selectedIds, setSelectedIds] = useState([]); // <-- selected product ids
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productThirdSubCat, setProductThirdSubCat] = useState('');
    const [productSearchQuery, setProductSearchQuery] = useState("");
    const searchDebounceRef = useRef(null);

    const [formFields, setFormFields] = useState({
        name: '',
        description: '',
        catName: '',
        subCatName: '',
        subCatId: '',
        catId: '',
        thirdSubCat: '',
        thirdSubCatId: '',
        countInStock: '',
        rating: '',
        isFeatured: false,
        discount: '',
        brand: '',
        price: '',
        oldPrice: '',
        productRam: [],
        size: [],
        productWeight: [],
        image: []
    });
    const context = useContext(MyContext);

    // Fetch products
    const fetchProducts = async () => {
        try {
            setLoadingProducts(true);
            let res;
            if (productSearchQuery && productSearchQuery.trim().length > 0) {
                res = await searchProducts(productSearchQuery);
            } else {
                res = await getProducts(page + 1, rowsPerPage); // backend is 1-based
            }
            if (!res.error) {
                setProducts(res.data || []);
                setTotal(res.totalPost || res.count || res.total || (res.data && res.data.length) || 0);
            } else {
                setProducts([]);
                setTotal(0);
            }
        } catch (err) {
            console.error('Error fetching products', err);
            setProducts([]);
            setTotal(0);
        } finally {
            setLoadingProducts(false);
        }
    };

    useEffect(() => {
        // debounce product search when query changes
        if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
        searchDebounceRef.current = setTimeout(() => {
            fetchProducts();
        }, 300);
        return () => {
            if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
        };
    }, [page, rowsPerPage]);

    // also refetch when search query changes
    useEffect(() => {
        if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
        searchDebounceRef.current = setTimeout(() => {
            // reset to first page on new search
            setPage(0);
            fetchProducts();
        }, 300);
        return () => {
            if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
        };
    }, [productSearchQuery]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // getAll Products by catId
    const fetchProductsByCatId = async (event) => {
        const catId = event.target.value;
        try {
            setLoadingProducts(true);
            const res = await getAllProductsByCatId(catId, page + 1, rowsPerPage);
            if (!res.error) {
                setProducts(res.data || []);
                setProductCat(catId);
                setTotal(res.totalPost || 0);
            } else {
                setProducts([]);
                setTotal(0);
            }
        } catch (err) {
            console.error('Error fetching by cat id', err);
            setProducts([]);
            setTotal(0);
        } finally {
            setLoadingProducts(false);
        }
    };

    // inside ProductTable component
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        setDeleting(true);
        try {
            const res = await deleteProduct(id);
            if (!res.error) {
                context.alertBox("success", "Product deleted successfully");
                await fetchProducts(); // 🔄 refresh list
            } else {
                context.alertBox("error", "Error deleting product");
            }
        } catch (err) {
            console.error('Delete product error', err);
            context.alertBox("error", "Error deleting product");
        } finally {
            setDeleting(false);
        }
    };

    // toggle single product selection
    const toggleSelect = (id) => {
        setSelectedIds((prev) => {
            if (prev.includes(id)) return prev.filter((i) => i !== id);
            return [...prev, id];
        });
    };

    // toggle select all on current page
    const toggleSelectAll = (checked) => {
        if (checked) {
            const ids = products.map((p) => p._id);
            setSelectedIds(ids);
        } else {
            setSelectedIds([]);
        }
    };

    // delete selected products (multiple)
    const handleDeleteSelected = async () => {
        if (!selectedIds || selectedIds.length === 0) {
            // no selection -> show alert
            if (context && typeof context.alertBox === "function") {
                context.alertBox("error", "Please select product(s) first before deleting.");
            } else {
                window.alert("Please select product(s) first before deleting.");
            }
            return;
        }

        // If all visible products selected, ask explicit confirmation
        const allSelected = selectedIds.length === products.length && products.length > 0;
        const confirmMessage = allSelected
            ? "You have selected all products on this page. Are you sure you want to delete them?"
            : `Are you sure you want to delete ${selectedIds.length} selected product(s)?`;

        if (!window.confirm(confirmMessage)) return;
        setDeleting(true);
        try {
            const results = await Promise.all(selectedIds.map((id) => deleteProduct(id).catch((e) => ({ error: true }))));
            let successCount = 0;
            results.forEach((r) => {
                if (!r || !r.error) successCount += 1;
            });

            if (successCount > 0) {
                context.alertBox("success", `${successCount} product(s) deleted successfully`);
            }
            if (successCount < selectedIds.length) {
                context.alertBox("error", `${selectedIds.length - successCount} product(s) could not be deleted`);
            }

            // refresh list and clear selection
            setSelectedIds([]);
            await fetchProducts();
        } catch (err) {
            console.error(err);
            context.alertBox("error", "Error deleting selected products");
        } finally {
            setDeleting(false);
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
                    <Button className="btn-red !mt-5 !capitalize" onClick={handleDeleteSelected} disabled={deleting}>
                        {deleting ? <CircularProgress size={18} color="inherit" className="mr-1" /> : <FaPlus className="mr-1 text-[18px]" />} Delete
                    </Button>
                    <Button
                        className="btn-blue !mt-5 !capitalize "
                        onClick={() => context.setIsOpenAddProductForm({ isOpen: true, model: "Add Product" })}
                    >
                        <FaPlus className="mr-1 text-[18px]" /> Add Products
                    </Button>
                </div>
            </div>

            <div className="w-full bg-white pt-5 border border-[rgba(0,0,0,0.1)] shadow-md sm:rounded-lg relative">
                {loadingProducts && (
                    <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center bg-[rgba(255,255,255,0.6)] z-30">
                        <CircularProgress />
                    </div>
                )}
                <div className="grid grid-cols-4 gap-4 mb-3">
                    <div className="col">
                        <h3 className='text-[14px] font-[500] mb-1'>Product Category</h3>

                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={productCat}
                            size="small"
                            className="w-full mt-2 mb-6"
                            label="Product Category"
                            onChange={fetchProductsByCatId}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {context?.categories?.map((cat, idx) => {
                                return (
                                    <MenuItem value={cat?._id} onClick={() => formFields.catName = cat?.name}>
                                        {cat?.name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </div>

                    <div className="col">
                        <h3 className='text-[14px] font-[500] mb-1'>Product Sub Category</h3>

                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={productSubCat}
                            size="small"
                            className="w-full mt-2 mb-6"
                            label="Sub Category"
                        // onChange={handleChangeProductSubCat}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {/* for subcategory category ka hi children array h */}
                            {
                                context?.categories?.map((cat, idx) => {
                                    return (
                                        cat?.children?.map((subCat, idx) => {
                                            return (
                                                <MenuItem value={subCat?._id}>
                                                    {subCat?.name}
                                                </MenuItem>
                                            )
                                        })
                                    )
                                })
                            }
                        </Select>
                    </div>

                    <div className="col">
                        <h3 className='text-[14px] font-[500] mb-1'>Product Third Lavel Category</h3>

                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={productThirdSubCat}
                            size="small"
                            className="w-full mt-2 mb-6"
                            label="Age"
                        // onChange={handleChangeProductThirdSubCat}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {/* for third subcategory subcategory ka hi children array h */}
                            {
                                context?.categories?.map((cat, idx) => {
                                    return (
                                        cat?.children?.map((subCat, idx) => {
                                            return (
                                                subCat?.children?.map((thirdCat, idx) => {
                                                    return (
                                                        <MenuItem value={thirdCat?._id}>
                                                            {thirdCat?.name}
                                                        </MenuItem>
                                                    )
                                                })
                                            )
                                        })
                                    )
                                })
                            }
                        </Select>
                    </div>

                    <div className="col">
                        <h3 className='text-[14px] font-[500] mb-1'>Search Products</h3>
                        <input
                            type="text"
                            placeholder='search products here'
                            className='w-full mt-2 h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.2)] focus:border-[rgba(0,0,0,0.5)] p-3'
                            name='search'
                            value={productSearchQuery}
                            onChange={(e) => setProductSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Checkbox
                                        size="small"
                                        checked={products.length > 0 && selectedIds.length === products.length}
                                        indeterminate={selectedIds.length > 0 && selectedIds.length < products.length}
                                        onChange={(e) => toggleSelectAll(e.target.checked)}
                                        inputProps={{ 'aria-label': 'select all products' }}
                                    />
                                </TableCell>
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
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            checked={selectedIds.includes(product._id)}
                                            onChange={() => toggleSelect(product._id)}
                                            inputProps={{ 'aria-label': `select product ${product._id}` }}
                                        />
                                    </TableCell>

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
                                                <Link to={`/product/${product._id}`} data-discover="true">
                                                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] ">
                                                        <FaRegEye className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                                                    </Button>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip title="Delete" placement="top">
                                                <span>
                                                    <Button
                                                        className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] "
                                                        onClick={() => handleDelete(product._id)}
                                                        disabled={deleting}
                                                    >
                                                        {deleting ? <CircularProgress size={18} /> : <MdDeleteOutline className="text-[rgba(0,0,0,0.8)] text-[20px]" />}
                                                    </Button>
                                                </span>
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

