import React from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button, Rating } from "@mui/material";

/**
 * Props:
 * - item: { id, title, brand, images: [], price, mrp, rating }
 * - onRemove(itemId)
 * - onAddToCart(item)
 */
const ListCartItems = ({ item, onRemove = () => { }, onAddToCart = () => { } }) => {
    if (!item) return null;

    const id = item._id || item.id || item.productId;
    const image = (item.images && item.images[0]) || item.image || item.img || "";
    const title = item.name || item.title || item.productTitle || item.productName || "Untitled product";
    const brand = item.brand || item.vendor || item.manufacturer || "";
    const rating = item.rating || item.avgRating || 0;
    const price = item.price ?? item.salePrice ?? item.amount ?? 0;
    const mrp = item.mrp ?? item.listPrice ?? price;
    const discount = mrp && price ? Math.round(((mrp - price) / mrp) * 100) : 0;

    return (
        <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)] ">
            <div className="img w-[15%] rounded-md overflow-hidden ">
                <Link to={`/productDetails/${id}`} className="group">
                    <img src={image} alt={title} className="w-full group-hover:scale-105" />
                </Link>
            </div>

            <div className="info w-[85%] relative">
                    <IoMdClose
                    className="text-[20px] text-[#000] cursor-pointer absolute top-[10px] right-[0px] link"
                    onClick={() => onRemove(item.id || item._id)}
                    title="Remove from list"
                />

                {brand ? <span className="text-[12px] font-[300]">{brand}</span> : null}

                <h4 className="text-[15px] font-[600] text-[#000]">
                    <Link to={`/productDetails/${id}`} className="link">
                        {title}
                    </Link>
                </h4>

                <Rating name="size-small" value={rating} size="small" readOnly className="!text-[15px]" />

                <div className="flex items-center gap-4 mt-2">
                    <p className="text-[14px] font-[500] text-[rgba(0,0,0,0.8)]">
                        <span className="text-[#000] font-[600]">₹{price}</span>
                        {mrp && mrp > price ? (
                            <span className="text-[rgba(0,0,0,0.5)] line-through ml-2">₹{mrp}</span>
                        ) : null}
                    </p>
                    {discount > 0 ? <p className="text-[14px] font-[600] text-[#ff5252] py-1">{discount}% off</p> : null}
                </div>

                <div className="mt-3 flex gap-4">
                    <Button
                        className="!bg-[#ff5252] !text-white !py-1 !px-3 mr-3 !border-[#ff5252] !border-[1px] hover:!bg-[#fff] hover:!text-[#ff5252]"
                        onClick={() => onAddToCart(item)}
                        variant="contained"
                    >
                        Add to Cart
                    </Button>
                    <Button
                        className="!bg-[#fff] !text-[#ff5252] hover:!bg-[#ff5252] hover:!text-[#fff] !py-1 !px-3 mr-3 !border-[#ff5252] !border-[1px]"
                        variant="contained" onClick={() => onRemove(item.id || item._id)}>
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ListCartItems;
