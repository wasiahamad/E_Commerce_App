import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountSideBar from '../../components/AccountSideBar';
import { Button } from '@mui/material';
import { BsBagCheck } from 'react-icons/bs';
import { getData, deleteData } from '../../utils/api';

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await getData('/api/v1/myList');
      if (res && res.data) setItems(res.data);
      else setItems([]);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleRemove = async (id) => {
    try {
      await deleteData(`/api/v1/myList/remove/${id}`);
      fetchList();
    } catch (err) {
      console.error('Error removing wishlist item:', err);
    }
  };

  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <AccountSideBar />
        </div>

        <div className="col2 w-[70%]">
          <div className="shadow-md rounded-md bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
              <h4 className="text-[18px] font-[600] text-[#000] opacity-75">My Wishlist</h4>
              <p className="mt-0">
                There are <span className="font-bold text-primary">{items.length}</span> items in your wishlist
              </p>
            </div>

            {loading && <p className="p-4">Loading...</p>}
            {!loading && items.length === 0 && <p className="p-4">Your wishlist is empty</p>}

            {!loading && items.map((it) => (
              <div key={it._id} className="flex items-center gap-4 p-4 border-b border-[rgba(0,0,0,0.05)]">
                <div className="w-[90px] h-[90px] flex items-center justify-center bg-[#f7f7f7] rounded-md overflow-hidden">
                  <img src={Array.isArray(it.image) ? it.image[0] : it.image} alt={it.productTitle} className="object-cover w-full h-full" />
                </div>

                <div className="flex-1">
                  <Link to={`/productDetails/${it.productId}`} className="text-[15px] font-[600] block">{it.productTitle}</Link>
                  <p className="text-[14px] text-[rgba(0,0,0,0.6)] mt-1">{it.brand}</p>
                  <p className="text-[16px] font-bold text-[#ff5252] mt-2">₹{it.price}</p>
                </div>

                <div className="w-[120px] text-right">
                  <button onClick={() => handleRemove(it._id)} className="text-sm text-[#ff5252] border border-[#ff5252] rounded-md px-3 py-2">Remove</button>
                </div>
              </div>
            ))}

          </div>
        </div>

        <div className="col3 w-[10%]">{/* empty spacer to maintain layout */}</div>
      </div>
    </section>
  );
};

export default Wishlist;
