// import { Button } from '@mui/material'
// import UploadBox from '../../Components/UploadBox';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
// import { IoMdClose } from "react-icons/io";
// import { MdCloudUpload } from "react-icons/md";
// import { useState } from 'react';


// const AddCategoryList = () => {
//     const [formFileds, setFormFileds] = useState({
//         name: '',
//         image: []
//     });

//     // function to handle input change
//     const onChangeInput = (e) => {
//         const { name, value } = e.target;
//         setFormFileds(() => {
//             return {
//                 ...formFileds,
//                 [name]: value,
//             };
//         });
//     };


//     return (
//         <section className='p-5 bg-gray-50'>
//             <form action=""  className='form py-3 p-8'>
//                 <div className=' max-h-[70vh] overflow-y-scroll pr-4'>
//                     <div className="grid grid-cols-4 mb-3">
//                         <div className="col">
//                             <h3 className='text-[14px] font-[500] mb-1'>Product Name</h3>
//                             <input
//                                 type="text"
//                                 placeholder='Product Name'
//                                 className='w-full h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3'
//                                 name="name"
//                                 value={formFileds.name}
//                                 onChange={onChangeInput}
//                             />
//                         </div>
//                     </div>

//                     <div className="col w-full p-5 px-0 ">
//                         <h3 className='font-[700] text-[18px] mb-3'>Media & Images</h3>
//                         <div className="grid grid-cols-7 gap-4 ">
//                             <div className="uploadBoxWrapper relative">
//                                 <span className='absolute z-50 bg-red-700 -top-[5px] -right-[5px] rounded-full flex items-center justify-center text-white w-[20px] h-[20px] cursor-pointer'
//                                 ><IoMdClose className='text-white' size={16} />
//                                 </span>
//                                 <div className="uploadBox  rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] cursor-pointer hover:bg-gray-200 flex flex-col items-center justify-center relative ">
//                                     <LazyLoadImage                                   
//                                         className='w-[100%] h-[100%] object-cover'
//                                         effect="blur"
//                                         wrapperProps={{
//                                             // If you need to, you can tweak the effect transition using the wrapper style.
//                                             style: { transitionDelay: "1s" },
//                                         }}
//                                         src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
//                                 </div>
//                             </div>
//                             <UploadBox name="image" apiUrl="/api/v1/category/create"  multiple={true} />
//                         </div>
//                     </div>
//                 </div>
//                 {/* <br /><hr /> */}
//                 <div className='w-[250px]'>
//                     <Button type="submit" className='!w-full !font-[600] !text-[16px] !bg-[#3872fa] !text-white !py-2 !rounded-[5px] !mt-5 !hover:bg-[#1a6df1]'>
//                         <MdCloudUpload size={25} className='mr-2' />
//                         Publish and View
//                     </Button>
//                 </div>
//             </form>
//         </section>
//     )
// }

// export default AddCategoryList





// AddCategoryList.jsx
import { Button } from '@mui/material';
import UploadBox from '../../Components/UploadBox';
import { MdCloudUpload } from "react-icons/md";
import { useState, useContext } from 'react';
import { createCategory } from '../../utils/api';
import { MyContext } from "../../App";

const AddCategoryList = () => {
    const [formFields, setFormFields] = useState({
        name: '',
        image: []
    });

    const context = useContext(MyContext);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value
        });
    };

    const handleFilesSelect = (files) => {
        setFormFields({
            ...formFields,
            image: files
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formFields.name || formFields.image.length === 0) {
            context.alertBox("error", "Please fill all fields");
            return;
        }

        const formData = new FormData();
        formData.append("name", formFields.name);
        formFields.image.forEach((file) => {
            formData.append("image", file);
        });

        const res = await createCategory("/api/v1/category/create", formData);
        if (res?.success) {
            context.alertBox("success", "Category created successfully");
            setFormFields({ name: '', image: [] });
        } else {
            context.alertBox("error", res?.message || "Error creating category");
        }
    };

    return (
        <section className='p-5 bg-gray-50'>
            <form onSubmit={handleSubmit} className='form py-3 p-8'>
                <div>
                    <h3 className='text-[14px] font-[500] mb-1'>Category Name</h3>
                    <input
                        type="text"
                        placeholder='Category Name'
                        className='w-full h-[40px] rounded-[5px] border p-3'
                        name="name"
                        value={formFields.name}
                        onChange={onChangeInput}
                    />
                </div>

                <div className="mt-5">
                    <h3 className='font-[700] text-[18px] mb-3'>Media & Images</h3>
                    <UploadBox name="image" multiple={true} onFilesSelect={handleFilesSelect} />
                </div>

                <div className='w-[250px]'>
                    <Button type="submit" className='!w-full !bg-[#3872fa] !text-white'>
                        <MdCloudUpload size={25} className='mr-2' />
                        Publish and View
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default AddCategoryList;






