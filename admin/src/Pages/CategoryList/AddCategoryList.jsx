import { Button } from '@mui/material';
import UploadBox from '../../Components/UploadBox';
import { MdCloudUpload } from "react-icons/md";
import { useState, useContext, useEffect } from 'react';
import { createCategory, editCategoryData, editData } from '../../utils/api';
import { MyContext } from "../../App";

const AddCategoryList = () => {
    const [formFields, setFormFields] = useState({ name: '', image: [] });
    const [resetUploadBox, setResetUploadBox] = useState(false);
    const context = useContext(MyContext);

    // Handle file selection
    const handleFilesSelect = (files) => {
        setFormFields(prev => ({
            ...prev,
            image: files
        }));
    };

    // Fill form in Add/Edit mode
    useEffect(() => {
        const model = context.isOpenAddProductForm?.model;
        if (["Add Category", "Edit Category"].includes(model)) {
            const data = context.isOpenAddProductForm?.model || {};
            let images = [];
            if (data.image) {
                if (Array.isArray(data.image)) {
                    images = data.image;
                } else if (typeof data.image === "string") {
                    images = data.image.split(",").map(url => url.trim());
                }
            }

            setFormFields({
                name: data.name || '',
                image: images
            });

            setResetUploadBox(prev => !prev);
        }
    }, [context.isOpenAddProductForm]);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Fields Before Submit:", formFields); // Debugging line

        if (!formFields.name || formFields.image.length === 0) {
            context.alertBox("error", "Please fill all fields");
            return;
        }

        const formData = new FormData();
        formData.append("name", formFields.name);

        // Append new image files and existing image URLs
        formFields.image.forEach((file, index) => {
            if (file instanceof File) {
                formData.append("image", file); // Append new file
            } else {
                formData.append("existingImages[]", file); // Append existing image URL
            }
        });

        // Log the FormData contents for debugging
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            if (context.isOpenAddProductForm?.model === "Edit Category") {
                const categoryId = context.isOpenAddProductForm?.data?._id;
                const res = await editCategoryData(`/api/v1/category/update/${categoryId}`, formData);

                if (res?.success) {
                    context.alertBox("success", res?.message);
                    context.setIsOpenAddProductForm({ isOpen: false });
                    context.refreshData && context.refreshData();
                } else {
                    context.alertBox("error", res?.message || "Error updating category.");
                }
            } else {
                const res = await createCategory(`/api/v1/category/create`, formData);
                if (res?.success) {
                    context.alertBox("success", res?.message || "Category created successfully.");
                    context.setIsOpenAddProductForm({ isOpen: false });
                    context.refreshData && context.refreshData();
                } else {
                    context.alertBox("error", res?.message || "Error creating category.");
                }
            }
        } catch (error) {
            context.alertBox("error", "Network error occurred");
            console.error("Form submission error:", error);
        }
    }


    return (
        <section className='p-5 bg-gray-50'>
            <form onSubmit={handleSubmit} className='form py-3 p-8 col'>
                <div className='grid grid-cols-4 gap-4'>
                    <div className="col">
                        <h3 className='text-[14px] font-[500] mb-2'>Category Name</h3>
                        <input
                            type="text"
                            placeholder='Category Name'
                            className='w-full h-[40px] rounded-[5px] border p-3'
                            name="name"
                            value={formFields.name}
                            onChange={onChangeInput}
                        />
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-6 gap-4">
                    <div className="col">
                        <h3 className='font-[700] text-[18px] mb-5'>Media & Images</h3>
                        <UploadBox
                            name="image"
                            multiple={true}
                            onFilesSelect={handleFilesSelect}
                            resetTrigger={resetUploadBox}
                            existingFiles={formFields.image}
                        />
                    </div>
                </div>

                <div className='w-[250px] mt-8'>
                    <Button
                        type="submit"
                        className='!w-full !bg-[#3872fa] !text-white'
                        disabled={formFields.image.length === 0}
                    >
                        <MdCloudUpload size={25} className='mr-2' />
                        Publish and View
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default AddCategoryList;
