import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MyContext } from "../../App";
import { getData, getUsers, getOrders } from "../../utils/api";
import { Button } from "@mui/material";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";


const fallbackAvatar = "https://serviceapi.spicezgold.com/download/1742453278959_fgfg1.jpg";

const formatDate = (d) => {
    if (!d) return "-";
    try {
        const date = new Date(d);
        return date.toLocaleString("en-IN", { hour12: false }) + " IST";
    } catch (err) {
        return d;
    }
};

const UserProfile = () => {
    const { userId } = useParams();
    const context = useContext(MyContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        const loadUser = async () => {
            setLoading(true);
            setError(null);

            // Try a direct GET first (if backend provides it)
            try {
                const res = await getData(`/api/v1/user/${userId}`);

                // Backend shapes vary; try common shapes
                const u = res?.data || res?.data?.data || res?.data?.user || res?.user || res;
                if (u && mounted) {
                    setUser(u);
                    setLoading(false);
                    return;
                }
            } catch (err) {
                // ignore and fallback to fetching all users
                console.debug("single user fetch failed, falling back to list", err?.message || err);
            }

            // Fallback: fetch users list and find by id
            try {
                const listRes = await getUsers(1, 1000);
                let usersList = [];
                if (!listRes) usersList = [];
                else if (Array.isArray(listRes)) usersList = listRes;
                else if (Array.isArray(listRes.data)) usersList = listRes.data;
                else usersList = listRes.data?.data || listRes.data || listRes.users || listRes?.data || [];

                const found = usersList.find((x) => (x._id || x.id || x) === userId);
                if (found && mounted) {
                    setUser(found);
                    setLoading(false);
                    return;
                }

                if (mounted) {
                    setError("User not found");
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                if (mounted) {
                    setError(err?.message || "Failed to fetch user");
                    setLoading(false);
                }
            }
        };

        loadUser();

        return () => {
            mounted = false;
        };
    }, [userId]);

    // fetch orders by user id using orders API (prefers server-side filter)
    useEffect(() => {
        let mounted = true;
        const loadOrders = async () => {
            try {
                const res = await getOrders(1, 50, { userId });
                // normalize to array
                const ordersList = res?.data || res?.data?.data || res?.data || res?.data || res || [];
                if (mounted) {
                    setUser((prev) => ({ ...prev, _fetchedOrders: Array.isArray(ordersList) ? ordersList : res?.data || [] }));
                }
            } catch (err) {
                console.error("Failed to load orders for user", err);
            }
        };
        if (userId) loadOrders();
        return () => (mounted = false);
    }, [userId]);

    return (
        <div className={`contentRight py-4 px-5 ${context.isSidebarOpen ? "w-[80%]" : "w-[100%] pl-0"} transition-all duration-300`}>
            <div className="w-full bg-white p-6 rounded-md shadow-sm">
                {loading ? (
                    <div className="py-12 text-center">Loading user...</div>
                ) : error ? (
                    <div className="py-12 text-center text-red-600">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Left: avatar + basic info */}
                        <div className="col-span-1 flex flex-col items-center gap-4">
                            <div className="w-full flex justify-start">
                                <Link to={`/users`} >
                                    <FaRegArrowAltCircleLeft size={20} />
                                </Link>
                            </div>

                            <div className="w-40 h-40 rounded-md overflow-hidden bg-gray-100 border ">
                                <img
                                    src={user?.avatar || fallbackAvatar}
                                    alt={user?.name || user?.email}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-xl font-semibold">{user?.name || user?.fullName || "Unnamed"}</h2>
                            <p className="text-sm text-gray-600">{user?.email}</p>

                        </div>

                        {/* Middle: contact & status */}
                        <div className="col-span-1 md:col-span-1 p-4 border rounded-md">
                            <h3 className="font-semibold mb-3">Contact & Account</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="text-sm text-gray-500">Phone</div>
                                <div className="text-sm">{user?.mobile || user?.phone || "-"}</div>

                                <div className="text-sm text-gray-500">Role</div>
                                <div className="text-sm">{user?.role || "user"}</div>

                                <div className="text-sm text-gray-500">Status</div>
                                <div className="text-sm">{user?.status || "-"}</div>

                                <div className="text-sm text-gray-500">Verified</div>
                                <div className="text-sm">{user?.verify_email ? "Yes" : "No"}</div>

                                <div className="text-sm text-gray-500">Orders placed</div>
                                <div className="text-sm">{user?._fetchedOrders?.length || "-"}</div>

                            </div>
                        </div>

                        {/* Right: addresses & activity */}
                        <div className="col-span-1 md:col-span-1 p-4 border rounded-md">
                            <h3 className="font-semibold mb-3">Activity & Order History</h3>
                            <div className="mb-3">
                                <div className="text-sm text-gray-500">Created</div>
                                <div className="text-sm">{formatDate(user?.createdAt || user?.created_at)}</div>
                            </div>
                            <div className="mb-3">
                                <div className="text-sm text-gray-500">Last login</div>
                                <div className="text-sm">{formatDate(user?.last_login_date)}</div>
                            </div>


                             {/* Order history */}
                                <div className="mt-4">
                                    <div className="text-sm text-gray-500 mb-2">Recent Orders</div>
                                    {
                                        // prefer server-fetched orders saved in _fetchedOrders, otherwise fall back to user.orderHistory
                                    }
                                    {Array.isArray(user?._fetchedOrders) && user._fetchedOrders.length > 0 ? (
                                        <div className="flex flex-col gap-2">
                                            {user._fetchedOrders.slice(0, 8).map((o) => (
                                                <div key={o._id || o.orderId} className="p-2 border rounded flex justify-between items-center">
                                                    <div className="text-sm">
                                                        <div className="font-medium">{o.orderId || o._id}</div>
                                                        <div className="text-xs text-gray-500">{o.items?.length || 0} items • {o.paymentMethod || o.paymentStatus || "-"}</div>
                                                        {/* Delivery address for this order */}
                                                        <div className="mt-1 text-xs text-gray-700">
                                                            {o.delivery_address ? (
                                                                typeof o.delivery_address === "object" ? (
                                                                    <div>
                                                                        <div>{o.delivery_address.address_line || o.delivery_address.address || o.delivery_address.street || ""}</div>
                                                                        <div className="text-gray-500">{o.delivery_address.city || ""}{o.delivery_address.state ? `, ${o.delivery_address.state}` : ""} {o.delivery_address.pincode ? `- ${o.delivery_address.pincode}` : ""}</div>
                                                                        {o.delivery_address.mobile ? <div className="text-gray-500">Mobile: {o.delivery_address.mobile}</div> : null}
                                                                    </div>
                                                                ) : (
                                                                    <div className="text-gray-500">Address id: {String(o.delivery_address)}</div>
                                                                )
                                                            ) : (
                                                                <div className="text-gray-500">No delivery address</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm font-semibold">₹{o.totalAmount || o.subTotalAmount || 0}</div>
                                                        <div className="text-xs text-gray-500">{formatDate(o.createdAt || o.created_at)}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : Array.isArray(user?.orderHistory) && user.orderHistory.length > 0 ? (
                                        <div className="flex flex-col gap-2">
                                            {user.orderHistory.slice(0, 8).map((o) => (
                                                <div key={o._id || o.orderId} className="p-2 border rounded flex justify-between items-center">
                                                    <div className="text-sm">
                                                        <div className="font-medium">{o.orderId || o._id}</div>
                                                        <div className="text-xs text-gray-500">{o.items?.length || 0} items • {o.paymentMethod || o.paymentStatus || "-"}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm font-semibold">₹{o.totalAmount || o.subTotalAmount || 0}</div>
                                                        <div className="text-xs text-gray-500">{formatDate(o.createdAt || o.created_at)}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-sm">No recent orders</div>
                                    )}
                                </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;