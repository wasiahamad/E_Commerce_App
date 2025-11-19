import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";

const QtyBox = ({ value: controlledValue, onChange, min = 1, max = 999 }) => {
    const [qty, setQty] = useState(controlledValue ?? 1);

    useEffect(() => {
        if (controlledValue !== undefined && controlledValue !== qty) setQty(controlledValue)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controlledValue])

    const plusQty = () => {
        const next = Math.min(max, qty + 1)
        if (onChange) onChange(next)
        else setQty(next)
    }

    const minusQty = () => {
        const next = Math.max(min, qty - 1)
        if (onChange) onChange(next)
        else setQty(next)
    }

    return (
        <div className="qtyBox flex items-center relative">
            <input type="number" className='w-full h-[40px] p-2 text-[15px] focus:outline-none border border-[rgba(0,0,0,0.2)] rounded-md ' value={qty} readOnly />

            <div className="flex items-center justify-between flex-col h-[40px] absolute top-0 right-0">
                <Button className='!min-w-[30px] w-[30px] h-[20px] !text-[#000]' onClick={plusQty}><FaAngleUp className='!text-[12px] text-[#8a8a8a]'/></Button>
                <Button className='!min-w-[30px] w-[30px] h-[20px] !text-[#000]' onClick={minusQty}><FaAngleDown className='!text-[12px] text-[#8a8a8a]'/></Button>
            </div>
        </div>
    )
}

export default QtyBox