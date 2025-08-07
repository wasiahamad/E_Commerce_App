import React, { use, useContext, useState } from 'react'
import DashboardBox from '../../Components/DashboardBox'
import { FaAngleDown, FaAngleUp, FaPlus } from "react-icons/fa6";
import { Button } from '@mui/material';
import Badge from '../../Components/Badge';
import ProductTable from '../../Components/ProductTable';
import { MyContext } from '../../App';
import SaleChart from '../../Components/SaleChart';


const Dashboard = () => {

    const [isOpenOrderedProducts, setIsOpenOrderedProducts] = useState(null);

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
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <td className='px-4 py-4'>
                                        <Button className='!min-w-[35px] !w-[35px] !h-[35px] !text-[rgba(0,0,0,0.5)] !rounded-full !bg-[#f1f1f1] 
                                                ' onClick={() => { isShowOrderedProducts(0) }}>
                                            {isOpenOrderedProducts === 0 ? <FaAngleUp className='text-[18px] ' /> : <FaAngleDown className='text-[18px] ' />}
                                        </Button>
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        <span className='text-[#3872fa]'>682b89b4228db479bb420460</span>
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        <span className='text-[#3872fa]'>CASH ON DELIVERY</span>
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        friday
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        918520025896
                                    </td>
                                    <td className='px-4 py-4'>
                                        <span className='block w-[400px]'>
                                            xfcgfhjkl, Jaipur Near Suresh Gyan vihar University rajsthan indis

                                        </span>
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        852025
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        6784
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        random@gmail.com
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        <span className='text-[#3872fa]'>68297a91228db479bb40a88f</span>
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        <Badge status="pending" />
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        12-03-2025
                                    </td>

                                </tr>

                                {isOpenOrderedProducts === 0 &&
                                    <tr>
                                        <td className='pl-7' colSpan='6'>
                                            <div className="relative overflow-x-auto">
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead className="text-[13px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>

                                                            <th scope="col" className="px-4 py-3">
                                                                Product Id
                                                            </th>
                                                            <th scope="col" className="px-4 py-3">
                                                                Product Title
                                                            </th>
                                                            <th scope="col" className="px-4 py-3">
                                                                Image
                                                            </th>
                                                            <th scope="col" className="px-4 py-3">
                                                                Quantity
                                                            </th>
                                                            <th scope="col" className="px-4 py-3">
                                                                Price
                                                            </th>
                                                            <th scope="col" className="px-4 py-3">
                                                                Sub Total
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody className='text-[13px]'>
                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                <span>682b89b4228db479bb420460</span>
                                                            </td>
                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                Men Pure Cotton Striped Casual Shirt
                                                            </td>
                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                <img src="https://serviceapi.spicezgold.com/download/1744509970781_fash.png" alt="" className='w-[40px] h-[40px] object-cover' />
                                                            </td>
                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                2
                                                            </td>
                                                            <td className='px-4 py-4'>
                                                                ₹1,999.00
                                                            </td>
                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                ₹1,999.00
                                                            </td>


                                                        </tr>

                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                682b89b4228db479bb420460
                                                            </td>
                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                Men Pure Cotton Striped Casual Shirt
                                                            </td>
                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                <img src="https://serviceapi.spicezgold.com/download/1744509970781_fash.png" alt="" className='w-[40px] h-[40px] object-cover' />
                                                            </td>
                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                2
                                                            </td>
                                                            <td className='px-4 py-4'>
                                                                ₹1,999.00
                                                            </td>
                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                ₹1,999.00
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                }

                            </tbody>

                            <tbody className='text-[13px]'>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <td className='px-4 py-4'>
                                        <Button className='!min-w-[35px] !w-[35px] !h-[35px] !text-[rgba(0,0,0,0.5)] !rounded-full !bg-[#f1f1f1] 
                                                ' onClick={() => { isShowOrderedProducts(1) }}>
                                            {isOpenOrderedProducts === 1 ? <FaAngleUp className='text-[18px] ' /> : <FaAngleDown className='text-[18px] ' />}
                                        </Button>
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        <span className='text-[#3872fa]'>682b89b4228db479bb420460</span>
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        <span className='text-[#3872fa]'>CASH ON DELIVERY</span>
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        friday
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        918520025896
                                    </td>
                                    <td className='px-4 py-4'>
                                        <span className='block w-[400px]'>
                                            xfcgfhjkl, Jaipur Near Suresh Gyan vihar University rajsthan indis

                                        </span>
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        852025
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        6784
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        random@gmail.com
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        <span className='text-[#3872fa]'>68297a91228db479bb40a88f</span>
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        <Badge status="pending" />
                                    </td>
                                    <td className='px-4 py-4 whitespace-nowrap'>
                                        12-03-2025
                                    </td>

                                </tr>

                                {isOpenOrderedProducts === 1 &&
                                    <tr>
                                        <td className='pl-7' colSpan='6'>
                                            <div className="relative overflow-x-auto">
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead className="text-[13px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>

                                                            <th scope="col" className="px-4 py-3">
                                                                Product Id
                                                            </th>
                                                            <th scope="col" className="px-4 py-3">
                                                                Product Title
                                                            </th>
                                                            <th scope="col" className="px-4 py-3">
                                                                Image
                                                            </th>
                                                            <th scope="col" className="px-4 py-3">
                                                                Quantity
                                                            </th>
                                                            <th scope="col" className="px-4 py-3">
                                                                Price
                                                            </th>
                                                            <th scope="col" className="px-4 py-3">
                                                                Sub Total
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody className='text-[13px]'>
                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                682b89b4228db479bb420460
                                                            </td>
                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                Men Pure Cotton Striped Casual Shirt
                                                            </td>
                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                <img src="https://serviceapi.spicezgold.com/download/1744509970781_fash.png" alt="" className='w-[40px] h-[40px] object-cover' />
                                                            </td>
                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                2
                                                            </td>
                                                            <td className='px-4 py-4'>
                                                                ₹1,999.00
                                                            </td>
                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                ₹1,999.00
                                                            </td>


                                                        </tr>

                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                682b89b4228db479bb420460
                                                            </td>
                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                Men Pure Cotton Striped Casual Shirt
                                                            </td>
                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                <img src="https://serviceapi.spicezgold.com/download/1744509970781_fash.png" alt="" className='w-[40px] h-[40px] object-cover' />
                                                            </td>
                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                2
                                                            </td>
                                                            <td className='px-4 py-4'>
                                                                ₹1,999.00
                                                            </td>
                                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                                ₹1,999.00
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                }

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
