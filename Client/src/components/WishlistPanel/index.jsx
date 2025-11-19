import { Button } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { IoMdClose } from 'react-icons/io';
import { Link } from "react-router-dom";
import { getData, deleteData } from "../../utils/api";
import { MyContext } from "../../App";

const WishlistPanel = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(MyContext);

    const fetchList = async () => {
        try {
            const res = await getData('/api/v1/myList');
            if (res && res.data) setItems(res.data);
            else setItems([]);
            console.log("Wishlist items:", res.data);
        } catch (err) {
            console.error('Error fetching wishlist for panel', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // re-fetch when panel opens
        if (context?.openCardPanel2) fetchList();
        console.log("Wishlist panel open state:", context?.openCardPanel2); 
    }, [context?.openCardPanel2]);

    const handleRemove = async (id) => {
        try {
            const res = await deleteData(`/api/v1/myList/remove/${id}`);
            if (res && res.success) {
                context?.alertBox('success', res.message || 'Removed from wishlist');
                fetchList();
                if (typeof context.fetchWishlistCount === 'function') context.fetchWishlistCount();
            } else {
                context?.alertBox('error', res?.message || 'Could not remove item');
            }
        } catch (err) {
            console.error('Error removing wishlist item', err);
            context?.alertBox('error', 'Something went wrong');
        }
    }

    const subtotal = items.reduce((acc, it) => {
        const price = it?.price ?? 0;
        return acc + price;
    }, 0);

    return (
        <>
            <div className="scroll w-full max-h-[450px] overflow-x-hidden overflow-y-scroll py-1 px-4">
                {loading && <p className="p-4">Loading...</p>}
                {!loading && items.length === 0 && <p className="p-4">Your wishlist is empty</p>}

                {!loading && items.map((c) => {
                    const img = (Array.isArray(c.image) && c.image[0]) || c.image || 'https://serviceapi.spicezgold.com/download/1742439426968_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-2-202403231855.jpg';
                    return (
                        <div key={c._id} className="cardItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] py-4">
                            <div className="img w-[25%] overflow-hidden h-[85px] rounded-md">
                                <Link to={`/productDetails/${c.productId || ''}`} className="group block">
                                    <img src={img} alt={c.productTitle || ''} className="w-full group-hover:scale-105 duration-150 transition-all ease-in-out" />
                                </Link>
                            </div>
                            <div className="info w-[75%] pr-5 relative">
                                <h4 className="text-[14px] font-[500] text-[#000]">
                                    <Link to={`/productDetails/${c.productId || ''}`} className="link">
                                        {c.productTitle || 'Product'}
                                    </Link>
                                </h4>
                                <p className="flex items-center gap-5 mt-2 mb-2">
                                    <span className="font-bold text-primary text-[16px]">₹ { (c.price ?? 0) }</span>
                                </p>
                                <IoMdClose onClick={() => handleRemove(c._id)} className="link text-[20px] text-[#000] cursor-pointer absolute top-0 right-0 transition-all" />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="bottomSec absolute bottom-5 left-3 w-full pr-5">
                <div className="bottomInfo w-full flex items-center justify-between px-4 py-3 border-t border-[rgba(0,0,0,0.1)]">
                    <div className="flex items-center justify-between w-full">
                        <span className="text-[14px] font-[600]">{items.length} item</span>
                        <span className="font-bold text-primary text-[16px]">₹ {subtotal}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-5 w-full px-4 py-3 ">
                    <Link to="/my-list" className="w-[50%] d-block ">
                        <Button className="!bg-primary !text-[15px] !font-[500] !text-[#fff] !py-2 !rounded-md hover:!bg-[#ff5252] hover:!text-[#000] !transition-all !duration-150 w-full">
                            View Wishlist
                        </Button>
                    </Link>
                    <Link to="/" className="w-[50%] d-block ">
                        <Button className="!bg-[#f1f1f1] !text-[15px] !font-[500] !text-primary !py-2 !rounded-md hover:!bg-[#ff5252] hover:!text-white !transition-all !duration-150 w-full ">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default WishlistPanel;
