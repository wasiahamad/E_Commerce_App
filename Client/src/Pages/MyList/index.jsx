import React, { useEffect, useState } from 'react'
import ListCartItems from './ListCartItems';
import AccountSideBar from '../../components/AccountSideBar';
import { getData, deleteData, postData } from '../../utils/api';
import toast from 'react-hot-toast';

const MyListPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchList = async () => {
        try {
            setLoading(true);
            const res = await getData('/api/v1/myList');
            if (!res?.error) setItems(res.data || []);
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch list');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const handleRemove = async (id) => {
        try {
            const res = await deleteData(`/api/v1/myList/remove/${id}`);
            if (res && !res.error) {
                toast.success('Removed from list');
                fetchList();
            } else {
                toast.error(res.message || 'Failed to remove');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to remove item');
        }
    };

    const handleAddToCart = async (item) => {
        try {
            const payload = { productId: item.productId || item._id || item.id };
            const res = await postData('/api/v1/cart/add', payload);
            if (res && !res.error) {
                toast.success('Added to cart');
                // Optionally remove from myList after adding to cart
                // await deleteData(`/api/v1/myList/remove/${item._id}`);
                // fetchList();
            } else {
                toast.error(res.message || 'Failed to add to cart');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to add to cart');
        }
    };

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
                                There are <span className="font-bold text-primary">{items.length}</span> items in your list
                            </p>
                        </div>

                        {loading ? (
                            <div className="p-6">Loading...</div>
                        ) : (
                            items.length ? (
                                items.map((it) => (
                                    <ListCartItems
                                        key={it._id || it.productId}
                                        item={it}
                                        onRemove={handleRemove}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))
                            ) : (
                                <div className="p-6">No items in your list</div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyListPage