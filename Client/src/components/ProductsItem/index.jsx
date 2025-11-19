import React, { useContext, useState, useEffect } from "react";
import "../ProductsItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { PiShoppingCartLight } from "react-icons/pi";
import { Button } from "@mui/material";
import { MdZoomOutMap } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoMdGitCompare } from "react-icons/io";
import { MyContext } from "../../App";
import { postData, deleteData, getData } from "../../utils/api";

const ProductsItem = (props) => {
    const context = useContext(MyContext);

    const [adding, setAdding] = useState(false);
    const [notifying, setNotifying] = useState(false);
    const [notifyRequested, setNotifyRequested] = useState(false);

    // resolve product id once so UI can react
    const productId = props?.id || props?._id || props?.productId || props?.product?.id || props?.product?._id;
    const hasProductId = Boolean(productId);

    // normalize product object (support both <ProductsItem {...product} /> and <ProductsItem product={product} />)
    const product = props.product || props;
    const image = Array.isArray(product.image) ? product.image[0] : product.image;
    const hoverImage = (Array.isArray(product.image) && product.image[1]) ? product.image[1] : image;
    const title = product.name || product.title || props.title || 'Product Title';
    const brand = product.brand || props.brand || 'Brand Name';
    const price = product.price ?? props.price ?? 0;
    const oldPrice = product.oldPrice ?? props.oldPrice ?? null;
    const rating = product.rating ?? 0;

    const handleAddToCart = async () => {
        if (!context?.isLoggedIn) {
            context?.alertBox('error', 'Please login to add items to cart');
            return;
        }

        if (!hasProductId) {
            // don't spam alerts; just noop or optionally show a subtle message
            context?.alertBox('error', 'Product is not available right now');
            return;
        }

        try {
            setAdding(true);
            const res = await postData('/api/v1/cart/add', { productId });
            if (res && res.success) {
                context?.alertBox('success', res.message || 'Added to cart');
                // optionally open cart panel
                if (typeof context?.setOpenCardPanel === 'function') {
                    context.setOpenCardPanel(true);
                }
            } else {
                context?.alertBox('error', res?.message || 'Could not add to cart');
            }
        } catch (err) {
            console.error('Add to cart error', err);
            context?.alertBox('error', err?.message || 'Something went wrong');
        } finally {
            setAdding(false);
        }

    }

    // add to wishlist handler
    const handleAddToWishlist = async () => {
        if (!context?.isLoggedIn) {
            context?.alertBox('error', 'Please login to add to wishlist');
            return;
        }

        if (!hasProductId) {
            // don't spam alerts; just noop or optionally show a subtle message
            context?.alertBox('error', 'Product is not available right now');
            return;
        }

        try {
            const res = await postData('/api/v1/myList/add', { productId });
            if (res && res.success) {
                context?.alertBox('success', res.message || 'Added to wishlist');
                if (typeof context?.fetchMyList === 'function') context.fetchMyList();
            } else {
                context?.alertBox('error', res?.message || 'Could not add to wishlist');
            }
        } catch (err) {
            console.error('Add to wishlist error', err);
            context?.alertBox('error', err?.message || 'Something went wrong');
        }
    }

    // check if user already requested notify for this product
    useEffect(() => {
        let mounted = true;
        const checkNotify = async () => {
            if (!context?.isLoggedIn) return;
            if (!hasProductId) return;
            try {
                const res = await getData(`/api/v1/notify/check?productId=${productId}`);
                if (!mounted) return;
                if (res && res.success && res.data) {
                    setNotifyRequested(true);
                } else {
                    setNotifyRequested(false);
                }
            } catch (err) {
                console.error('Notify check error', err);
            }
        }
        checkNotify();
        return () => { mounted = false; }
    }, [context?.isLoggedIn, productId]);

    const handleNotify = async () => {
        if (!context?.isLoggedIn) {
            context?.alertBox('error', 'Please login to request notification');
            return;
        }
        if (!hasProductId) return;
        try {
            setNotifying(true);
            const res = await postData('/api/v1/notify', { productId });
            if (res && res.success) {
                context?.alertBox('success', 'We will notify you when the product is back in stock');
                setNotifyRequested(true);
                // inform any other UI (ProductDetailsModel) about this request
                try { window.dispatchEvent(new CustomEvent('notify-requested', { detail: { productId } })); } catch (e) { }
            } else {
                context?.alertBox('error', res?.message || 'Could not send request');
            }
        } catch (err) {
            console.error('Notify error', err);
            context?.alertBox('error', 'Something went wrong');
        } finally {
            setNotifying(false);
        }
    }

    const isInMyList = () => {
        const list = context?.myList || [];
        if (!productId) return false;
        const pid = String(productId);
        return list.some(item => {
            const itemPid = item?.productId;
            if (!itemPid) return false;
            if (typeof itemPid === 'string') return itemPid === pid;
            if (typeof itemPid === 'object') {
                if (itemPid._id) return String(itemPid._id) === pid;
                if (typeof itemPid.toString === 'function') return String(itemPid.toString()) === pid;
            }
            return false;
        });
    }

    const handleRemoveFromWishlist = async () => {
        try {
            const list = context?.myList || [];
            const found = list.find(item => (item.productId === productId) || (item._id === productId));
            if (!found) {
                context?.alertBox('error', 'Item not found in wishlist');
                return;
            }
            const res = await deleteData(`/api/v1/myList/remove/${found._id}`);
            if (res && res.success) {
                context?.alertBox('success', res.message || 'Removed from wishlist');
                if (typeof context?.fetchMyList === 'function') context.fetchMyList();
            } else {
                context?.alertBox('error', res?.message || 'Could not remove from wishlist');
            }
        } catch (err) {
            console.error('Remove from wishlist error', err);
            context?.alertBox('error', err?.message || 'Something went wrong');
        }
    }

    return (
        <div className="produtcsItem shadow-lg  border-1 border-[rgba(0,0,0,0.1)] rounded-md relative">
            <div className="group imgWrapper w-[100%] rounded-md overflow-hidden relative">
                <Link to={`/productDetails/${props?.id || props?._id || props?.productId || props?.product?._id || ''}`}>
                    <div className="img h-[200px] overflow-hidden ">
                        <img src={image || '/assets/images/product/p1.png'} alt={title} className="w-full object-cover" />
                        {hoverImage && hoverImage !== image && (
                            <img src={hoverImage} alt={`${title} hover`} className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                        )}
                    </div>
                </Link>
                <span className="absolute top-2 left-2 text-[12px] font-[500] bg-[#ff5252] text-white px-2 py-1 rounded-xl z-10">
                    {props?.discount ? props.discount : 10}% off
                </span>

                <div className="actions absolute top-[-200px] right-[5px] flex items-center gap-2 z-50 flex-col w-[50px] transition-all duration-300 ease-in-out group-hover:top-[14px] opacity-0 group-hover:opacity-100">
                    <Button
                        className="!bg-white !text-[#000] hover:!bg-[#ff5252] hover:!text-white !rounded-full !h-[35px] !w-[35px] !min-w-[35px] group"
                        onClick={() => {
                            if (typeof context?.setCurrentProduct === 'function') context.setCurrentProduct(props);
                            context.setOpenProductDetailModel(true);
                        }}
                    >
                        <MdZoomOutMap className="text-[500] font-[18px]" />
                    </Button>

                    <Button className="!bg-white !text-[#000] hover:!bg-[#ff5252] hover:!text-white !rounded-full !h-[35px] !w-[35px] !min-w-[35px] group">
                        <IoMdGitCompare className="text-[500] font-[18px]  " />
                    </Button>

                    {isInMyList() ? (
                        <Button onClick={handleRemoveFromWishlist} className="!bg-white !text-[#ff5252] hover:!bg-[#ff5252] !rounded-full !h-[35px] !w-[35px] !min-w-[35px] group">
                            <FaHeart className="text-[#ff5252] font-[18px]" />
                        </Button>
                    ) : (
                        <Button onClick={handleAddToWishlist} className="!bg-white !text-[#000] hover:!bg-[#ff5252] hover:!text-white !rounded-full !h-[35px] !w-[35px] !min-w-[35px] group">
                            <FaRegHeart className="text-[500] font-[18px]" />
                        </Button>
                    )}
                </div>
            </div>

            <div className="info p-3 py-5 ">
                <h6 className="text-[13px] !font-[400]">
                    <Link to={`/productDetails/${productId}`} className="link transition-all ">
                        {brand}
                    </Link>
                </h6>
                <h3 className="text-[14px] title mt-1 mb-1 font-[500] text-[rgba(0,0,0,0.8)]">
                    <Link to={`/productDetails/${productId}`} className="link transition-all ">
                        {title}
                    </Link>
                </h3>

                <Rating name="size-small" value={rating} size="small" readOnly />

                <div className="flex items-center gap-4">
                    <p className="text-[14px] font-[500] text-[rgba(0,0,0,0.8)]">
                        {oldPrice ? (<span className="text-[rgba(0,0,0,0.5)] line-through">₹{oldPrice}</span>) : null}
                        <span className="text-[#ff5252] font-[600]  ml-2">₹{price}</span>
                    </p>
                    {/* <p className='text-[12px] font-[500] text-[#ff5252] bg-[#ffe3e3] px-2 py-1 rounded-md'>
                        20% off
                    </p> */}
                </div>

                <div className="btns flex items-center gap-2 mt-4">
                    { (product?.countInStock ?? 0) > 0 ? (
                        <Button
                            disabled={adding || !hasProductId}
                            onClick={handleAddToCart}
                            className="!bg-white !text-[#ff5252] hover:!bg-[#ff5252] hover:!text-white w-full !text-[13px] !font-semibold pr-2"
                        >
                            <PiShoppingCartLight size={20} className="mr-2" /> {hasProductId ? (adding ? 'Adding...' : 'Add to Cart') : 'Unavailable'}
                        </Button>
                    ) : (
                        <Button
                            disabled={notifying || notifyRequested || !hasProductId}
                            onClick={handleNotify}
                            className="!bg-yellow-400 !text-black w-full !text-[13px] !font-semibold pr-2"
                        >
                            {notifying ? 'Requesting...' : (notifyRequested ? 'Requested' : 'Notify Me')}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsItem;
