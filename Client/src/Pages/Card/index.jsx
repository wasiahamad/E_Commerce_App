import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import CartItems from './CartItems';
import { Button } from '@mui/material';
import { BsBagCheck } from "react-icons/bs";
import { getData, putData, deleteDataWithBody, postData } from '../../utils/api';
import { MyContext } from '../../App';



const Card = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);
    const [removingId, setRemovingId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [notes, setNotes] = useState('');

    const context = useContext(MyContext);
    const fetchCartCount = context?.fetchCartCount;
    const alertBox = context?.alertBox;
    const [shippingEstimate, setShippingEstimate] = useState({ shippingCharge: 0, totalAmount: 0 });

    // compute subtotal
    const subtotal = cartItems.reduce((acc, item) => {
        const price = item?.productId?.price ?? 0;
        const qty = item?.quantity ?? 1;
        return acc + price * qty;
    }, 0);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const res = await getData('/api/v1/cart');
            if (res && res.data) {
                setCartItems(res.data);
            } else {
                setCartItems([]);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCart();
    }, []);

    // request shipping estimate whenever subtotal changes
    useEffect(() => {
        let mounted = true;
        const fetchEstimate = async () => {
            try {
                // include items so server can compute weight-based shipping
                const items = cartItems.map(ci => ({ productId: ci.productId?._id || ci.productId, price: ci.productId?.price || 0, quantity: ci.quantity || 1 }));
                const json = await postData('/api/v1/order/estimate', { subtotal, items });
                if (!mounted) return;
                if (json && json.data) setShippingEstimate(json.data);
            } catch (err) {
                console.error('Failed to fetch shipping estimate', err);
            }
        };
        fetchEstimate();
        return () => { mounted = false; };
    }, [subtotal]);

    const handleChangeQty = async (cartId, quantity) => {
        try {
            setUpdatingId(cartId);
            await putData('/api/v1/cart/update-qty', { _id: cartId, quantity });
            // refresh cart
            await fetchCart();
            // refresh header count
            if (typeof fetchCartCount === 'function') fetchCartCount();
            if (typeof alertBox === 'function') alertBox('success', 'Quantity updated');
        } catch (error) {
            console.error('Error updating qty:', error);
            if (typeof alertBox === 'function') alertBox('error', 'Failed to update quantity');
        } finally {
            setUpdatingId(null);
        }
    }

    const handleRemove = async (cartId, productId) => {
        try {
            setRemovingId(cartId);
            await deleteDataWithBody('/api/v1/cart/remove', { _id: cartId, productId });
            await fetchCart();
            if (typeof fetchCartCount === 'function') fetchCartCount();
            if (typeof alertBox === 'function') alertBox('success', 'Item removed from cart');
        } catch (error) {
            console.error('Error removing item:', error);
            if (typeof alertBox === 'function') alertBox('error', 'Failed to remove item');
        } finally {
            setRemovingId(null);
        }
    }

    return (
        <section className="section py-10 pb-10">
            <div className="container w-[80%] max-w-[80%] flex gap-5">

                <div className="leftPart w-[70%]">
                    <div className="shadow-md rounded-md bg-white ">
                        <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                            <h4 className="text-[20px] font-[600] text-[#000]opacity-75">Your Cart</h4>
                            <p className="mt-0">
                                There are <span className="font-bold text-primary">{cartItems.length}</span> items in your cart
                            </p>
                        </div>
                        {loading && <p className="p-4">Loading...</p>}
                        {!loading && cartItems.length === 0 && <p className="p-4">Your cart is empty</p>}
                        {!loading && cartItems.map((c) => (
                            <CartItems
                                key={c._id}
                                _id={c._id}
                                productId={c.productId?._id || c.productId?.id}
                                title={c.productId?.name}
                                price={c.productId?.price}
                                oldPrice={c.productId?.oldPrice}
                                image={Array.isArray(c.productId?.image) ? c.productId.image[0] : c.productId?.image}
                                brand={c.productId?.brand}
                                size={c.productId?.size?.[0]}
                                qty={c.quantity}
                                onChangeQty={handleChangeQty}
                                onRemove={handleRemove}
                                isProcessing={updatingId === c._id || removingId === c._id}
                            />
                        ))}
                    </div>
                </div>

                <div className="rightPart w-[30%]">
                    <div className="shadow-md rounded-md bg-white p-5 ">
                        <div className="pb-3 border-b border-[rgba(0,0,0,0.1)]">
                            <h4 className="text-[15px] font-[600] text-[#000]">
                                Order Summary
                            </h4>
                        </div>

                        <div>
                            {/* Order model fields: subTotalAmount, shippingCharge, totalAmount */}
                            <p className="flex items-center justify-between">
                                <span className="text-[14px] font-[500] text-[rgba(0,0,0,0.8)]">Subtotal</span>
                                <span className="text-[14px] font-bold text-[#ff5252]">₹{subtotal.toFixed(2)}</span>
                            </p>

                            {/* simple shipping rule: free over ₹500, otherwise ₹50 */}
                            {/** compute shippingCharge and totalAmount **/}
                            {(() => {
                                const shippingCharge = shippingEstimate?.shippingCharge ?? (subtotal > 500 ? 0 : (subtotal === 0 ? 0 : 50));
                                const totalAmount = shippingEstimate?.totalAmount ?? (subtotal + (shippingCharge || 0));
                                return (
                                    <>
                                        <p className="flex items-center justify-between mt-2">
                                            <span className="text-[14px] font-[500] text-[rgba(0,0,0,0.8)]">Shipping</span>
                                            <span className="text-[14px] font-bold">{shippingCharge === 0 ? 'Free' : `₹${shippingCharge.toFixed(2)}`}</span>
                                        </p>

                                        <p className="flex items-center justify-between mt-2">
                                            <span className="text-[14px] font-[500] text-[rgba(0,0,0,0.8)]">Estimate for</span>
                                            <span className="text-[14px] font-bold ">India</span>
                                        </p>

                                        <p className="flex items-center justify-between mt-3">
                                            <span className="text-[14px] font-[500] text-[rgba(0,0,0,0.8)]">Total</span>
                                            <span className="text-[16px] font-bold text-[#ff5252]">₹{totalAmount.toFixed(2)}</span>
                                        </p>

                                        {/* Payment method and notes — stored locally and passed to checkout via Link state */}
                                        <div className="mt-4">
                                            <label className="text-[13px] font-[600]">Payment</label>
                                            <select
                                                value={paymentMethod}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="w-full mt-2 p-2 border rounded-md"
                                            >
                                                <option value="cod">Cash on Delivery</option>
                                                <option value="online">Online Payment</option>
                                            </select>
                                        </div>

                                        <div className="mt-3">
                                            <label className="text-[13px] font-[600]">Order Notes (optional)</label>
                                            <textarea
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                className="w-full mt-2 p-2 border rounded-md h-20"
                                                placeholder="Add delivery instructions or notes"
                                            />
                                        </div>

                                        <div className="pt-5">
                                            <Link to="/checkout" state={{ subTotalAmount: subtotal, shippingCharge, totalAmount, paymentMethod, notes }}>
                                                <Button className='!text-[14px] !bg-[#ff5252] !font-[600] !text-[#fff] !py-3 hover:!bg-[#000] hover:!text-[#ff5252] !transition-all !duration-150 w-full'>
                                                    <BsBagCheck className='mr-2 text-[20px]' /> Check Out
                                                </Button>
                                            </Link>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Card