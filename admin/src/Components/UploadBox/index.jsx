import React, { useContext, useState, useEffect } from "react";
import { FaImages } from "react-icons/fa6";
import { MyContext } from "../../App";

const UploadBox = ({ name, multiple, onFilesSelect, resetTrigger, existingFiles = [] }) => {
    const context = useContext(MyContext);
    const [selectedFiles, setSelectedFiles] = useState(existingFiles);

    const onChangeFile = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file =>
            ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)
        );

        if (validFiles.length !== files.length) {
            context.alertBox("error", "Some files are invalid. Only JPG, PNG, WEBP allowed.");
            return;
        }

        const updatedFiles = multiple
            ? [...selectedFiles, ...validFiles]
            : validFiles;

        setSelectedFiles(updatedFiles);
        onFilesSelect(updatedFiles);
        console.log("Updated Files:", updatedFiles); // Debugging line
    };

    // useEffect(() => {
    //     const filesArray = Array.isArray(existingFiles) ? existingFiles : [existingFiles];
    //     setSelectedFiles(filesArray);
    //     console.log("Existing Files Updated:", filesArray); // Debugging line
    // }, [resetTrigger, existingFiles]);

    return (
        <div className="w-full">
            <div className="uploadBox p-3 rounded-md border border-dashed h-[150px] w-full cursor-pointer hover:bg-gray-200 flex flex-col items-center justify-center relative">
                <FaImages size={40} className="text-[rgba(0,0,0,0.5)]" />
                <h4 className="text-[14px] text-[rgba(0,0,0,0.5)]">Image Upload</h4>
                <input
                    type="file"
                    multiple={multiple}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={onChangeFile}
                    name={name}
                />
            </div>

            {selectedFiles.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {selectedFiles.map((file, idx) => (
                        <img
                            key={idx}
                            src={file instanceof File ? URL.createObjectURL(file) : file}
                            alt={`preview-${idx}`}
                            className="w-[80px] h-[80px] object-cover rounded"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UploadBox;

