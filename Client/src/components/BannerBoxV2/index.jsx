import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

const BannerBoxV2 = (props) => {
  return (
    <div className="banner-box-v2 w-full overflow-hidden rounded-md group relative ">
        <img src={props.img} alt="banner" 
        className='w-full transition-all duration-150 group-hover:scale-105 '/>

        <div className={`info absolute p-5 top-0 ${props.info==='left' ? 'left-0' : 'right-0'} w-[50%] h-[100%] flex items-center justify-center flex-col gap-2`}>
            <h3 className="text-[20px] font-[600] mb-1">Samsung Fear VR Cemara</h3>
            <span className="w-full text-[17px] font-[700] text-primary">$523.12</span>
            
            <div className="w-full">
                <Link to="/product/1" className='link'>
                    <Button className=" bg-primary text-[16px] font-[500] !text-[#000] !underline py-2 rounded-md hover:bg-[#ff5252] hover:!text-white  hover:!no-underline transition-all duration-150">
                        Shop Now
                    </Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default BannerBoxV2