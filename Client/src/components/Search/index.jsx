import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { getData } from '../../utils/api';

const Search = () => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const doSearch = (ev) => {
    ev && ev.preventDefault && ev.preventDefault();
    const trimmed = (q || "").trim();
    if (!trimmed) return;
    // Try to resolve the query to a specific product first.
    // If we get an exact or single match, go to product details with category id; otherwise go to listing.
    (async () => {
      try {
        const res = await getData(`/api/v1/product/public-search?query=${encodeURIComponent(trimmed)}&page=1&perPage=5`);
        const results = res?.data || [];
        if (Array.isArray(results) && results.length === 1) {
          const p = results[0];
          const catId = p.catId || (p.category && p.category._id) || '';
          navigate(`/productDetails/${p._id}?categoryId=${encodeURIComponent(catId)}`);
          return;
        }

        // if first result exactly matches the query (case-insensitive), go straight to details
        if (Array.isArray(results) && results.length > 0) {
          const first = results[0];
          if ((first.name || '').toLowerCase() === trimmed.toLowerCase()) {
            const catId = first.catId || (first.category && first.category._id) || '';
            navigate(`/productDetails/${first._id}?categoryId=${encodeURIComponent(catId)}`);
            return;
          }
        }

        // fallback: go to listing with the search query
        navigate(`/productListing?query=${encodeURIComponent(trimmed)}`);
      } catch (err) {
        // network error or server error: fallback to listing
        console.error('Search resolve error', err);
        navigate(`/productListing?query=${encodeURIComponent(trimmed)}`);
      }
    })();
  }

  return (
    <form onSubmit={doSearch} className='searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative flex items-center justify-between'>
      <input value={q} onChange={(e) => setQ(e.target.value)} type="text" className='w-[100%] h-[100%] rounded-[5px] px-4 outline-none bg-[#e5e5e5] text-[14px] font-[500]' placeholder='Search for products....' />
      <Button type="submit" className='rounded-full w-[50px] h-[50px] !text-black'><CiSearch size={25} color='black' /></Button>
    </form>
  )
}

export default Search