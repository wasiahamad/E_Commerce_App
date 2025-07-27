import React, { useState } from 'react';
import AccountSideBar from '../../components/AccountSideBar';
import { Button } from '@mui/material';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Badge from '../../components/Badge';


const Orders = () => {

    const [isOpenOrderedProducts, setIsOpenOrderedProducts] = useState(null);

    const isShowOrderedProducts = (idx) => {
        if (isOpenOrderedProducts === idx) {
            return setIsOpenOrderedProducts(null);
        }
        setIsOpenOrderedProducts(idx);
    }
    return (
        <section className='py-10 w-full'>
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <AccountSideBar />
                </div>

                <div className="col2 w-[80%]">
                    <div className="shadow-md rounded-md bg-white">
                        <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                            <h4 className="text-[18px] font-[600] text-[#000] opacity-75">Your Order</h4>
                            <p className="mt-0">
                                There are <span className="font-bold text-primary">4</span> Orders
                            </p>

                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-[13px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr >
                                            <th>

                                            </th>
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
                                    <tbody className='text-[13px]'>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <td className='px-4 py-4'>
                                                <Button className='!min-w-[35px] !w-[35px] !h-[35px] !text-[rgba(0,0,0,0.5)] !rounded-full !bg-[#f1f1f1] 
                                                ' onClick={() => { isShowOrderedProducts(0) }}>
                                                    {isOpenOrderedProducts === 0 ? <FaAngleUp className='text-[18px] ' /> : <FaAngleDown className='text-[18px] ' />}
                                                </Button>
                                            </td>
                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                <span className='text-primary'>682b89b4228db479bb420460</span>
                                            </td>
                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                <span className='text-primary'>CASH ON DELIVERY</span>
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
                                                <span className='text-primary'>68297a91228db479bb40a88f</span>
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
                                                    <div class="relative overflow-x-auto">
                                                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                            <thead class="text-[13px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                                <tr>

                                                                    <th scope="col" class="px-4 py-3">
                                                                        Product Id
                                                                    </th>
                                                                    <th scope="col" class="px-4 py-3">
                                                                        Product Title
                                                                    </th>
                                                                    <th scope="col" class="px-4 py-3">
                                                                        Image
                                                                    </th>
                                                                    <th scope="col" class="px-4 py-3">
                                                                        Quantity
                                                                    </th>
                                                                    <th scope="col" class="px-4 py-3">
                                                                        Price
                                                                    </th>
                                                                    <th scope="col" class="px-4 py-3">
                                                                        Sub Total
                                                                    </th>

                                                                </tr>
                                                            </thead>
                                                            <tbody className='text-[13px]'>
                                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

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

                                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

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
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <td className='px-4 py-4'>
                                                <Button className='!min-w-[35px] !w-[35px] !h-[35px] !text-[rgba(0,0,0,0.5)] !rounded-full !bg-[#f1f1f1] 
                                                ' onClick={() => { isShowOrderedProducts(1) }}>
                                                    {isOpenOrderedProducts === 1 ? <FaAngleUp className='text-[18px] ' /> : <FaAngleDown className='text-[18px] ' />}
                                                </Button>
                                            </td>
                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                <span className='text-primary'>682b89b4228db479bb420460</span>
                                            </td>
                                            <td className='px-4 py-4 whitespace-nowrap'>
                                                <span className='text-primary'>CASH ON DELIVERY</span>
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
                                                <span className='text-primary'>68297a91228db479bb40a88f</span>
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
                                                    <div class="relative overflow-x-auto">
                                                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                            <thead class="text-[13px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                                <tr>

                                                                    <th scope="col" class="px-4 py-3">
                                                                        Product Id
                                                                    </th>
                                                                    <th scope="col" class="px-4 py-3">
                                                                        Product Title
                                                                    </th>
                                                                    <th scope="col" class="px-4 py-3">
                                                                        Image
                                                                    </th>
                                                                    <th scope="col" class="px-4 py-3">
                                                                        Quantity
                                                                    </th>
                                                                    <th scope="col" class="px-4 py-3">
                                                                        Price
                                                                    </th>
                                                                    <th scope="col" class="px-4 py-3">
                                                                        Sub Total
                                                                    </th>

                                                                </tr>
                                                            </thead>
                                                            <tbody className='text-[13px]'>
                                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

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

                                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">

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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Orders;