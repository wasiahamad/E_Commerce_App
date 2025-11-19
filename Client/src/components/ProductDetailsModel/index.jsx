import React, { useState } from "react";
import QtyBox from "../QtyBox";
import { Button, Rating } from "@mui/material";
import { IoGitCompare } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCartLight } from "react-icons/pi";
import { postData } from '../../utils/api';
import { useContext } from 'react';
import { MyContext } from '../../App';
import { Link } from "react-router-dom";
import { useEffect } from "react";

const ProductDetailsModel = ({ product }) => {
    const context = useContext(MyContext);
    const [size, setSize] = useState(product?.size?.[0] || null);
    const [ram, setRam] = useState(product?.productRam?.[0] || null);
    const [weight, setWeight] = useState(product?.productWeight?.[0] || null);
    const [qty, setQty] = useState(1);
    const [adding, setAdding] = useState(false);
    const [notifyRequested, setNotifyRequested] = useState(false);
    const [notifying, setNotifying] = useState(false);

    // listen for global event dispatched from ProductDetails page to set requested state
    useEffect(() => {
        const handler = (e) => {
            if (e?.detail?.productId === product?._id) {
                setNotifyRequested(true);
            }
        };
        window.addEventListener('notify-requested', handler);
        return () => window.removeEventListener('notify-requested', handler);
    }, [product]);

    const handleAdd = async () => {
        if (!context?.isLoggedIn) {
            context?.alertBox('error', 'Please login to add to cart');
            return;
        }
        if (!product?._id) {
            context?.alertBox('error', 'Product not available');
            return;
        }
        try {
            setAdding(true);
            const res = await postData('/api/v1/cart/add', { productId: product._id });
            if (res && res.success) {
                context?.alertBox('success', res.message || 'Added to cart');
                if (typeof context?.setOpenCardPanel === 'function') context.setOpenCardPanel(true);
            } else {
                context?.alertBox('error', res?.message || 'Could not add to cart');
            }
        } catch (err) {
            console.error(err);
            context?.alertBox('error', 'Something went wrong');
        } finally {
            setAdding(false);
        }
    }

    const handleNotify = async () => {
        if (!context?.isLoggedIn) {
            context?.alertBox('error', 'Please login to request notification');
            return;
        }
        if (!product?._id) return;
        try {
            setNotifying(true);
            const res = await postData('/api/v1/notify', { productId: product._id });
            if (res && res.success) {
                context?.alertBox('success', 'We will notify you when the product is back in stock');
                setNotifyRequested(true);
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

    // add wishlist handler
    const handleAddToWishlist = async () => {    
        if (!context?.isLoggedIn) {
            context?.alertBox('error', 'Please login to add to wishlist');
            return;
        }
        if (!product?._id) {
            context?.alertBox('error', 'Product not available');
            return;
        }
        try {
            const res = await postData('/api/v1/myList/add', { productId: product._id });
            if (res && res.success) {
                context?.alertBox('success', res.message || 'Added to wishlist');
            } else {
                context?.alertBox('error', res?.message || 'Could not add to wishlist');
            }
        } catch (err) {
            console.error(err);
            context?.alertBox('error', 'Something went wrong');
        }

    }



    // if product changes, reset size/ram/weight/qty defaults
    useEffect(() => {
        setQty(1);
        setSize(product?.size?.[0] || null);
        setRam(product?.productRam?.[0] || null);
        setWeight(product?.productWeight?.[0] || null);
    }, [product]);

    return (
        <>
            <h1 className="text-[25px] font-[600] mb-2">
                {product?.name || 'Product Title'}
            </h1>

            <div className="flex gap-3 items-center">
                <span className="text-[13px] font-[400] text-[#8a8a8a]">
                    Brands :
                    <span className="text-[13px] font-[500] text-[#000]"> {product?.brand || ''}</span>
                </span>

                <Rating name="size-small" value={product?.rating || 0} size="small" readOnly />
                <span className="text-[13px] font-[500] text-[#262424] cursor-pointer">
                    Review({product?.reviewsCount || 0})
                </span>
            </div>
            <div className="flex gap-3 items-center mt-4">
                <span className="text-[16px] font-[500] text-[#8a8a8a] line-through">
                    ₹ {product?.oldPrice ?? ''}
                </span>
                <span className="text-[20px] font-[600] text-[#ff3d00]">₹ {product?.price ?? ''}</span>

                <span className="text-[15px] font-[400] text-[#262424]">
                    Available In Stock :{" "}
                    <span className="text-[green] font-[600] text-[16px]">
                        {product?.countInStock ?? '0'} Items
                    </span>
                </span>
            </div>

            <br />
            <p className="mt-4 pr-10 text-[#262424]">
                {product?.description || 'No description available.'}
            </p>

            {product?.size && product.size.length > 0 && (
                <div className="flex items-center gap-3 mt-4 mb-4">
                    <span className="text-[16px] font-[400] text-[#262424]">Size : </span>
                    <div className="flex items-center gap-2 actions ">
                        {product.size.map((s) => (
                            <Button
                                key={s}
                                className={`${size === s ? "!bg-primary !text-white" : "!text-black"}`}
                                onClick={() => setSize(s)}
                            >
                                {s}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {product?.productRam && product.productRam.length > 0 && (
                <div className="flex items-center gap-3 mt-4 mb-4">
                    <span className="text-[16px] font-[400] text-[#262424]">RAM : </span>
                    <div className="flex items-center gap-2 actions ">
                        {product.productRam.map((r) => (
                            <Button
                                key={r}
                                className={`${ram === r ? "!bg-primary !text-white" : "!text-black"}`}
                                onClick={() => setRam(r)}
                            >
                                {r}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {product?.productWeight && product.productWeight.length > 0 && (
                <div className="flex items-center gap-3 mt-4 mb-4">
                    <span className="text-[16px] font-[400] text-[#262424]">Weight : </span>
                    <div className="flex items-center gap-2 actions ">
                        {product.productWeight.map((w) => (
                            <Button
                                key={w}
                                className={`${weight === w ? "!bg-primary !text-white" : "!text-black"}`}
                                onClick={() => setWeight(w)}
                            >
                                {w}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            <p>Free Shipping (Est. Delivery Time 2-3 Days)</p>

            <div className="flex items-center gap-4 mt-4">
                <div className="qtyWrapper w-[70px]">
                    <QtyBox value={qty} onChange={setQty} />
                </div>
                { (product?.countInStock ?? 0) > 0 ? (
                    <Button className="btn-org !h-[40px]" onClick={handleAdd} disabled={adding || !product?._id}>
                        <PiShoppingCartLight size={20} className="mr-2" /> {adding ? 'Adding...' : 'Add To Cart'}
                    </Button>
                ) : (
                    <Button className="btn-org !h-[40px] bg-yellow-500 text-black" onClick={handleNotify} disabled={notifying || notifyRequested}>
                        {notifying ? 'Requesting...' : (notifyRequested ? 'Requested' : 'Notify Me')}
                    </Button>
                )}
            </div>

            <div className="flex items-center gap-4 mt-6">
                <Button onClick={handleAddToWishlist} className="flex items-center gap-2 cursor-pointer text-[15px] font-[500] opacity-75 link ">
                    <FaRegHeart size={18} />
                    Add to wishlist
                </Button>
                <span className="flex items-center gap-2 cursor-pointer text-[15px] font-[500] ml-4 opacity-75 link ">
                    <IoGitCompare size={18} />
                    Add to compare
                </span>
            </div>
        </>
    );
};

export default ProductDetailsModel;
