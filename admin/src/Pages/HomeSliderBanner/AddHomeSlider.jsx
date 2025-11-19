
import { Button, MenuItem, Select } from '@mui/material'
import React, { useState, useContext } from 'react'
import Rating from '@mui/material/Rating';
import UploadBox from '../../Components/UploadBox';
import { createCategory, editCategoryData } from '../../utils/api';
import { MyContext } from '../../App';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import { MdCloudUpload } from "react-icons/md";


const AddHomeSlider = () => {
    const [age, setAge] = React.useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const context = useContext(MyContext);
    const [submitting, setSubmitting] = useState(false);
    const isEdit = context.isOpenAddProductForm?.model === 'Edit Home Slider';

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleFilesSelect = (files) => {
        setSelectedFiles(files || []);
    };

    // When editing, prefill the selectedFiles with existing image URL so UploadBox shows preview
    React.useEffect(() => {
        if (isEdit) {
            const existing = context.isOpenAddProductForm?.data || null;
            if (existing && existing.img) {
                setSelectedFiles([existing.img]);
            }
        } else {
            // clear selection when opening add form
            setSelectedFiles([]);
        }
    }, [context.isOpenAddProductForm]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFiles || selectedFiles.length === 0) {
            context.alertBox && context.alertBox('error', 'Please select an image to upload');
            return;
        }

        const formData = new FormData();
        // use first file only
        const file = selectedFiles[0];
        if (file instanceof File) formData.append('image', file);

        let res;
        try {
            setSubmitting(true);
            if (isEdit) {
                const id = context.isOpenAddProductForm?.data?._id;
                res = await editCategoryData(`/api/v1/homeSlider/update/${id}`, formData);
            } else {
                res = await createCategory(`/api/v1/homeSlider/create`, formData);
            }

            if (res && res.success) {
                context.alertBox && context.alertBox('success', isEdit ? 'Home slider updated' : 'Home slider created');
                // trigger a refresh in admin lists if context provides it
                context.setRefresh && context.setRefresh(!context.refresh);
                // close modal
                context.setIsOpenAddProductForm && context.setIsOpenAddProductForm({ isOpen: false });
            } else {
                context.alertBox && context.alertBox('error', res.message || 'Create failed');
            }
        } catch (err) {
            console.error('Create home slider error', err);
            context.alertBox && context.alertBox('error', 'Create failed');
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <section className='p-5 bg-gray-50'>
            <form action="" className='form py-3 p-8'>
                <div className=' max-h-[70vh] overflow-y-scroll pr-4'>


                    <div className="col w-full p-5 px-0 ">
                        <h3 className='font-[700] text-[18px] mb-3'>Media & Images</h3>
                        <div className="grid grid-cols-7 gap-4 ">

                            <UploadBox multiple={true} onFilesSelect={handleFilesSelect} existingFiles={selectedFiles} />
                        </div>
                    </div>
                </div>
                {/* <br /><hr /> */}
                <div className='w-[250px]'>
                    <Button disabled={submitting} onClick={handleSubmit} type="submit" className='!w-full !font-[600] !text-[16px] !bg-[#3872fa] !text-white !py-2 !rounded-[5px] !mt-5 !hover:bg-[#1a6df1]'>
                        <MdCloudUpload size={25} className='mr-2' />
                        {isEdit ? (submitting ? 'Updating...' : 'Update') : (submitting ? 'Publishing...' : 'Publish and View')}
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default AddHomeSlider