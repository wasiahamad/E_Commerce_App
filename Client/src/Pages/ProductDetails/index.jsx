import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import ProductZoom from "../../components/ProductZoom";
import { Rating } from "@mui/material";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import ProductsSlider from "../../components/ProductsSlider";
import ProductDetailsModel from "../../components/ProductDetailsModel";

const ProductDetails = () => {
    
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <div className="py-5">
                <div className="container">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/"
                            className="link transition"
                        >
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/"
                            className="link transition"
                        >
                            Fashion
                        </Link>
                    </Breadcrumbs>
                </div>
            </div>

            <section className="bg-white py-5">
                <div className="container flex gap-8 items-center">
                    <div className="productZoomContainer w-[40%] ">
                        <ProductZoom />
                    </div>

                    <div className="productContent w-[60%] pr-10 pl-10">    
                        <ProductDetailsModel />
                    </div>

                </div>

                <div className="container pt-10">
                    <div className="flex items-center gap-8">
                        <span className={`link text-[17px] font-[500] cursor-pointer ${activeTab === 0 ? "text-primary" : ""}`} onClick={() => setActiveTab(0)}>Description</span>
                        <span className={`link text-[17px] font-[500] cursor-pointer ${activeTab === 1 ? "text-primary" : ""}`} onClick={() => setActiveTab(1)}>Products Details</span>
                        <span className={`link text-[17px] font-[500] cursor-pointer ${activeTab === 2 ? "text-primary" : ""}`} onClick={() => setActiveTab(2)}> Reviews (5)</span>
                    </div>

                    {activeTab === 0 &&
                        <div className="shadow-md w-full px-8 py-5 rounded-md ">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy text
                                ever since the 1500s, when an unknown printer took a galley of
                                type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged. It was
                                popularised in the 1960s with the release of Letraset sheets
                                containing Lorem Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker including versions of Lorem
                                Ipsum.
                            </p>
                        </div>
                    }
                    {activeTab === 1 &&
                        <div className="shadow-md w-full px-8 py-5 rounded-md">
                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Product name
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Color
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Category
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Price
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Apple MacBook Pro 17"
                                            </th>
                                            <td class="px-6 py-4">
                                                Silver
                                            </td>
                                            <td class="px-6 py-4">
                                                Laptop
                                            </td>
                                            <td class="px-6 py-4">
                                                $2999
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Microsoft Surface Pro
                                            </th>
                                            <td class="px-6 py-4">
                                                White
                                            </td>
                                            <td class="px-6 py-4">
                                                Laptop PC
                                            </td>
                                            <td class="px-6 py-4">
                                                $1999
                                            </td>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Magic Mouse 2
                                            </th>
                                            <td class="px-6 py-4">
                                                Black
                                            </td>
                                            <td class="px-6 py-4">
                                                Accessories
                                            </td>
                                            <td class="px-6 py-4">
                                                $99
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                    {activeTab === 2 &&
                        <div className="shadow-md w-[80%] px-8 py-5 rounded-md">
                            <div className="productsReview w-full">
                                <h1 className="text-[20px] font-[500]">Customer questions & answers</h1>

                                <div className="reviewsScroll w-full max-h-[300px] overflow-y-scroll mt-5 pr-5">
                                    <div className="review w-full flex items-center justify-between py-5 border-b border-[#eaeaea]">
                                        <div className="info w-[60%] flex items-center gap-3">
                                            <div className="img w-[70px] h-[70px] rounded-full overflow-hidden">
                                                <img src="https://ecommerce-frontend-view.netlify.app/user.jpg" alt="" className='w-full' />
                                            </div>

                                            <div className="content w-[80%]">
                                                <h1 className="text-[16px] font-[500]">John Doe</h1>
                                                <h5 className="text-[13px] font-[400] text-[#8a8a8a] mb-0">2024-01-01</h5>
                                                <p className="text-[14px] font-[400] text-[#262424] mt-0 mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae voluptatibus? Quisquam, quae voluptatibus?</p>
                                            </div>
                                        </div>
                                        <Rating name="size-small" defaultValue={4} readOnly />
                                    </div>

                                    <div className="review w-full flex items-center justify-between py-5 border-b border-[#eaeaea]">
                                        <div className="info w-[60%] flex items-center gap-3">
                                            <div className="img w-[70px] h-[70px] rounded-full overflow-hidden">
                                                <img src="https://ecommerce-frontend-view.netlify.app/user.jpg" alt="" className='w-full' />
                                            </div>

                                            <div className="content w-[80%]">
                                                <h1 className="text-[16px] font-[500]">John Doe</h1>
                                                <h5 className="text-[13px] font-[400] text-[#8a8a8a] mb-0">2024-01-01</h5>
                                                <p className="text-[14px] font-[400] text-[#262424] mt-0 mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae voluptatibus? Quisquam, quae voluptatibus?</p>
                                            </div>
                                        </div>
                                        <Rating name="size-small" defaultValue={4} readOnly />
                                    </div>

                                    <div className="review w-full flex items-center justify-between py-5 border-b border-[#eaeaea]">
                                        <div className="info w-[60%] flex items-center gap-3">
                                            <div className="img w-[70px] h-[70px] rounded-full overflow-hidden">
                                                <img src="https://ecommerce-frontend-view.netlify.app/user.jpg" alt="" className='w-full' />
                                            </div>

                                            <div className="content w-[80%]">
                                                <h1 className="text-[16px] font-[500]">John Doe</h1>
                                                <h5 className="text-[13px] font-[400] text-[#8a8a8a] mb-0">2024-01-01</h5>
                                                <p className="text-[14px] font-[400] text-[#262424] mt-0 mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae voluptatibus? Quisquam, quae voluptatibus?</p>
                                            </div>
                                        </div>
                                        <Rating name="size-small" defaultValue={4} readOnly />
                                    </div>
                                </div>

                                <div className="reviewForm bg-[#fafafa] p-5 mt-5 rounded-md">
                                    <form action="" className="w-full">
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="Write a review"
                                            multiline
                                            className="w-full !mb-5 "
                                            rows={5}
                                        />
                                        <Rating name="size-small" defaultValue={4} />
                                        <div className="flex items-center gap-3 mt-3">
                                            <span className="text-[15px] font-[500] text-[#262424]">Add a photo</span>
                                            <input type="file" className="w-full" />
                                        </div>
                                        <Button className='btn-org !mt-4'>Submit Review</Button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    }
                </div>

                <div className="container pt-8 ">
                    <h2 className="text-[22px] font-[600] text-[rgba(0,0,0,0.8)]">Related Products</h2>
                    <ProductsSlider items={6} />
                </div>
            </section>
        </>
    );
};

export default ProductDetails;
