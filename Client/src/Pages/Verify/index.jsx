import React, { useState } from 'react'
import OtpBox from '../../components/OtpBox';
import { Button } from '@mui/material';

const Verify = () => {
    const [otp, setOtp] = useState('');

    const handleOtpChange = (e) => {
        setOtp(e);
    };

    const verifyOtp = (e) => {
        e.preventDefault();
        // console.log(otp);
        alert("OTP verified successfully");
    }

    return (
        <section className="section py-10">
            <div className="container">
                <div className="card shadow-md w-[400px] mx-auto rounded-md bg-white p-5 px-12 ">
                    <div className="flex items-center justify-center">
                        <img src="https://ecommerce-frontend-view.netlify.app/verify3.png" alt="" className="w-[80px] h-[80px] object-cover" />
                    </div>
                    <h2 className="text-[18px] font-semibold text-black text-center mt-4">
                        Verify OTP
                    </h2>
                    <p className="text-[14px] font-[400] text-[rgba(0,0,0,0.6)] text-center">
                        OTP sent to
                        <span className="font-bold text-primary"> random58@gmail.com</span>
                    </p>

                    <form action="" onSubmit={verifyOtp}>
                        <OtpBox length={6} onChange={handleOtpChange} />

                        <div className="flex items-center justify-center mt-5 px-3">
                            <Button type='submit' className='!text-[14px] !bg-[#ff5252] !font-[600] !text-[#fff] !py-3 hover:!bg-[#000] hover:!text-[#ff5252] !transition-all !duration-150 w-full'>Verify OTP</Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Verify