import { Button, Select, MenuItem } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { MyContext } from "../../App";
import { getData, putData, deleteData, postData } from "../../utils/api";

const STATUS_OPTIONS = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const Orders = () => {
    const [isOpenOrderedProducts, setIsOpenOrderedProducts] = useState(null);
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const isShowOrderedProducts = (idx) => {
        if (isOpenOrderedProducts === idx) {
            return setIsOpenOrderedProducts(null);
        }
        setIsOpenOrderedProducts(idx);
        // lazy load shipping details for this order
        fetchShippingDetailsForIndex(idx);
    };

    const fetchShippingDetailsForIndex = async (idx) => {
        const order = orders[idx];
        if (!order) return;
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

    const handleChange = async (orderId, value, idx) => {
        // optimistic UI update
        const old = [...orders];
        const updated = orders.map((o) => (o._id === orderId ? { ...o, status: value } : o));
        setOrders(updated);
        try {
            await putData(`/api/v1/order/${orderId}/status`, { status: value });
            // on success nothing more
        } catch (err) {
            console.error(err);
            setOrders(old);
            alert("Failed to update status");
        }
    };

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await getData(`/api/v1/order?page=${page}&perPage=${perPage}`);
            const fetched = res.data || res;
            setOrders(fetched);
            // fetch shipping estimates for orders missing shippingCharge
            fetchMissingShippingCharges(fetched);
            setTotal(res.total || 0);
        } catch (err) {
            console.error("fetchOrders", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [page, perPage]);

    // fetch shipping estimates for orders that don't have shippingCharge stored
    const fetchMissingShippingCharges = async (ordersList = []) => {
        if (!Array.isArray(ordersList)) return;
        ordersList.forEach(async (o) => {
            try {
                if (o.shippingCharge !== undefined && o.shippingCharge !== null) return;
                // build items and subtotal fallback
                const items = Array.isArray(o.items) ? o.items : [];
                const subtotal = Number(o.subTotalAmount ?? items.reduce((s, it) => s + (Number(it.price || 0) * Number(it.quantity || 1)), 0));
                const address = o.delivery_address || null;
                const json = await postData('/api/v1/order/estimate', { subtotal, items, address });
                if (json && json.data) {
                    setOrders(prev => prev.map(p => p._id === o._id ? { ...p, shippingCharge: json.data.shippingCharge, totalAmount: json.data.totalAmount ?? p.totalAmount } : p));
                }
            } catch (err) {
                console.error('Failed to fetch shipping for order', o._id, err);
            }
        });
    };

    const context = useContext(MyContext);

    return (
        <div
            className={`contentRight py-4 px-7 ${context.isSidebarOpen ? "w-[80%]" : "w-[100%]"
                } transition-all duration-300`}
        >
            <div className="card my-3 shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center justify-between py-4 px-5">
                    <h2 className="text-[20px] font-semibold">Recent Orders</h2>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border border-[rgba(0,0,0,0.1)] p-2 rounded-md w-[50%] outline-none "
                    />
                </div>
                        <div className="relative overflow-x-auto mt-5 pb-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-[13px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th></th>
                                <th scope="col" class="px-4 py-3 whitespace-nowrap">
                                    Order Id
                                </th>
                                <th scope="col" class="px-4 py-3 whitespace-nowrap">
                                    Paymant Id
                                </th>
                                <th scope="col" class="px-4 py-3 whitespace-nowrap">
                                    Name
                                </th>
                                <th scope="col" class="px-4 py-3 whitespace-nowrap">
                                    Phone Number
                                </th>
                                <th scope="col" class="px-4 py-3 whitespace-nowrap">
                                    Address
                                </th>
                                <th scope="col" class="px-4 py-3 whitespace-nowrap">
                                    Pincode
                                </th>
                                <th scope="col" class="px-4 py-3 whitespace-nowrap">
                                    Total Amount
                                </th>
                                <th scope="col" class="px-4 py-3 whitespace-nowrap">
                                    Shipping
                                </th>
                                <th scope="col" class="px-4 py-3 whitespace-nowrap">
                                    Email
                                </th>
                                <th scope="col" class="px-4 py-3 whitespace-nowrap">
                                    User Id
                                </th>
                                <th scope="col" class="px-4 py-3 whitespace-nowrap">
                                    Order Status
                                </th>
                                <th scope="col" class="px-4 py-3 whitespace-nowrap">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-[13px]">
                            {loading ? (
                                <tr>
                                    <td colSpan={12} className="text-center py-6">Loading...</td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan={12} className="text-center py-6">No orders found</td>
                                </tr>
                            ) : (
                                orders.map((o, idx) => (
                                    <React.Fragment key={o._id}>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <td className="px-4 py-4">
                                                <Button className="!min-w-[35px] !w-[35px] !h-[35px] !text-[rgba(0,0,0,0.5)] !rounded-full !bg-[#f1f1f1] " onClick={() => isShowOrderedProducts(idx)}>
                                                    {isOpenOrderedProducts === idx ? <FaAngleUp className="text-[18px] " /> : <FaAngleDown className="text-[18px] " />}
                                                </Button>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap"><span className="text-[#3872fa]">{o.orderId}</span></td>
                                            <td className="px-4 py-4 whitespace-nowrap"><span className="text-[#3872fa]">{o.paymentMethod || o.paymentId || 'CASH ON DELIVERY'}</span></td>
                                            <td className="px-4 py-4 whitespace-nowrap">{o.userId?.name || o.userId?.email}</td>
                                            <td className="px-4 py-4 whitespace-nowrap">{o.userId?.mobile}</td>
                                            <td className="px-4 py-4"><span className="block w-[400px]">{o.delivery_address?.address_line || o.delivery_address?.address || ''}</span></td>
                                            <td className="px-4 py-4 whitespace-nowrap">{o.delivery_address?.pincode || o.delivery_address?.pincode || ''}</td>
                                            <td className="px-4 py-4 whitespace-nowrap">{o.totalAmount}</td>
                                            <td className="px-4 py-4 whitespace-nowrap">{typeof o.shippingCharge === 'number' ? (o.shippingCharge === 0 ? 'Free' : `₹ ${Number(o.shippingCharge).toFixed(2)}`) : '—'}</td>
                                            <td className="px-4 py-4 whitespace-nowrap">{o.userId?.email}</td>
                                            <td className="px-4 py-4 whitespace-nowrap"><span className="text-[#3872fa]">{o.userId?._id}</span></td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <Select id={`status-${o._id}`} value={o.status} size="small" onChange={(e) => handleChange(o._id, e.target.value, idx)}>
                                                    {STATUS_OPTIONS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                                                </Select>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">{new Date(o.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                        {isOpenOrderedProducts === idx && (
                                            <tr>
                                                <td className="pl-7" colSpan="6">
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
                                                            <tbody>
                                                                {o.items.map(it => (
                                                                    <tr key={it.productId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                                        <td className="px-4 py-4 whitespace-nowrap">{it.productId}</td>
                                                                        <td className="px-4 py-4 whitespace-nowrap">{it.title}</td>
                                                                        <td className="px-4 py-4 whitespace-nowrap"><img src={it.image} className="w-[40px] h-[40px] object-cover" alt="" /></td>
                                                                        <td className="px-4 py-4 whitespace-nowrap">{it.quantity}</td>
                                                                        <td className="px-4 py-4">{it.price}</td>
                                                                        <td className="px-4 py-4 whitespace-nowrap">{it.subTotal}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
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
                                                                    <div className="pt-3">
                                                                        <Button variant="outlined" onClick={() => downloadJson(o._shippingDetails, `shipping-${o.orderId}.json`)}>Download shipping details</Button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                    </div>
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
    );
};

export default Orders;
