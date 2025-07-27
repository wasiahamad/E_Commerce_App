import React from 'react'
import ListCartItems from './ListCartItems';
import AccountSideBar from '../../components/AccountSideBar';



const Card = () => {

    return (

        <section className='py-10 w-full'>
            <div className="container flex gap-5">
                <div className="col1 w-[20%]">
                    <AccountSideBar />
                </div>

                <div className="col2 w-[70%]">
                    <div className="shadow-md rounded-md bg-white">
                        <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                            <h4 className="text-[18px] font-[600] text-[#000] opacity-75">Your List</h4>
                            <p className="mt-0">
                                There are <span className="font-bold text-primary">4</span> items in your list
                            </p>
                        </div>
                        <ListCartItems />
                        <ListCartItems />
                        <ListCartItems />
                        <ListCartItems />
                        <ListCartItems />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Card