import { Button, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react'
import { MdCloudUpload } from 'react-icons/md';

const AddAddress = () => {
    const [productCategory1, setProductCategory1] = useState('');
    const [productCategory2, setProductCategory2] = useState('');
    return (
        <section className='p-5 bg-gray-50'>
            <form action="" className='form py-3 p-8'>
                <div className=' max-h-[70vh] overflow-y-scroll pr-4'>
                    <div className="grid grid-cols-4 mb-3 gap-5">
                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'> Add Address</h3>
                            <input type="text" placeholder='address line' className='w-full h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3' />
                        </div>

                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'> City</h3>
                            <input type="text" placeholder='city' className='w-full h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3' />
                        </div>

                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'> State</h3>
                            <input type="text" placeholder='state' className='w-full h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3' />
                        </div>

                        <div className="col">
                            <h3 className='text-[14px] font-[500] mb-1'>Country</h3>
                            <input type="text" placeholder='address line' className='w-full h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3' />
                        </div>
                    </div>

                    

                    
                </div>
                {/* <br /><hr /> */}
                <div className='w-[250px]'>
                    <Button type="submit" className='!w-full !font-[600] !text-[16px] !bg-[#3872fa] !text-white !py-2 !rounded-[5px] !mt-5 !hover:bg-[#1a6df1]'>
                        <MdCloudUpload size={25} className='mr-2' />
                        Publish and View
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default AddAddress