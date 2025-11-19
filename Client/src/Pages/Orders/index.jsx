import React, { useEffect, useState } from 'react';
import AccountSideBar from '../../components/AccountSideBar';
import { Button } from '@mui/material';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import Badge from '../../components/Badge';
import { getOrders, putData, postData } from '../../utils/api';
import toast from 'react-hot-toast';

const Orders = () => {
    const [isOpenOrderedProducts, setIsOpenOrderedProducts] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const userId = localStorage.getItem('userId') || null;
                const res = await getOrders(1, 100, userId);
                setOrders(res?.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const toggleProducts = (idx) => {
        setIsOpenOrderedProducts(prev => (prev === idx ? null : idx));
        // if expanding, fetch shipping details for that order lazily
        if (isOpenOrderedProducts !== idx) fetchShippingDetailsForIndex(idx);
    };

    const fetchShippingDetailsForIndex = async (idx) => {
        const order = orders[idx];
        if (!order) return;
        // skip if already fetched
        if (order._shippingDetails) return;
        try {
            const items = Array.isArray(order.items) ? order.items.map(i => ({ productId: i.productId, price: i.price, quantity: i.quantity })) : [];
            const address = order.delivery_address || null;
            const json = await postData('/api/v1/order/estimate', { subtotal: order.subTotalAmount, items, address });
            if (json && json.data) {
                setOrders(prev => prev.map((o, i) => i === idx ? { ...o, _shippingDetails: json.data } : o));
            }
        } catch (err) {
            console.error('Failed to fetch shipping details for order', order._id, err);
        }
    };

    const downloadJson = (data, fileName = 'shipping-details.json') => {
        try {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Download failed', err);
        }
    };

    const handleCancel = async (orderId) => {
        try {
            const res = await putData(`/api/v1/order/${orderId}/status`, { status: 'cancelled' });
            if (res && !res.error) {
                toast.success('Order cancelled');
                const userId = localStorage.getItem('userId') || null;
                const fresh = await getOrders(1, 100, userId);
                setOrders(fresh?.data || []);
            } else {
                toast.error(res?.message || 'Failed to cancel order');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to cancel order');
        }
    };

    const handleReorder = async (order) => {
        try {
            const payload = {
                items: order.items.map(i => ({ productId: i.productId, quantity: i.quantity, price: i.price })),
                delivery_address: order.delivery_address?._id || order.delivery_address || null,
                paymentMethod: 'cod'
            };
            const res = await postData('/api/v1/order', payload);
            if (res && !res.error) {
                toast.success('Order placed again');
            } else {
                toast.error(res?.message || 'Failed to reorder');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to reorder');
        }
    };

    return (
        <section className="py-10 w-full">
            <div className="container flex gap-5">
                <div className="w-[20%]">
                    <AccountSideBar />
                </div>

                <div className="w-[80%]">
                    <div className="shadow-md rounded-md bg-white">
                        <div className=" flex items-center justify-between py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                            <div>
                                <h4 className="text-[18px] font-[600] text-[#000] opacity-75">Your Orders</h4>
                                <p className="mt-0">There are <span className="font-bold text-primary">{orders.length}</span> Orders</p>
                            </div>
                            <div>
                                {/* Order status show here */}
                                {orders.length > 0 && <h2 className="text-[16px] font-[600] text-[rgba(0,0,0,0.6)]"><Badge status={orders[0].status} /></h2>}
                            </div>
                        </div>

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-[13px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th />
                                        <th className="px-4 py-3 whitespace-nowrap">Order Id</th>
                                        <th className="px-4 py-3 whitespace-nowrap">Payment</th>
                                        <th className="px-4 py-3 whitespace-nowrap">Name</th>
                                        <th className="px-4 py-3 whitespace-nowrap">Phone</th>
                                        <th className="px-4 py-3 whitespace-nowrap">Address</th>
                                        <th className="px-4 py-3 whitespace-nowrap">Pincode</th>
                                        <th className="px-4 py-3 whitespace-nowrap">Total</th>
                                        <th className="px-4 py-3 whitespace-nowrap">Email</th>
                                        <th className="px-4 py-3 whitespace-nowrap">User Id</th>
                                        <th className="px-4 py-3 whitespace-nowrap">Status</th>
                                        <th className="px-4 py-3 whitespace-nowrap">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[13px]">
                                    {loading ? (
                                        <tr><td colSpan={12} className="text-center py-6">Loading...</td></tr>
                                    ) : orders.length === 0 ? (
                                        <tr><td colSpan={12} className="text-center py-6">No orders found</td></tr>
                                    ) : (
                                        orders.map((o, idx) => (
                                            <React.Fragment key={o._id}>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                    <td className="px-4 py-4">
                                                        <Button className="!min-w-[35px] !w-[35px] !h-[35px] !text-[rgba(0,0,0,0.5)] !rounded-full !bg-[#f1f1f1]" onClick={() => toggleProducts(idx)}>
                                                            {isOpenOrderedProducts === idx ? <FaAngleUp className="text-[18px]" /> : <FaAngleDown className="text-[18px]" />}
                                                        </Button>
                                                    </td>
                                                    <td className="px-4 py-4 whitespace-nowrap"><span className="text-primary">{o.orderId}</span></td>
                                                    <td className="px-4 py-4 whitespace-nowrap"><span className="text-primary">{o.paymentMethod || o.paymentId || 'CASH ON DELIVERY'}</span></td>
                                                    <td className="px-4 py-4 whitespace-nowrap">{o.userId?.name || o.userId?.email}</td>
                                                    <td className="px-4 py-4 whitespace-nowrap">{o.userId?.mobile}</td>
                                                    <td className="px-4 py-4"><span className="block w-[400px]">{o.delivery_address?.address_line || o.delivery_address?.address || ''}</span></td>
                                                    <td className="px-4 py-4 whitespace-nowrap">{o.delivery_address?.pincode || ''}</td>
                                                    <td className="px-4 py-4 whitespace-nowrap">{o.totalAmount}</td>
                                                    <td className="px-4 py-4 whitespace-nowrap">{o.userId?.email}</td>
                                                    <td className="px-4 py-4 whitespace-nowrap"><span className="text-primary">{o.userId?._id}</span></td>
                                                    <td className="px-4 py-4 whitespace-nowrap"><Badge status={o.status} /></td>
                                                    <td className="px-4 py-4 whitespace-nowrap">{new Date(o.createdAt).toLocaleDateString()}</td>
                                                </tr>

                                                {isOpenOrderedProducts === idx && (
                                                    <tr>
                                                        <td className="pl-7" colSpan={6}>
                                                            <div className="relative overflow-x-auto">
                                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                                    <thead className="text-[13px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                                        <tr>
                                                                            <th className="px-4 py-3">Product Id</th>
                                                                            <th className="px-4 py-3">Product Title</th>
                                                                            <th className="px-4 py-3">Image</th>
                                                                            <th className="px-4 py-3">Quantity</th>
                                                                            <th className="px-4 py-3">Price</th>
                                                                            <th className="px-4 py-3">Sub Total</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className="text-[13px]">
                                                                        {o.items.map(it => (
                                                                            <tr key={it.productId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                                                <td className="px-4 py-4 whitespace-nowrap">{it.productId}</td>
                                                                                <td className="px-4 py-4 whitespace-nowrap">{it.title}</td>
                                                                                <td className="px-4 py-4 whitespace-nowrap"><img src={it.image} alt="" className="w-[40px] h-[40px] object-cover" /></td>
                                                                                <td className="px-4 py-4 whitespace-nowrap">{it.quantity}</td>
                                                                                <td className="px-4 py-4">{it.price}</td>
                                                                                <td className="px-4 py-4 whitespace-nowrap">{it.subTotal}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>

                                                                <div className="p-3 flex gap-2 justify-end">
                                                                    {!(o.status === 'shipped' || o.status === 'delivered') && (
                                                                        <Button variant="outlined" color="error" onClick={() => handleCancel(o._id)}>Cancel Order</Button>
                                                                    )}
                                                                    <Button variant="contained" color="primary" onClick={() => handleReorder(o)}>Reorder</Button>
                                                                    {o._shippingDetails && (
                                                                        <Button variant="outlined" onClick={() => downloadJson(o._shippingDetails, `shipping-${o.orderId}.json`)}>Download shipping details</Button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {/* shipping breakdown */}
                                                            {o._shippingDetails && (
                                                                <div className="p-3 border-t">
                                                                    <h4 className="font-semibold mb-2">Shipping breakdown</h4>
                                                                    <div className="text-sm">
                                                                        <div>Base: ₹{Number(o._shippingDetails.base || 0).toFixed(2)}</div>
                                                                        <div>Weight (kg): {Number(o._shippingDetails.totalWeightKg || 0).toFixed(2)}</div>
                                                                        <div>Weight charge: ₹{Number(o._shippingDetails.weightCharge || 0).toFixed(2)}</div>
                                                                        <div className="font-bold mt-1">Total shipping: ₹{Number(o._shippingDetails.shippingCharge || 0).toFixed(2)}</div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Orders;