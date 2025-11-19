import React, { useEffect, useContext, useState } from 'react'
import DashboardBox from '../../Components/DashboardBox'
import { FaAngleDown, FaAngleUp, FaPlus } from "react-icons/fa6";
import { Button } from '@mui/material';
import Badge from '../../Components/Badge';
import ProductTable from '../../Components/ProductTable';
import { MyContext } from '../../App';
import SaleChart from '../../Components/SaleChart';
import { getData, postData } from '../../utils/api';


const Dashboard = () => {

    const [isOpenOrderedProducts, setIsOpenOrderedProducts] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);

    useEffect(() => {
        const fetchRecent = async () => {
            setLoadingOrders(true);
            try {
                const res = await getData('/api/v1/order?page=1&perPage=5');
                const fetched = res?.data || [];
                setOrders(fetched);
                // fetch shipping estimates for any order missing shippingCharge
                fetchMissingShippingCharges(fetched);
            } catch (err) {
                console.error('Failed to load recent orders', err);
            } finally {
                setLoadingOrders(false);
            }
        };
        fetchRecent();
    }, []);

    const fetchMissingShippingCharges = async (ordersList = []) => {
        if (!Array.isArray(ordersList)) return;
        ordersList.forEach(async (o) => {
            try {
                if (o.shippingCharge !== undefined && o.shippingCharge !== null) return;
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

    const isShowOrderedProducts = (idx) => {
        if (isOpenOrderedProducts === idx) {
            return setIsOpenOrderedProducts(null);
        }
        setIsOpenOrderedProducts(idx);
    }

    const context = useContext(MyContext);


    return (
        <>
            <div className={`contentRight py-4 px-7 ${context.isSidebarOpen ? "w-[80%]" : "w-[100%]"} transition-all duration-300`}>
                <div className="w-full bg-[#f1faff] px-5 border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
                    <div className="info">
                        <h1 className="text-[35px] font-bold leading-10 mb-3">Welcome ,
                            <p className='text-[#3872fa]'> Admin</p>
                        </h1>
                        <p >Here’s What happening on your store today. See the statistics at once.</p>

                        <Button className='btn-blue !mt-5 !capitalize '><FaPlus className='mr-1 text-[18px]' />Add Products</Button>
                    </div>

                    <img src="https://isomorphic-furyroad.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fshop-illustration.b3542492.png&w=3840&q=75" alt="" className='w-[250px]  ' />
                </div>
                <DashboardBox />

                <ProductTable />

                <div className="card my-3 shadow-md sm:rounded-lg bg-white">
                    <div className="flex items-center justify-between py-4 px-5">
                        <h2 className='text-[20px] font-semibold'>Recent Orders</h2>
                        <input type="text" placeholder="Search..." className="border border-[rgba(0,0,0,0.1)] p-2 rounded-md w-[50%] outline-none " />
                    </div>
                    <div className="relative overflow-x-auto mt-5 pb-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-[13px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr >
                                    <th>

                                    </th>
                                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                                        Order Id
                                    </th>
                                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                                        Paymant Id
                                    </th>
                                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                                        Name
                                    </th>
                                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                                        Phone Number
                                    </th>
                                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                                        Address
                                    </th>
                                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                                        Pincode
                                    </th>
                                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                                        Total Amount
                                    </th>
                                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                                        Shipping
                                    </th>
                                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                                        Email
                                    </th>
                                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                                        User Id
                                    </th>
                                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                                        Order Status
                                    </th>
                                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='text-[13px]'>
                                {loadingOrders ? (
                                    <tr>
                                        <td colSpan={12} className="text-center py-6">Loading...</td>
                                    </tr>
                                ) : orders.length === 0 ? (
                                    <tr>
                                        <td colSpan={12} className="text-center py-6">No recent orders</td>
                                    </tr>
                                ) : (
                                    orders.map((o, idx) => (
                                        <React.Fragment key={o._id}>
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                <td className='px-4 py-4'>
                                                    <Button className='!min-w-[35px] !w-[35px] !h-[35px] !text-[rgba(0,0,0,0.5)] !rounded-full !bg-[#f1f1f1]' onClick={() => { isShowOrderedProducts(idx) }}>
                                                        {isOpenOrderedProducts === idx ? <FaAngleUp className='text-[18px]' /> : <FaAngleDown className='text-[18px]' />}
                                                    </Button>
                                                </td>
                                                <td className='px-4 py-4 whitespace-nowrap'><span className='text-[#3872fa]'>{o.orderId}</span></td>
                                                <td className='px-4 py-4 whitespace-nowrap'><span className='text-[#3872fa]'>{o.paymentMethod || o.paymentId || 'CASH ON DELIVERY'}</span></td>
                                                <td className='px-4 py-4 whitespace-nowrap'>{o.userId?.name || o.userId?.email}</td>
                                                <td className='px-4 py-4 whitespace-nowrap'>{o.userId?.mobile}</td>
                                                <td className='px-4 py-4'><span className='block w-[400px]'>{o.delivery_address?.address_line || o.delivery_address?.address || ''}</span></td>
                                                <td className='px-4 py-4 whitespace-nowrap'>{o.delivery_address?.pincode || ''}</td>
                                                <td className='px-4 py-4 whitespace-nowrap'>{o.totalAmount}</td>
                                                <td className='px-4 py-4 whitespace-nowrap'>{typeof o.shippingCharge === 'number' ? (o.shippingCharge === 0 ? 'Free' : `₹ ${Number(o.shippingCharge).toFixed(2)}`) : '—'}</td>
                                                <td className='px-4 py-4 whitespace-nowrap'>{o.userId?.email}</td>
                                                <td className='px-4 py-4 whitespace-nowrap'><span className='text-[#3872fa]'>{o.userId?._id}</span></td>
                                                <td className='px-4 py-4 whitespace-nowrap'>
                                                    <Badge status={o.status} />
                                                </td>
                                                <td className='px-4 py-4 whitespace-nowrap'>{new Date(o.createdAt).toLocaleDateString()}</td>
                                            </tr>

                                            {isOpenOrderedProducts === idx && (
                                                <tr>
                                                    <td className='pl-7' colSpan='6'>
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
                                                                <tbody className='text-[13px]'>
                                                                    {o.items.map(it => (
                                                                        <tr key={it.productId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                                            <td className='px-4 py-4 whitespace-nowrap'>{it.productId}</td>
                                                                            <td className='px-4 py-4 whitespace-nowrap'>{it.title}</td>
                                                                            <td className='px-4 py-4 whitespace-nowrap'><img src={it.image} alt="" className='w-[40px] h-[40px] object-cover' /></td>
                                                                            <td className='px-4 py-4 whitespace-nowrap'>{it.quantity}</td>
                                                                            <td className='px-4 py-4'>₹{it.price}</td>
                                                                            <td className='px-4 py-4 whitespace-nowrap'>₹{it.subTotal}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
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
                <div className="card my-5 shadow-md sm:rounded-lg bg-white">

                    <div className="flex items-center gap-5 py-4 px-5 pb-0">
                        <h2 className='text-[20px] font-semibold'>Total Users & Total Sales</h2>
                    </div>

                    <div className="flex items-center gap-5 py-5 px-5 pt-1">
                        <span className='flex items-center gap-1 text-[15px]'>
                            <span className='block w-[8px] h-[8px] rounded-full bg-green-500'></span>
                            Total Users
                        </span>

                        <span className='flex items-center gap-1 text-[15px]'>
                            <span className='block w-[8px] h-[8px] rounded-full bg-[#3872fa]'></span>
                            Total Users
                        </span>
                    </div>

                    <SaleChart />
                </div>
            </div>
        </>
    )
}

export default Dashboard
