import React, { useState } from 'react'
import SideBar from '../../components/SideBar'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ProductsItem from '../../components/ProductsItem';
import { getData } from '../../utils/api';
import { useLocation } from 'react-router-dom';
import ProductsItemList from '../../components/ProductsItemListView';
import { Button } from '@mui/material';
import { IoGrid } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';

const ProductListing = () => {

    const [itemView, setItemView] = useState("grid");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [products, setProducts] = React.useState([]);
    const [pageNum, setPageNum] = React.useState(1);
    const [perPage, setPerPage] = React.useState(12);
    const [totalPageCount, setTotalPageCount] = React.useState(0);
    const [sortOption, setSortOption] = React.useState('default');
    const [categoryName, setCategoryName] = React.useState('Products');

    const location = useLocation();

    React.useEffect(() => {
        // read query params for category filter
        const q = new URLSearchParams(location.search);
    const categoryId = q.get('categoryId');
    const subCatId = q.get('subCatId');
    const thirdSubCatId = q.get('thirdSubCatId');

        // scroll to top when filters change
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (e) {}

        const fetchProducts = async () => {
            try {
                // fetch category name if available for breadcrumb
                const searchQuery = q.get('query');
                if (searchQuery) {
                    const res = await getData(`/api/v1/product/public-search?query=${encodeURIComponent(searchQuery)}&page=${pageNum}&perPage=${perPage}`);
                    if (res && res.data) {
                        setProducts(res.data);
                        setTotalPageCount(res.totalPage || res.count || 1);
                    }
                    return;
                }

                // if a third-level category is present, prefer it
                if (thirdSubCatId) {
                    try {
                        const thirdRes = await getData(`/api/v1/category/${thirdSubCatId}`);
                        if (thirdRes && thirdRes.data) setCategoryName(thirdRes.data.name || 'Products');
                    } catch (e) {
                        setCategoryName('Products');
                    }
                    const res = await getData(`/api/v1/product/thirdSubCategoryById/${thirdSubCatId}?page=${pageNum}&perPage=${perPage}`);
                    if (res && res.data) {
                        setProducts(res.data);
                        setTotalPageCount(res.totalPage || res.count || 0);
                    }
                    return;
                }

                if (categoryId) {
                    try {
                        const catRes = await getData(`/api/v1/category/${categoryId}`);
                        if (catRes && catRes.data) setCategoryName(catRes.data.name || 'Products');
                    } catch (e) {
                        setCategoryName('Products');
                    }
                } else if (subCatId) {
                    // attempt to fetch subcategory name too
                    try {
                        const subRes = await getData(`/api/v1/category/${subCatId}`);
                        if (subRes && subRes.data) setCategoryName(subRes.data.name || 'Products');
                    } catch (e) {
                        setCategoryName('Products');
                    }
                } else {
                    setCategoryName('Products');
                }
                if (subCatId) {
                    const res = await getData(`/api/v1/product/subCategoryById/${subCatId}?page=${pageNum}&perPage=${perPage}`);
                    if (res && res.data) {
                        setProducts(res.data);
                        setTotalPageCount(res.totalPage || 0);
                    }
                    return;
                }
                if (categoryId) {
                    const res = await getData(`/api/v1/product/category/${categoryId}?page=${pageNum}&perPage=${perPage}`);
                    if (res && res.data) {
                        setProducts(res.data);
                        setTotalPageCount(res.totalPage || 0);
                    }
                    return;
                }

                // default: fetch all products
                const res = await getData(`/api/v1/product?page=${pageNum}&perPage=${perPage}`);
                if (res && res.data) {
                    setProducts(res.data);
                    setTotalPageCount(res.totalPage || 0);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
    // refetch when location.search, pageNum or perPage change
    }, [location.search, pageNum, perPage]);

    // reset page number to 1 when filters/query change
    React.useEffect(() => {
        setPageNum(1);
    }, [location.search]);

    // apply sorting whenever products or sortOption change
    React.useEffect(() => {
        if (!products || !Array.isArray(products)) return;
        let sorted = [...products];
        if (sortOption === 'price-asc') {
            sorted.sort((a,b) => (a.price || 0) - (b.price || 0));
        } else if (sortOption === 'price-desc') {
            sorted.sort((a,b) => (b.price || 0) - (a.price || 0));
        } else if (sortOption === 'rating-desc') {
            sorted.sort((a,b) => (b.rating || b.avgRating || 0) - (a.rating || a.avgRating || 0));
        }
        setProducts(sorted);
    }, [sortOption]);

    return (
        <section className='py-5'>
            <div className="container">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/" className='link transition'>
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/"
                        className='link transition'
                    >
                        {categoryName}
                    </Link>

                </Breadcrumbs>
            </div>
            <div className="bg-white p-3 mt-4">
                <div className='container flex gap-3'>
                    <div className="sidebarWrapper w-[20%] h-full bg-white  ">
                        <SideBar />
                    </div>

                    <div className="rightContent w-[80%] py-3">

                        <div className="w-full bg-[#f1f1f1] p-2 mb-4 rounded-md flex items-center justify-between">
                            <div className="col1 flex items-center itemViewActions">
                                <Button
                                    className={`!text-[#000]  !rounded-full !h-[40px] !w-[40px] !min-w-[40px] ${itemView === "list" && "active"}`}
                                    onClick={() => setItemView("list")}
                                >
                                    <IoMenu className='text-[rgba(0,0,0,0.6)] text-[24px] ' />
                                </Button>

                                <Button
                                    className={`!text-[#000]  !rounded-full !h-[40px] !w-[40px] !min-w-[40px] ${itemView === "grid" && "active"}`}
                                    onClick={() => setItemView("grid")}
                                >
                                    <IoGrid className='text-[rgba(0,0,0,0.6)] text-[18px] ' />
                                </Button>

                                <span className='text-[rgba(0,0,0,0.6)] text-[14px] ml-4'>Showing {products.length} results</span>
                            </div>

                            <div className="col1 flex items-center">
                                <span className='font-[500] text-[14px] mr-4'>Sort By  </span>
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    className='!text-[12px] !text-[#000] !border-2 !border-[#000]  !bg-white !capitalize p-2 rounded'
                                >
                                    <option value='default'>Default Sorting</option>
                                    <option value='price-asc'>Price: low to high</option>
                                    <option value='price-desc'>Price: high to low</option>
                                    <option value='rating-desc'>Rating: high to low</option>
                                </select>
                            </div>
                        </div>

                        <div className={`grid ${itemView === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" : "grid-cols-1 gap-4"} `}>
                            {itemView === "grid" ? (
                                <>
                                    {(products || []).map((p) => (
                                        <ProductsItem key={p._id} {...p} />
                                    ))}
                                </>
                            ) : (
                                <>
                                    {(products || []).map((p) => (
                                        <ProductsItemList key={p._id} product={p} onAddToCart={(id) => {
                                            // forward to existing ProductsItem add-to-cart flow via window event or central handler
                                            // simplest: call the API directly here to add
                                            import('../../utils/api').then(mod => {
                                                mod.postData('/api/v1/cart/add', { productId: id }).then(res => {
                                                    // optional: toast available via global context in callers
                                                    console.log('added', res)
                                                }).catch(err => console.error(err))
                                            })
                                        }} />
                                    ))}
                                </>
                            )}
                           
                        </div>
                        <div className="pagination flex items-center justify-center mt-10">
                            {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
                            <Pagination count={Math.max(1, totalPageCount || 1)} page={pageNum} onChange={(e, v) => setPageNum(v)} showFirstButton showLastButton />
                        </div>

                    </div>
                </div>
            </div>

        </section>
    )
}

export default ProductListing