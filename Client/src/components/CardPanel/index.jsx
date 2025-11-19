import { Button } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { getData, deleteDataWithBody } from "../../utils/api";
import { MyContext } from "../../App";

const CardPanel = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(MyContext);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const res = await getData('/api/v1/cart');
            if (res && res.data) setItems(res.data);
            else setItems([]);
        } catch (err) {
            console.error('Error fetching cart for panel', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCart();
    }, []);

    const handleRemove = async (cartId, productId) => {
        try {
            const res = await deleteDataWithBody('/api/v1/cart/remove', { _id: cartId, productId });
            if (res && res.success) {
                context?.alertBox('success', res.message || 'Removed from cart');
                fetchCart();
            } else {
                context?.alertBox('error', res?.message || 'Could not remove item');
            }
        } catch (err) {
            console.error('Error removing cart item', err);
            context?.alertBox('error', 'Something went wrong');
        }
    }

    const subtotal = items.reduce((acc, it) => {
        const price = it?.productId?.price ?? 0;
        const qty = it?.quantity ?? 1;
        return acc + price * qty;
    }, 0);

    return (
        <>
            <div className="scroll w-full max-h-[450px] overflow-x-hidden overflow-y-scroll py-1 px-4">
                {loading && <p className="p-4">Loading...</p>}
                {!loading && items.length === 0 && <p className="p-4">Your cart is empty</p>}

                {!loading && items.map((c) => {
                    const prod = c.productId || {};
                    const img = (prod.image && prod.image[0]) || prod.image || 'https://serviceapi.spicezgold.com/download/1742439426968_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-2-202403231855.jpg';
                    return (
                        <div key={c._id} className="cardItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] py-4">
                            <div className="img w-[25%] overflow-hidden h-[85px] rounded-md">
                                <Link to={`/productDetails/${prod._id || prod.id || ''}`} className="group block">
                                    <img src={img} alt={prod.name || ''} className="w-full group-hover:scale-105 duration-150 transition-all ease-in-out" />
                                </Link>
                            </div>
                            <div className="info w-[75%] pr-5 relative">
                                <h4 className="text-[14px] font-[500] text-[#000]">
                                    <Link to={`/productDetails/${prod._id || prod.id || ''}`} className="link">
                                        {prod.name || 'Product'}
                                    </Link>
                                </h4>
                                <p className="flex items-center gap-5 mt-2 mb-2">
                                    <span>
                                        Qty : <span>{c.quantity}</span>
                                    </span>
                                    <span className="font-bold text-primary text-[16px]">₹ { (prod.price ?? 0) * (c.quantity ?? 1) }</span>
                                </p>
                                <MdDeleteOutline onClick={() => handleRemove(c._id, prod._id || prod.id)} className="link text-[20px] text-[#000] cursor-pointer absolute top-0 right-0 transition-all" />
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

                <div className="bottomInfo w-full flex items-center justify-between px-4 py-3 border-t border-[rgba(0,0,0,0.1)]">
                    <div className="flex items-center justify-between w-full">
                        <span className="text-[14px] font-[600]">Total (tax excl.)</span>
                        <span className="font-bold text-primary text-[16px]">₹ {subtotal}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-5 w-full px-4 py-3 ">
                    <Link to="/checkout" className="w-[50%] d-block ">
                        <Button className="!bg-primary !text-[15px] !font-[500] !text-[#fff] !py-2 !rounded-md hover:!bg-[#ff5252] hover:!text-[#000] !transition-all !duration-150 w-full">
                            Check Out
                        </Button>
                    </Link>
                    <Link to="/cart" className="w-[50%] d-block ">
                        <Button className="!bg-[#f1f1f1] !text-[15px] !font-[500] !text-primary !py-2 !rounded-md hover:!bg-[#ff5252] hover:!text-white !transition-all !duration-150 w-full ">
                            View Cart
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default CardPanel;
