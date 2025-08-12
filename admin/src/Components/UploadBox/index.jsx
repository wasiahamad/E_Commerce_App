// import React from "react";
// import { useState } from "react";
// import { FaImages } from "react-icons/fa6";
// import { createCategory } from '../../utils/api';
// import { MyContext } from "../../App";
// import { useContext } from "react";

// const UploadBox = (props) => {
//     const context = useContext(MyContext);
//     const [uploadedImage, setUploadedImage] = useState(false);
//     const [previewImage, setPreviewImage] = useState(null);
//     let selectedImg = [];
//     const formData = new FormData();

//     // Function to handle file upload
//     const onChangeFile = (e, apiUrl) => {
//         try {
//             setPreviewImage([]);
//             const file = e.target.files;
//             setUploadedImage(true);
//             console.log(file);
//             for (let i = 0; i < file.length; i++) {
//                 if (file[i] && file[i].type === "image/jpeg" || file[i].type === "image/png" || file[i].type === "image/jpg" || file[i].type === "image/webp") {
//                     const files = file[i];
//                     selectedImg.push(files);
//                     formData.append(props?.name, files);
//                 } else {
//                     context.alertBox("error", "Invalid file format selected. Please select an image file.");
//                     setUploadedImage(false);
//                     return;
//                 }
//             }

//             createCategory(apiUrl , formData)
//                 .then((res) => {
//                     console.log("res", res);
//                     if (res?.error !== true) {
//                         context.alertBox("success", res?.message || "Image uploaded successfully.");
//                         setUploadedImage(false);
//                         setPreviewImage(res?.data?.avatar);
//                         localStorage.setItem("userAvatar", res?.data?.avatar);
//                         // window.location.reload();
//                     } else {
//                         context.alertBox("error", "Invalid file format selected. Please select an image file.");
//                         setUploadedImage(false);
//                         return;
//                     }
//                 });
//         } catch (error) {
//             console.error("Error uploading file:", error);
//             context.alertBox("error", error.message || "Error uploading file");
//         }
//     }
//     return (
//         <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] cursor-pointer hover:bg-gray-200 flex flex-col items-center justify-center relative ">
//             <FaImages size={40} className="text-[rgba(0,0,0,0.5)]" />
//             <h4 className="text-[14px] text-[rgba(0,0,0,0.5)]">Image Upload</h4>
//             <input 
//                 type="file"
//                 multiple={props.multiple !== undefined ? props.multiple : false}
//                 className="absolute top-0 left-0 w-[100%] h-[100%] cursor-pointer opacity-0"
//                 accept="image/*"
//                 onChange={(e) => {
//                     onChangeFile(e, props?.apiUrl);
//                 }}
//                 name={props?.name}
//             />
//         </div>
//     );
// };

// export default UploadBox;



// // UploadBox.jsx
// import React, { useState } from "react";
// import { FaImages } from "react-icons/fa6";
// import { MyContext } from "../../App";
// import { useContext } from "react";

// const UploadBox = ({ name, multiple, onFilesSelect }) => {
//     const context = useContext(MyContext);
//     const onChangeFile = (e) => {
//         const files = e.target.files;
//         const validFiles = [];

//         for (let i = 0; i < files.length; i++) {
//             if (
//                 files[i].type === "image/jpeg" ||
//                 files[i].type === "image/png" ||
//                 files[i].type === "image/jpg" ||
//                 files[i].type === "image/webp"
//             ) {
//                 validFiles.push(files[i]);
//                 context.alertBox("success", "Image uploaded successfully.");
//             } else {
//                 context.alertBox("error", "Invalid file format selected. Please select an image file.");
//                 return;
//             }
//         }

//         onFilesSelect(validFiles); // Pass files to parent
//     };



//     return (
//         <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] cursor-pointer hover:bg-gray-200 flex flex-col items-center justify-center relative ">
//             <FaImages size={40} className="text-[rgba(0,0,0,0.5)]" />
//             <h4 className="text-[14px] text-[rgba(0,0,0,0.5)]">Image Upload</h4>
//             <input
//                 type="file"
//                 multiple={multiple}
//                 className="absolute top-0 left-0 w-[100%] h-[100%] cursor-pointer opacity-0"
//                 accept="image/*"
//                 onChange={onChangeFile}
//                 name={name}
//             />
//         </div>
//     );
// };

// export default UploadBox;



// // UploadBox.jsx
// import React, { useState, useContext } from "react";
// import { FaImages } from "react-icons/fa6";
// import { MyContext } from "../../App";

// const UploadBox = ({ name, multiple, onFilesSelect }) => {
//     const context = useContext(MyContext);
//     const [selectedFiles, setSelectedFiles] = useState([]); // Store selected files for display

//     const onChangeFile = (e) => {
//         const files = e.target.files;
//         const validFiles = [];

//         for (let i = 0; i < files.length; i++) {
//             if (
//                 files[i].type === "image/jpeg" ||
//                 files[i].type === "image/png" ||
//                 files[i].type === "image/jpg" ||
//                 files[i].type === "image/webp"
//             ) {
//                 validFiles.push(files[i]);
//                 context.alertBox("success", "Image uploaded successfully.");
//             } else {
//                 context.alertBox(
//                     "error",
//                     "Invalid file format selected. Please select an image file."
//                 );
//                 return;
//             }
//         }

//         setSelectedFiles(validFiles); // store locally for UI display
//         onFilesSelect(validFiles); // pass to parent
//     };

//     return (
//         <div className="w-full">
//             {/* Upload box */}
//             <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] cursor-pointer hover:bg-gray-200 flex flex-col items-center justify-center relative">
//                 <FaImages size={40} className="text-[rgba(0,0,0,0.5)]" />
//                 <h4 className="text-[14px] text-[rgba(0,0,0,0.5)]">
//                     Image Upload
//                 </h4>
//                 <input
//                     type="file"
//                     multiple={multiple}
//                     className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
//                     accept="image/*"
//                     onChange={onChangeFile}
//                     name={name}
//                 />
//             </div>

//             {/* Show selected file names + preview */}
//             {selectedFiles.length > 0 && (
//                 <div className="mt-3 space-y-2">
//                     {selectedFiles.map((file, idx) => (
//                         <div
//                             key={idx}
//                             className="flex items-center gap-3 p-2 border rounded-md bg-gray-50"
//                         >
//                             {/* Preview */}
//                             <img
//                                 src={URL.createObjectURL(file)}
//                                 alt="preview"
//                                 className="w-12 h-12 object-cover rounded"
//                             />
//                             {/* File name */}
//                             <span className="text-sm text-gray-700 truncate">
//                                 {file.name}
//                             </span>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UploadBox;





import React, { useState, useContext, useEffect } from "react";
import { FaImages } from "react-icons/fa6";
import { MyContext } from "../../App";

const UploadBox = ({ name, multiple, onFilesSelect, resetTrigger }) => {
    const context = useContext(MyContext);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const onChangeFile = (e) => {
        const files = e.target.files;
        const validFiles = [];

        for (let i = 0; i < files.length; i++) {
            if (
                files[i].type === "image/jpeg" ||
                files[i].type === "image/png" ||
                files[i].type === "image/jpg" ||
                files[i].type === "image/webp"
            ) {
                validFiles.push(files[i]);
                context.alertBox("success", "Image selected successfully.");
            } else {
                context.alertBox("error", "Invalid file format selected. Please select an image file.");
                return;
            }
        }

        setSelectedFiles(validFiles);
        onFilesSelect(validFiles);
    };

    // 🔹 Listen to reset trigger from parent
    useEffect(() => {
        setSelectedFiles([]);
    }, [resetTrigger]);

    return (
        <div className="w-full">
            <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] cursor-pointer hover:bg-gray-200 flex flex-col items-center justify-center relative">
                <FaImages size={40} className="text-[rgba(0,0,0,0.5)]" />
                <h4 className="text-[14px] text-[rgba(0,0,0,0.5)]">Image Upload</h4>
                <input
                    type="file"
                    multiple={multiple}
                    className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
                    accept="image/*"
                    onChange={onChangeFile}
                    name={name}
                />
            </div>

            {selectedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                    {selectedFiles.map((file, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-3 p-2 border rounded-md bg-gray-50"
                        >
                            <img
                                src={URL.createObjectURL(file)}
                                alt="preview"
                                className="w-12 h-12 object-cover rounded"
                            />
                            <span className="text-sm text-gray-700 truncate">
                                {file.name}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UploadBox;





