import React from "react";
import { useState } from "react";
import { FaImages } from "react-icons/fa6";
import { createCategory } from '../../utils/api';
import { MyContext } from "../../App";
import { useContext } from "react";


const UploadBox = (props) => {
    const context = useContext(MyContext);
    const [uploadedImage, setUploadedImage] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    // useEffect(() => {
    //     // Fetch user avatar from local storage or API if needed
    //     const userAvatar = localStorage.getItem("userAvatar");
    //     if (userAvatar) {
    //         setPreviewImage(userAvatar);
    //     }
    // }, [context?.userData]);

    let selectedImg = [];
    const formData = new FormData();

    // Function to handle file upload
    const onChangeFile = (e, apiUrl) => {
        try {
            setPreviewImage([]);
            const file = e.target.files;
            setUploadedImage(true);
            console.log(file);
            for (let i = 0; i < file.length; i++) {
                if (file[i] && file[i].type === "image/jpeg" || file[i].type === "image/png" || file[i].type === "image/jpg" || file[i].type === "image/webp") {
                    const files = file[i];
                    selectedImg.push(files);
                    formData.append(props?.name, files);
                } else {
                    context.alertBox("error", "Invalid file format selected. Please select an image file.");
                    setUploadedImage(false);
                    return;
                }
            }

            createCategory(apiUrl , formData)
                .then((res) => {
                    console.log("res", res);
                    if (res?.error !== true) {
                        context.alertBox("success", res?.message || "Image uploaded successfully.");
                        setUploadedImage(false);
                        setPreviewImage(res?.data?.avatar);
                        localStorage.setItem("userAvatar", res?.data?.avatar);
                        // window.location.reload();
                    } else {
                        context.alertBox("error", "Invalid file format selected. Please select an image file.");
                        setUploadedImage(false);
                        return;
                    }
                });
        } catch (error) {
            console.error("Error uploading file:", error);
            context.alertBox("error", error.message || "Error uploading file");
        }
    }
    return (
        <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] cursor-pointer hover:bg-gray-200 flex flex-col items-center justify-center relative ">
            <FaImages size={40} className="text-[rgba(0,0,0,0.5)]" />
            <h4 className="text-[14px] text-[rgba(0,0,0,0.5)]">Image Upload</h4>
            <input type="file"
                multiple={props.multiple !== undefined ? props.multiple : false}
                className="absolute top-0 left-0 w-[100%] h-[100%] cursor-pointer opacity-0"
                accept="image/*"
                onChange={(e) => {
                    onChangeFile(e, props?.apiUrl);
                }}
                name={props?.name}
            />
        </div>
    );
};

export default UploadBox;
