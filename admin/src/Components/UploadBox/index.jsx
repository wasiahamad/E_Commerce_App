import React from "react";
import { FaImages } from "react-icons/fa6";

const UploadBox = (props) => {
    return (
        <div className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-[100%] cursor-pointer hover:bg-gray-200 flex flex-col items-center justify-center relative ">
            <FaImages size={40} className="text-[rgba(0,0,0,0.5)]" />
            <h4 className="text-[14px] text-[rgba(0,0,0,0.5)]">Image Upload</h4>
            <input type="file" multiple={props.multiple !== undefined ? props.multiple : false} className="absolute top-0 left-0 w-[100%] h-[100%] cursor-pointer opacity-0" accept="image/*"  />
        </div>
    );
};

export default UploadBox;
