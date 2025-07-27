import React from 'react'
import Button from '@mui/material/Button';
import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div className='searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative flex items-center justify-between'>
        <input type="text" className='w-[100%] h-[100%] rounded-[5px] px-4 outline-none bg-[#e5e5e5] text-[14px] font-[500]' placeholder='Search for products....' />
        <Button className='rounded-full w-[50px] h-[50px] !text-black'><CiSearch size={25} color='black' /></Button>
    </div>
  )
}

export default Search