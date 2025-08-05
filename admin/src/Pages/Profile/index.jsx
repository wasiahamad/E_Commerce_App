import React, { useContext } from "react";
import { MyContext } from "../../App";

const Profile = () => {
    const context = useContext(MyContext);
    return (
        <>
            <div className={`contentRight  py-4 px-5 ${context.isSidebarOpen ? "w-[80%]" : "w-[100%] pl-0"} transition-all duration-300`}>

                <div className="w-full bg-white pt-5 border border-[rgba(0,0,0,0.1)] shadow-md sm:rounded-lg ">
                    <h2 className="text-[18px] font-[600]">
                        User Profile
                    </h2>
                </div>
            </div>
        </>
    )
};

export default Profile;