import React, { useState } from 'react'
import './style.css'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Collapse } from 'react-collapse';
import { FaAngleDown } from "react-icons/fa6";
import { Button } from '@mui/material';
import { FaAngleUp } from "react-icons/fa6";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Rating from '@mui/material/Rating';



const SideBar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isSizeOpen, setIsSizeOpen] = useState(true);

    return (
        <aside className='sidebar py-5' >
            <div className="box">
                <h3 className='w-full text-[16px] font-[600] mb-3 flex items-center pr-5 '>
                    Shop by Category
                    <Button onClick={() => setIsOpen(!isOpen)} className='!w-[30px] !h-[30px] !min-w[30px] !rounded-full !text-[#000] !ml-auto '>
                        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </Button>
                </h3>
                <Collapse isOpened={isOpen}>
                    <div className="scroll px-3 relative -left-[10px]">
                        <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Fashion" className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="Electronics" className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="Bags" className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="Footwear" className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="Grocery" className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="Beauty" className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="wellness" className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="Jewellery" className='w-full' />
                    </div>
                </Collapse>
            </div>

            <div className="box mt-4">
                <h3 className='w-full text-[16px] font-[600] mb-3 flex items-center pr-5 '>
                    Shop by Category
                    <Button onClick={() => setIsSizeOpen(!isSizeOpen)} className='!w-[30px] !h-[30px] !min-w[30px] !rounded-full !text-[#000] !ml-auto '>
                        {isSizeOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </Button>
                </h3>
                <Collapse isOpened={isSizeOpen}>
                    <div className="scroll px-3 relative -left-[10px]">
                        <FormControlLabel control={<Checkbox size="small" />} label="Small (50)" className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="Medium (55) " className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="Large (60) " className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="Extra Large (65) " className='w-full' />
                        <FormControlLabel control={<Checkbox size="small" />} label="Xtra Extra Large (70) " className='w-full' />
                    </div>
                </Collapse>
            </div>

            <div className="box mt-4">
                <h3 className='w-full text-[16px] font-[600] mb-3 flex items-center pr-5 '>
                    Filter by Price
                </h3>
                <RangeSlider />
                <div className="flex pt-4 pb-2 priceRange">
                    <span className='text-[13px]'>
                        from: <strong className='text-dark'>Rs: 50</strong>
                    </span>
                    <span className='ml-auto text-[13px]'>
                        from: <strong className='text-dark'>Rs: 5000</strong>
                    </span>
                </div>
            </div>

            <div className="box mt-4">
                <h3 className='w-full text-[16px] font-[600] mb-3 flex items-center pr-5 '>
                    Filter by Rating
                </h3>

                <div className="w-full">
                    <FormControlLabel control={<Checkbox size='small' />} label={<Rating name="size-small" defaultValue={5} size="small" readOnly />} />
                </div>
                <div className="w-full">
                    <FormControlLabel control={<Checkbox size='small' />} label={<Rating name="size-small" defaultValue={4} size="small" readOnly />} />
                </div>
                <div className="w-full">
                    <FormControlLabel control={<Checkbox size='small' />} label={<Rating name="size-small" defaultValue={3} size="small" readOnly />} />
                </div>
                <div className="w-full">
                    <FormControlLabel control={<Checkbox  size='small'/>} label={<Rating name="size-small" defaultValue={2} size="small" readOnly />}/>
                </div>
                <div className="w-full">
                    <FormControlLabel control={<Checkbox size='small' />} label={<Rating name="size-small" defaultValue={1} size="small" readOnly />} />
                </div>

            </div>
        </aside>
    )
}

export default SideBar