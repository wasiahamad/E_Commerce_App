import { Button, MenuItem, Select } from '@mui/material'
import React, { useContext, useState } from 'react'
import Rating from '@mui/material/Rating';
import UploadBox from '../../Components/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import { MdCloudUpload } from "react-icons/md";
import { MyContext } from '../../App';

const AddProduct = () => {
    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productThirdSubCat, setProductThirdSubCat] = useState('');
    const [productFeatured, setProductFeatured] = useState(false);
    const [productSize, setProductSize] = useState([]);
    const [productRams, setProductRams] = useState([]);
    const [productWeight, setProductWeight] = useState([]);

    const context = useContext(MyContext)

    const [formFields, setFormFields] = useState({
        name: '',
        description: '',
        catName: '',
        subCatName: '',
        subCatId: '',
        catId: '',
        thirdSubCat: '',
        thirdSubCatId: '',
        countInStock: '',
        rating: '',
        isFeatured: false,
        discount: '',
        brand: '',
        price: '',
        oldPrice: '',
        productRam: [],
        size: [],
        productWeight: [],
        image: []
    });

    // Product Category
    const handleChangeProductCat = (event) => {
        const selectedId = event.target.value;
        setProductCat(selectedId);

        const selectedCat = context?.categories?.find(c => c._id === selectedId);

        setFormFields(prev => ({
            ...prev,
            catId: selectedId,
            catName: selectedCat ? selectedCat.name : ""
        }));
    };


    // Product Sub Category
    const handleChangeProductSubCat = (event) => {
        const selectedId = event.target.value;
        setProductSubCat(selectedId);

        let selectedSubCat;
        context?.categories?.forEach(cat => {
            const found = cat?.children?.find(sc => sc._id === selectedId);
            if (found) selectedSubCat = found;
        });

        setFormFields(prev => ({
            ...prev,
            subCatId: selectedId,
            subCatName: selectedSubCat ? selectedSubCat.name : ""
        }));
    };


    // Third Sub Category
    const handleChangeProductThirdSubCat = (event) => {
        const selectedId = event.target.value;
        setProductThirdSubCat(selectedId);

        let selectedThird;
        context?.categories?.forEach(cat => {
            cat?.children?.forEach(sub => {
                const found = sub?.children?.find(tc => tc._id === selectedId);
                if (found) selectedThird = found;
            });
        });

        setFormFields(prev => ({
            ...prev,
            thirdSubCatId: selectedId,
            thirdSubCat: selectedThird ? selectedThird.name : ""
        }));
    };


    // Featured
    const handleChangeProductFeatured = (event) => {
        setProductFeatured(event.target.value);
        setFormFields(prev => ({ ...prev, isFeatured: event.target.value }));
    }


    // Product Size
    const handleChangeProductSize = (event) => {
        const {
            target: { value },
        } = event;
        setProductSize(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        if (value.length > 0) {
            formFields.size = value
        }
    }

    // Product Rams
    const handleChangeProductRams = (event) => {
        const {
            target: { value },
        } = event;
        setProductRams(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        if (value.length > 0) {
            formFields.productRam = value
        }
    }

    // product weight 
    const handleChangeProductWeight = (event) => {
        const {
            target: { value },
        } = event;
        setProductWeight(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        if (value.length > 0) {
            formFields.productWeight = value
        }
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(prev => ({ ...prev, [name]: value }));
    };

    // Rrating 
    const handleChangeRating = (event, newValue) => {
        setFormFields(prev => ({ ...prev, rating: newValue }));
    };

    // form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formFields);
    }

    return (
        <section className='p-5 bg-gray-50'>
            <form action="" onSubmit={handleSubmit} className='form py-3 p-8'>
                <div className=' max-h-[70vh] overflow-y-scroll pr-4'>
                    <div className="grid grid-cols-1 mb-3">
                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Product Name</h3>
                            <input
                                type="text"
                                placeholder='Product Name'
                                className='w-full h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3'
                                name='name'
                                value={formFields.name}
                                onChange={onChangeInput}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mb-3">
                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Product Description</h3>
                            <textarea
                                name='description'
                                id='productDescription'
                                placeholder='Product Description'
                                className='w-full h-[150px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3'
                                value={formFields.description}
                                onChange={onChangeInput}
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-3">
                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Product Category</h3>

                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={productCat}
                                size="small"
                                className="w-full mt-2 mb-6"
                                label="Product Category"
                                onChange={handleChangeProductCat}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {context?.categories?.map((cat, idx) => {
                                    return (
                                        <MenuItem value={cat?._id} onClick={() => formFields.catName = cat?.name}>
                                            {cat?.name}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </div>

                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Product Sub Category</h3>

                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={productSubCat}
                                size="small"
                                className="w-full mt-2 mb-6"
                                label="Sub Category"
                                onChange={handleChangeProductSubCat}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {/* for subcategory category ka hi children array h */}
                                {
                                    context?.categories?.map((cat, idx) => {
                                        return (
                                            cat?.children?.map((subCat, idx) => {
                                                return (
                                                    <MenuItem value={subCat?._id}>
                                                        {subCat?.name}
                                                    </MenuItem>
                                                )
                                            })
                                        )
                                    })
                                }
                            </Select>
                        </div>

                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Product Third Lavel Category</h3>

                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={productThirdSubCat}
                                size="small"
                                className="w-full mt-2 mb-6"
                                label="Age"
                                onChange={handleChangeProductThirdSubCat}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {/* for third subcategory subcategory ka hi children array h */}
                                {
                                    context?.categories?.map((cat, idx) => {
                                        return (
                                            cat?.children?.map((subCat, idx) => {
                                                return (
                                                    subCat?.children?.map((thirdCat, idx) => {
                                                        return (
                                                            <MenuItem value={thirdCat?._id}>
                                                                {thirdCat?.name}
                                                            </MenuItem>
                                                        )
                                                    })
                                                )
                                            })
                                        )
                                    })
                                }
                            </Select>
                        </div>

                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Product Price</h3>
                            <input
                                type="text"
                                placeholder='Product Price'
                                className='w-full mt-2 h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.2)] focus:border-[rgba(0,0,0,0.5)] p-3'
                                name='price'
                                value={formFields.price}
                                onChange={onChangeInput}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-0">
                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Product Old Price</h3>
                            <input
                                type="text"
                                placeholder='Product Old Price'
                                className='w-full mt-2 h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.2)] focus:border-[rgba(0,0,0,0.5)] p-3'
                                name='oldPrice'
                                value={formFields.oldPrice}
                                onChange={onChangeInput}
                            />
                        </div>

                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Is Featured?</h3>

                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={productFeatured}
                                size="small"
                                className="w-full mt-2 mb-6"
                                label="Is Featured"
                                onChange={handleChangeProductFeatured}
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </Select>
                        </div>

                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Product Stock</h3>
                            <input
                                type="text"
                                placeholder='Product Stock'
                                className='w-full mt-2 h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.2)] focus:border-[rgba(0,0,0,0.5)] p-3'
                                name='countInStock'
                                value={formFields.countInStock}
                                onChange={onChangeInput}
                            />

                        </div>

                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Product Brand</h3>
                            <input
                                type="text"
                                placeholder='Product Brand'
                                className='w-full mt-2 h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.2)] focus:border-[rgba(0,0,0,0.5)] p-3'
                                name='brand'
                                value={formFields.brand}
                                onChange={onChangeInput}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-0">
                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Product Discount</h3>
                            <input
                                type="text"
                                placeholder='Product Discount'
                                className='w-full mt-2 h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.2)] focus:border-[rgba(0,0,0,0.5)] p-3'
                                name='discount'
                                value={formFields.discount}
                                onChange={onChangeInput}
                            />
                        </div>

                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Product RAMS</h3>

                            <Select
                                multiple
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={productRams}
                                size="small"
                                className="w-full mt-2 mb-6"
                                label="Age"
                                onChange={handleChangeProductRams}
                            >
                                <MenuItem value={"4GB"}>4GB</MenuItem>
                                <MenuItem value={"6GB"}>6GB</MenuItem>
                                <MenuItem value={"8GB"}>8GB</MenuItem>
                            </Select>
                        </div>

                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Product Weight</h3>

                            <Select
                                multiple
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={productWeight}
                                size="small"
                                className="w-full mt-2 mb-6"
                                label="Age"
                                onChange={handleChangeProductWeight}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>

                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Product Size</h3>

                            <Select
                                multiple
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={productSize}
                                size="small"
                                className="w-full mt-2 mb-6"
                                label="Age"
                                onChange={handleChangeProductSize}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-0">
                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Product Rating</h3>
                            <Rating
                                name="half-rating"
                                value={formFields.rating}
                                precision={0.5}
                                onChange={handleChangeRating}
                            />
                        </div>
                    </div>

                    <div className="col w-full p-5 px-0 ">
                        <h3 className='font-[700] text-[18px] mb-3'>Media & Images</h3>
                        <div className="grid grid-cols-7 gap-4 ">
                            <div className="uploadBoxWrapper relative">
                                <span className='absolute z-50 bg-red-700 -top-[5px] -right-[5px] rounded-full flex items-center justify-center text-white w-[20px] h-[20px] cursor-pointer'
                                ><IoMdClose className='text-white' size={16} />
                                </span>
                                <div className="uploadBox  rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] cursor-pointer hover:bg-gray-200 flex flex-col items-center justify-center relative ">
                                    <LazyLoadImage
                                        // alt={image.alt}
                                        className='w-[100%] h-[100%] object-cover'
                                        effect="blur"
                                        wrapperProps={{
                                            // If you need to, you can tweak the effect transition using the wrapper style.
                                            style: { transitionDelay: "1s" },
                                        }}
                                        src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                                </div>
                            </div>
                            <UploadBox multiple={true} />
                        </div>
                    </div>
                </div>
                <br /><hr />
                <Button type="submit" className='!w-full !font-[600] !text-[16px] !bg-[#3872fa] !text-white !py-2 !rounded-[5px] !mt-5 !hover:bg-[#1a6df1]'>
                    <MdCloudUpload size={25} className='mr-2' />
                    Publish and View
                </Button>
            </form>
        </section>
    )
}

export default AddProduct










