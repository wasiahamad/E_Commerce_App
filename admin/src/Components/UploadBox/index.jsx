import React, { useContext, useState, useEffect } from "react";
import { FaImages } from "react-icons/fa6";
import { MyContext } from "../../App";

const UploadBox = ({ name, multiple, onFilesSelect, resetTrigger, existingFiles = [] }) => {
    const context = useContext(MyContext);
    const [selectedFiles, setSelectedFiles] = useState(existingFiles);
    const [previewUrls, setPreviewUrls] = useState([]);
    const createdObjectUrlsRef = React.useRef([]);

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
        if (typeof onFilesSelect === 'function') onFilesSelect(updatedFiles);
        console.log("Updated Files:", updatedFiles); // Debugging line
    };

    // Keep internal selectedFiles in sync when parent provides existingFiles
    useEffect(() => {
        try {
            const filesArray = Array.isArray(existingFiles) ? existingFiles : (existingFiles ? [existingFiles] : []);
            setSelectedFiles(filesArray);
            // Inform parent about the existing files so their state stays consistent
            if (typeof onFilesSelect === 'function') {
                onFilesSelect(filesArray);
            }
        } catch (err) {
            console.error('UploadBox existingFiles sync error', err);
        }
    }, [resetTrigger, existingFiles]);

    // Generate preview URLs for selectedFiles. For File objects createObjectURL once;
    // for string URLs use them directly. Revoke created object URLs on change/unmount.
    useEffect(() => {
        // Revoke previously created object URLs
        if (createdObjectUrlsRef.current && createdObjectUrlsRef.current.length) {
            createdObjectUrlsRef.current.forEach(u => {
                try { URL.revokeObjectURL(u); } catch (e) { /* ignore */ }
            });
            createdObjectUrlsRef.current = [];
        }

        const urls = selectedFiles.map(file => {
            if (file instanceof File) {
                const u = URL.createObjectURL(file);
                createdObjectUrlsRef.current.push(u);
                return u;
            }
            // assume it's an existing URL string
            return file;
        });
        setPreviewUrls(urls);

        return () => {
            // revoke on cleanup
            if (createdObjectUrlsRef.current && createdObjectUrlsRef.current.length) {
                createdObjectUrlsRef.current.forEach(u => {
                    try { URL.revokeObjectURL(u); } catch (e) { /* ignore */ }
                });
                createdObjectUrlsRef.current = [];
            }
        };
    }, [selectedFiles]);

    return (
        <div className="w-full flex items-start gap-4 flex-wrap">
            {/* Thumbnails first (each inside a dashed box like the upload box) */}
            {selectedFiles.length > 0 && (
                <div className="flex items-start gap-4">
                    {previewUrls.map((src, idx) => (
                        <div key={idx} className="relative uploadBoxWrapper">
                            <div className={`uploadBox rounded-md overflow-hidden border border-dashed h-[150px] w-[150px] flex-shrink-0 ${idx === 0 ? 'ring-2 ring-yellow-300' : ''}`}>
                                <img src={src} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    // remove this image
                                    const updated = selectedFiles.filter((_, i) => i !== idx);
                                    setSelectedFiles(updated);
                                    if (typeof onFilesSelect === 'function') onFilesSelect(updated);
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                title="Remove"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload box last (inline with thumbnails) */}
            <div className="uploadBox p-3 rounded-md border border-dashed h-[150px] w-[150px] flex-shrink-0 cursor-pointer hover:bg-gray-200 flex flex-row items-center justify-center relative">
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
        </div>
    );

};

export default UploadBox;

