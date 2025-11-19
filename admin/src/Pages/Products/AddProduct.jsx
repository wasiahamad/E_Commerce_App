import { Button, MenuItem, Select } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import UploadBox from '../../Components/UploadBox';
import Scanner from '../../Components/Scanner';
import CircularProgress from '@mui/material/CircularProgress';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import { MdCloudUpload } from "react-icons/md";
import { MyContext } from '../../App';
import { createCategory, editCategoryData, getData } from '../../utils/api';
import { getData as getApiData } from '../../utils/api';

const AddProduct = ({ product }) => {
    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productThirdSubCat, setProductThirdSubCat] = useState('');
    const [productFeatured, setProductFeatured] = useState(false);
    const [productSize, setProductSize] = useState([]);
    const [productRams, setProductRams] = useState([]);
    const [productWeight, setProductWeight] = useState([]);
    const [availableRams, setAvailableRams] = useState([])
    const [availableSizes, setAvailableSizes] = useState([])
    const [availableWeights, setAvailableWeights] = useState([])
    const [resetUploadBox, setResetUploadBox] = useState(false);

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
        image: [],
        code: '',
        codeType: 'barcode',
        codeImage: ''
    });

    const [scannerOpen, setScannerOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleScanDetected = async (code) => {
        try {
            if (!code) return setScannerOpen(false);
            // call backend lookup
            const res = await getData(`/api/v1/product/lookup?barcode=${encodeURIComponent(code)}`);
            if (res && res.success && res.data) {
                const payload = res.data;

                // If product was found locally, alert duplicate and populate fields for review
                if (res.source === 'local') {
                    context.alertBox && context.alertBox('error', 'Duplicate Product: product already exists in database');
                    const existing = payload; // payload is the product document
                    setFormFields(prev => ({
                        ...prev,
                        name: existing.name || prev.name,
                        description: existing.description || prev.description,
                        brand: existing.brand || prev.brand,
                        image: (existing.image && existing.image.length) ? existing.image : prev.image,
                        code: code
                    }));
                } else {
                    // External suggestion
                    const suggested = payload.source === 'local' ? payload.data : payload;
                    setFormFields(prev => ({
                        ...prev,
                        name: suggested.name || prev.name,
                        description: suggested.description || prev.description,
                        brand: suggested.brand || prev.brand,
                        image: (suggested.images && suggested.images.length) ? suggested.images : prev.image,
                        code: code
                    }));
                }
            } else {
                // not found — still set code so admin can create manually
                setFormFields(prev => ({ ...prev, code }));
            }
        } catch (err) {
            console.error('Lookup error', err);
            setFormFields(prev => ({ ...prev, code }));
        } finally {
            setScannerOpen(false);
        }
    };

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

    // Auto-calculate discount whenever price or oldPrice changes.
    useEffect(() => {
        const price = Number(formFields.price) || 0;
        const oldPrice = Number(formFields.oldPrice) || 0;

        if (oldPrice > 0 && price >= 0) {
            // calculate percentage discount = ((oldPrice - price) / oldPrice) * 100
            const raw = ((oldPrice - price) / oldPrice) * 100;
            // if raw is negative (price > oldPrice) set discount to 0
            const discountPercent = raw > 0 ? Number(raw.toFixed(2)) : 0;

            // Only update state if different to avoid rerenders
            if (Number(formFields.discount) !== discountPercent) {
                setFormFields(prev => ({ ...prev, discount: discountPercent }));
            }
        } else {
            // if oldPrice is empty or zero, don't show a discount (clear it)
            if (formFields.discount !== '' && formFields.discount !== 0) {
                setFormFields(prev => ({ ...prev, discount: '' }));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formFields.price, formFields.oldPrice]);

    // Rrating 
    const handleChangeRating = (event, newValue) => {
        setFormFields(prev => ({ ...prev, rating: newValue }));
    };

    // Load dynamic option lists: RAMs, Sizes, Weights
    useEffect(() => {
        let mounted = true
        const load = async () => {
            try {
                const [rRes, sRes, wRes] = await Promise.all([
                    getData('/api/v1/ram'),
                    getData('/api/v1/size'),
                    getData('/api/v1/weight')
                ])

                if (!mounted) return

                const rData = (rRes && rRes.data) ? rRes.data : (rRes?.data || [])
                const sData = (sRes && sRes.data) ? sRes.data : (sRes?.data || [])
                const wData = (wRes && wRes.data) ? wRes.data : (wRes?.data || [])

                setAvailableRams(rData.map(i => i.name))
                setAvailableSizes(sData.map(i => i.name))
                setAvailableWeights(wData.map(i => i.name))
            } catch (err) {
                console.error('Error loading dynamic option lists', err)
            }
        }

        load()
        return () => { mounted = false }
    }, [])

    // uploading image ************* /

    // Handle file selection
    const handleFilesSelect = (files) => {
        setFormFields(prev => ({
            ...prev,
            image: files
        }));
    };

    // Fill form in Add/Edit mode
    useEffect(() => {
        if (product) {
            setFormFields({
                ...formFields,
                ...product,
            });

            // ✅ dropdown & select states update
            setProductCat(product.catId || "");
            setProductSubCat(product.subCatId || "");
            setProductThirdSubCat(product.thirdSubCatId || "");
            setProductFeatured(product.isFeatured || false);

            setProductRams(product.productRam || []);
            setProductSize(product.size || []);
            setProductWeight(product.productWeight || []);

            // product.image (string urls or array) is assigned into formFields.image — UploadBox will render them
            if (Array.isArray(product.image)) {
                setFormFields(prev => ({ ...prev, image: product.image }));
            } else if (typeof product.image === "string") {
                setFormFields(prev => ({ ...prev, image: product.image.split(",") }));
            } else {
                setFormFields(prev => ({ ...prev, image: [] }));
            }
        }
    }, [product]);


    // form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // normal fields
        formData.append("name", formFields.name);
        formData.append("description", formFields.description);
        formData.append("brand", formFields.brand);
        formData.append("price", Number(formFields.price));
        formData.append("oldPrice", Number(formFields.oldPrice));
        formData.append("discount", Number(formFields.discount));
        formData.append("countInStock", Number(formFields.countInStock));
        formData.append("isFeatured", formFields.isFeatured);
        formData.append("rating", formFields.rating || 0);

        // category related
        formData.append("catId", formFields.catId);
        formData.append("catName", formFields.catName);
        formData.append("subCatId", formFields.subCatId);
        formData.append("subCatName", formFields.subCatName);
        formData.append("thirdSubCatId", formFields.thirdSubCatId);
        formData.append("thirdSubCat", formFields.thirdSubCat);

        // most important 👇 backend validation ke liye
        formData.append("category", formFields.catId);
    // append code fields
    if (formFields.code) formData.append("code", formFields.code);
    if (formFields.codeType) formData.append("codeType", formFields.codeType);

        // arrays
        formFields.productRam.forEach(r => formData.append("productRam[]", r));
        formFields.size.forEach(s => formData.append("size[]", s));
        formFields.productWeight.forEach(w => formData.append("productWeight[]", w));

        // images
        formFields.image.forEach(file => {
            if (file instanceof File) {
                formData.append("image", file); // new upload
            } else {
                formData.append("existingImages[]", file); // already uploaded (urls)
            }
        });


        for (let [k, v] of formData.entries()) {
            console.log(k, v);
        }

        try {
            setSubmitting(true);
            if (context.isOpenAddProductForm?.model === "Edit Product") {
                const productId = context.isOpenAddProductForm?.data?._id;
                const res = await editCategoryData(`/api/v1/product/update/${productId}`, formData);

                if (res?.success) {
                    context.alertBox("success", res?.message || "Product Updated Successfully");
                    context.setIsOpenAddProductForm({ isOpen: false });
                    context.refreshData && context.refreshData();
                } else {
                    context.alertBox("error", res?.message || "Error updating Product.");
                }
            } else {
                const res = await createCategory(`/api/v1/product/create`, formData);
                if (res?.success) {
                    context.alertBox("success", res?.message || "Product created successfully.");
                    context.setIsOpenAddProductForm({ isOpen: false });
                    context.refreshData && context.refreshData();
                } else {
                    context.alertBox("error", res?.message || "Error creating Product.");
                }
            }
        } catch (error) {
            context.alertBox("error", "Network error occurred");
            console.error("Form submission error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    // Generate code (client-side) and preview QR
    const handleGenerateCode = async () => {
        try {
            const newCode = uuidv4();
            setFormFields(prev => ({ ...prev, code: newCode, codeType: 'qr' }));
            const dataUrl = await QRCode.toDataURL(newCode, { margin: 1, width: 300 });
            setFormFields(prev => ({ ...prev, codeImage: dataUrl }));
        } catch (err) {
            console.error('QR generation error', err);
        }
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

                        {availableRams && availableRams.length > 0 && (
                            <div className="col">
                                <h3 className='text-[14px] font-[500] mb-1'>Product RAMS</h3>

                                <Select
                                    multiple
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={productRams}
                                    size="small"
                                    className="w-full mt-2 mb-6"
                                    label="RAM"
                                    onChange={handleChangeProductRams}
                                >
                                    {availableRams.map((r, idx) => (
                                        <MenuItem key={idx} value={r}>{r}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        )}

                        {availableWeights && availableWeights.length > 0 && (
                            <div className="col">
                                <h3 className='text-[14px] font-[500] mb-1'>Product Weight</h3>

                                <Select
                                    multiple
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={productWeight}
                                    size="small"
                                    className="w-full mt-2 mb-6"
                                    label="Weight"
                                    onChange={handleChangeProductWeight}
                                >
                                    {availableWeights.map((w, idx) => (
                                        <MenuItem key={idx} value={w}>{w}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        )}

                        {availableSizes && availableSizes.length > 0 && (
                            <div className="col">
                                <h3 className='text-[14px] font-[500] mb-1'>Product Size</h3>

                                <Select
                                    multiple
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={productSize}
                                    size="small"
                                    className="w-full mt-2 mb-6"
                                    label="Size"
                                    onChange={handleChangeProductSize}
                                >
                                    {availableSizes.map((s, idx) => (
                                        <MenuItem key={idx} value={s}>{s}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        )}
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
                        {/* Code / QR section */}
                        <div className="mb-4 p-3 border rounded">
                            <h4 className='text-[14px] font-[600] mb-2'>Product Code (SKU / QR)</h4>
                            <div className='flex items-center gap-3'>
                                <input
                                    type="text"
                                    placeholder='Enter code or generate'
                                    className='w-full h-[40px] rounded-[5px] focus:outline-none border p-3'
                                    name='code'
                                    value={formFields.code}
                                    onChange={(e) => setFormFields(prev => ({ ...prev, code: e.target.value }))}
                                />
                                <button type='button' onClick={() => setScannerOpen(true)} className='bg-green-600 text-white px-4 py-2 rounded'>📷 Scan Product</button>
                                <select value={formFields.codeType} onChange={(e) => setFormFields(prev => ({ ...prev, codeType: e.target.value }))} className='h-[40px] rounded p-2 border'>
                                    <option value='qr'>QR</option>
                                    <option value='barcode'>Barcode</option>
                                </select>
                            </div>

                            {/* preview */}
                            <div className='mt-3'>
                                {formFields.codeImage ? (
                                    <img src={formFields.codeImage} alt="code preview" className='w-[120px] h-[120px] object-contain border p-1' />
                                ) : product?.codeImage ? (
                                    <img src={product.codeImage} alt="code preview" className='w-[120px] h-[120px] object-contain border p-1' />
                                ) : null}
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-4 ">
                            {/* <div className="uploadBoxWrapper relative">
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
                            </div> */}

                            {/* Previews handled by UploadBox (thumbnails-only). */}
                            <UploadBox
                                name="image"
                                multiple={true}
                                onFilesSelect={handleFilesSelect}
                                resetTrigger={resetUploadBox}
                                existingFiles={formFields.image}

                            />
                        </div>
                    </div>
                </div>
                <br /><hr />
                <Button type="submit" disabled={submitting} className='!w-full !font-[600] !text-[16px] !bg-[#3872fa] !text-white !py-2 !rounded-[5px] !mt-5 !hover:bg-[#1a6df1]'>
                    <MdCloudUpload size={25} className='mr-2' />
                    {submitting ? (
                        <span className="flex items-center gap-2 justify-center">
                            <CircularProgress size={18} color="inherit" />
                            <span>Publishing...</span>
                        </span>
                    ) : (
                        'Publish and View'
                    )}
                </Button>
                {/* Scanner modal */}
                <Scanner open={scannerOpen} onClose={() => setScannerOpen(false)} onDetected={handleScanDetected} />
            </form>
        </section>
    )
}

export default AddProduct











