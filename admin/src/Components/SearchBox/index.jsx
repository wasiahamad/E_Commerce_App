import React from 'react'
import { IoSearch } from "react-icons/io5";

const SearchBox = ({ value = "", onChange = () => {}, placeholder = "Search" }) => {
  return (
    <div className='searchBox w-full h-auto bg-[#e5e5e5] rounded-[5px] relative flex items-center justify-between overflow-hidden'>
        <IoSearch size={25} className='absolute left-3 !z-50 text-[#8a8a8a]' />
        <input value={value} onChange={(e) => onChange(e.target.value)} type="text" placeholder={placeholder} className='w-full h-[45px] rounded-[5px] outline-none border-none bg-transparent pl-10' />

    </div>   
  )
}

export default SearchBox