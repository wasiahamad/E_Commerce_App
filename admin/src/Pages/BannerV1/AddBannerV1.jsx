
import { Button, MenuItem, Select } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import Rating from '@mui/material/Rating';
import UploadBox from '../../Components/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import { MdCloudUpload } from "react-icons/md";
import { MyContext } from '../../App';
import { getData, createCategory, editCategoryData } from '../../utils/api';


const AddBannerV1 = () => {
    const context = useContext(MyContext);
    const isEdit = context.isOpenAddProductForm?.model === 'Edit Banner';

    // const [age, setAge] = useState("");

    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };

    const [categories, setCategories] = useState([]);
    const [category1, setCategory1] = useState('');
    const [category2, setCategory2] = useState('');
    const [category3, setCategory3] = useState('');

    const [subOptions, setSubOptions] = useState([]);
    const [thirdOptions, setThirdOptions] = useState([]);

    const [submitting, setSubmitting] = useState(false);

    const [formFields, setFormFields] = useState({
        title: '',
        price: '',
        // position controls alignment: left/center/right
        position: '',
        // cta is the button label
        cta: '',
        category: '',
        subCategory: '',
        thirdCategory: '',
        image: [] // can contain existing urls or File objects
    });



    useEffect(() => {
        let mounted = true;
        const loadCategories = async () => {
            try {
                const res = await getData('/api/v1/category');
                if (!mounted) return;
                const cats = (res && res.data) ? res.data : res || [];
                setCategories(cats);
            } catch (err) {
                console.error('Error loading categories', err);
            }
        }
        loadCategories();
        return () => { mounted = false };
    }, []);

    // When modal opens for edit, prefill fields
    useEffect(() => {
        const data = context.isOpenAddProductForm?.data;
        if (isEdit && data) {
            setFormFields({
                title: data.title || '',
                price: data.price || '',
                cta: data.cta || '',
                position: data.position || '',
                category: data.category || '',
                subCategory: data.subCategory || '',
                thirdCategory: data.thirdCategory || '',
                image: data.img ? (Array.isArray(data.img) ? data.img : [data.img]) : []
            });

            setCategory1(data.category || '');
            setCategory2(data.subCategory || '');
            setCategory3(data.thirdCategory || '');
        } else if (!isEdit) {
            // Reset on add
            setFormFields({ title: '', price: '', position: '', cta: '', category: '', subCategory: '', thirdCategory: '', image: [] });
            setCategory1(''); setCategory2(''); setCategory3('');
        }
    }, [context.isOpenAddProductForm]);

    // Update sub options when category1 changes
    useEffect(() => {
        const cat = categories.find(c => c._id === category1);
        setSubOptions(cat?.children || []);
        setCategory2('');
        setThirdOptions([]);
        setCategory3('');
    }, [category1, categories]);

    useEffect(() => {
        const sub = subOptions.find(s => s._id === category2);
        setThirdOptions(sub?.children || []);
        setCategory3('');
    }, [category2, subOptions]);

    const handleFilesSelect = (files) => {
        setFormFields(prev => ({ ...prev, image: files }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('title', formFields.title);
            formData.append('price', formFields.price);
            formData.append('cta', formFields.cta);
            formData.append('position', formFields.position);
            formData.append('category', formFields.category);
            formData.append('subCategory', formFields.subCategory);
            formData.append('thirdCategory', formFields.thirdCategory);

            // images
            formFields.image.forEach(file => {
                if (file instanceof File) {
                    formData.append('image', file);
                } else {
                    formData.append('existingImages[]', file);
                }
            });

            let res;
            if (isEdit) {
                const id = context.isOpenAddProductForm?.data?._id;
                res = await editCategoryData(`/api/v1/banner/update/${id}`, formData);
            } else {
                res = await createCategory(`/api/v1/banner/create`, formData);
            }

            if (res && res.success) {
                context.alertBox && context.alertBox('success', res.message || 'Saved');
                context.setIsOpenAddProductForm({ isOpen: false });
                context.setRefresh && context.setRefresh(!context.refresh);
            } else {
                context.alertBox && context.alertBox('error', res?.message || 'Error saving banner');
            }
        } catch (err) {
            console.error('Error submitting banner form', err);
            context.alertBox && context.alertBox('error', 'Network error');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className='p-5 bg-gray-50'>
            <form action="" onSubmit={handleSubmit} className='form py-3 p-8'>
                <div className=' max-h-[70vh] overflow-y-scroll pr-4'>

                    <div className="grid grid-cols-5 mb-3 gap-4">
                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Banner Title</h3>
                            <input name="title" value={formFields.title} onChange={(e) => setFormFields(prev => ({ ...prev, title: e.target.value }))} type="text" placeholder='Banner Title' className='w-full h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3' />
                        </div>

                        <div className='mb-3'>
                            <label className='block mt-1 font-medium text-sm'>Category</label>
                            <Select
                                value={category1}
                                onChange={(e) => { setCategory1(e.target.value); setFormFields(prev => ({ ...prev, category: e.target.value })); }}
                                size="small"
                                displayEmpty
                                className="w-full"
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {categories.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
                            </Select>
                        </div>

                        <div className='mb-3'>
                            <label className='block mt-1 font-medium text-sm'>Sub Category</label>
                            <Select
                                value={category2}
                                onChange={(e) => { setCategory2(e.target.value); setFormFields(prev => ({ ...prev, subCategory: e.target.value })); }}
                                size="small"
                                displayEmpty
                                className="w-full"
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {subOptions.map(sc => <MenuItem key={sc._id} value={sc._id}>{sc.name}</MenuItem>)}
                            </Select>
                        </div>

                        <div className='mb-3'>
                            <label className='block mt-1 font-medium text-sm'>Third Level Category</label>
                            <Select
                                value={category3}
                                onChange={(e) => { setCategory3(e.target.value); setFormFields(prev => ({ ...prev, thirdCategory: e.target.value })); }}
                                size="small"
                                displayEmpty
                                className="w-full"
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                {thirdOptions.map(tc => <MenuItem key={tc._id} value={tc._id}>{tc.name}</MenuItem>)}
                            </Select>
                        </div>

                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Price</h3>
                            <input name="price" value={formFields.price} onChange={(e) => setFormFields(prev => ({ ...prev, price: e.target.value }))} type="text" placeholder='price' className='w-full h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3' />
                        </div>

                        <div className='mb-3'>
                            <label className='block mt-1 font-medium text-sm'>Align Info (Position)</label>
                            <Select
                                value={formFields.position}
                                onChange={(e) => { setFormFields(prev => ({ ...prev, position: e.target.value })); }}
                                size="small"
                                displayEmpty
                                className="w-full"
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={'left'}>Left</MenuItem>
                                <MenuItem value={'center'}>Center</MenuItem>
                                <MenuItem value={'right'}>Right</MenuItem>
                            </Select>
                        </div>

                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>CTA (button label)</h3>
                            <input name="cta" value={formFields.cta} onChange={(e) => setFormFields(prev => ({ ...prev, cta: e.target.value }))} type="text" placeholder='e.g. Shop Now' className='w-full h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3' />
                        </div>

                    </div>

                    <div className="col w-full p-5 px-0 ">
                        <h3 className='font-[700] text-[18px] mb-3'>Media & Images</h3>
                        <div className="grid grid-cols-7 gap-4 ">
                            <UploadBox multiple={true} existingFiles={formFields.image} onFilesSelect={handleFilesSelect} />
                        </div>
                    </div>
                </div>
                {/* <br /><hr /> */}
                <div className='w-[250px]'>
                    <Button type="submit" disabled={submitting} className='!w-full !font-[600] !text-[16px] !bg-[#3872fa] !text-white !py-2 !rounded-[5px] !mt-5 !hover:bg-[#1a6df1]'>
                        <MdCloudUpload size={25} className='mr-2' />
                        {isEdit ? (submitting ? 'Updating...' : 'Update Banner') : (submitting ? 'Publishing...' : 'Publish and View')}
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default AddBannerV1;