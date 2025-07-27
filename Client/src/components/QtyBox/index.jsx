import React, { useState } from 'react'
import { Button } from '@mui/material'
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

const QtyBox = () => {
    const [qty, setQty] = useState(1);

    const plusQty = () => {
        setQty(qty + 1);
    }

    const minusQty = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    }

    return (
        <div className="qtyBox flex items-center relative">
            <input type="number" className='w-full h-[40px] p-2 text-[15px] focus:outline-none border border-[rgba(0,0,0,0.2)] rounded-md ' value={qty} />

            <div className="flex items-center justify-between flex-col h-[40px] absolute top-0 right-0">
                <Button className='!min-w-[30px] w-[30px] h-[20px] !text-[#000]' onClick={plusQty}><FaAngleUp className='!text-[12px] text-[#8a8a8a]'/></Button>
                <Button className='!min-w-[30px] w-[30px] h-[20px] !text-[#000]' onClick={minusQty}><FaAngleDown className='!text-[12px] text-[#8a8a8a]'/></Button>
            </div>
        </div>
    )
}

export default QtyBox