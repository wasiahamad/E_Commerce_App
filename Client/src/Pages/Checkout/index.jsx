import { Button, TextField } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { BsBagCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { getData, postData, deleteDataWithBody } from '../../utils/api';
import { MyContext } from '../../App';

const Checkout = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
    });
    const [cartItems, setCartItems] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [shippingInfo, setShippingInfo] = useState({ shippingCharge: 0, totalAmount: 0 });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const ctx = useContext(MyContext);

    useEffect(() => {
        try {
            const selected = localStorage.getItem('selectedAddress');
            if (selected) {
                // fetch address details from API or local cache
                const addresses = JSON.parse(localStorage.getItem('addresses_cache') || '[]');
                const addr = addresses.find(a => a._id === selected);
                if (addr) {
                    setForm({
                        name: addr.name || '',
                        email: addr.email || '',
                        address: addr.address_line || '',
                        apartment: '',
                        city: addr.city || '',
                        state: addr.state || '',
                        zip: addr.pincode || '',
                        phone: addr.mobile || ''
                    });
                    setSelectedAddressId(addr._id);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await getData('/api/v1/cart');
                // res.data is array of cart product documents with populated productId
                const items = res?.data || [];
                setCartItems(items);
            } catch (err) {
                console.error('Failed to load cart for checkout', err);
            }
        };
        fetchCart();
    }, []);

    // fetch user's saved addresses
    useEffect(() => {
        if (!ctx?.userData?._id) return;
        const load = async () => {
            try {
                const res = await getData(`/api/v1/address/get/${ctx.userData._id}`);
                if (res && !res.error) {
                    setAddresses(res.data || []);
                    try { localStorage.setItem('addresses_cache', JSON.stringify(res.data || [])); } catch (e) {}
                    // if none selected but server returned a selected address, pick it
                    const sel = (res.data || []).find(a => a.selected);
                    if (sel) {
                        setSelectedAddressId(sel._id);
                        setForm({
                            name: sel.name || '',
                            email: sel.email || '',
                            address: sel.address_line || '',
                            apartment: sel.apartment || '',
                            city: sel.city || '',
                            state: sel.state || '',
                            zip: sel.pincode || '',
                            phone: sel.mobile || ''
                        });
                    }
                }
            } catch (err) {
                console.error('Failed to fetch addresses', err);
            }
        };
        load();
    }, [ctx?.userData]);

    // request shipping estimate whenever cartItems, subtotal or selected address/form changes
    useEffect(() => {
        let mounted = true;
        const fetchEstimate = async () => {
            try {
                const items = cartItems.map(ci => ({ productId: ci.productId?._id || ci.productId, price: ci.productId?.price || 0, quantity: ci.quantity || 1 }));
                const addressObj = addresses.find(a => a._id === selectedAddressId) || {
                    address_line: form.address,
                    city: form.city,
                    state: form.state,
                    country: 'India',
                    pincode: form.zip,
                    mobile: form.phone
                };

                // call server-side shipping calculator (estimate)
                const json = await postData('/api/v1/order/estimate', { subtotal: computeSubTotal(), items, address: addressObj });
                if (!mounted) return;
                if (json && json.data) setShippingInfo(json.data);
            } catch (err) {
                console.error('Failed to fetch shipping estimate', err);
            }
        };
        fetchEstimate();
        return () => { mounted = false; };
    }, [cartItems, selectedAddressId, form.address, form.city, form.state, form.zip, form.phone]);

    const handleInput = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const computeSubTotal = () => {
        return cartItems.reduce((acc, it) => {
            const price = Number(it.productId?.price || 0);
            const qty = Number(it.quantity || 1);
            return acc + price * qty;
        }, 0);
    };

    const handlePlaceOrder = async () => {
        // basic validation
        if (!form.name || !form.email || !form.address || !form.city || !form.state || !form.zip || !form.phone) {
            toast.error('Please fill all required fields');
            return;
        }

        if (cartItems.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        setLoading(true);
        try {
            const items = cartItems.map(ci => ({
                productId: ci.productId?._id || ci.productId,
                title: ci.productId?.name || ci.title || '',
                image: ci.productId?.image?.[0] || '',
                price: ci.productId?.price || 0,
                quantity: ci.quantity || 1
            }));

            const delivery_address = selectedAddressId ? selectedAddressId : {
                name: form.name,
                email: form.email,
                address_line: form.address,
                apartment: form.apartment,
                city: form.city,
                state: form.state,
                pincode: form.zip,
                mobile: form.phone
            };

            const payload = {
                items,
                delivery_address,
                paymentMethod: 'cod',
                // include current shipping estimate (server will compute final value and override if needed)
                shippingCharge: shippingInfo.shippingCharge || 0
            };

            const res = await postData('/api/v1/order', payload);
            if (res && !res.error) {
                toast.success('Order placed successfully');
                // clear cart items on server
                for (const ci of cartItems) {
                    try {
                        await deleteDataWithBody('/api/v1/cart/remove', { _id: ci._id, productId: ci.productId?._id || ci.productId });
                    } catch (err) {
                        console.warn('Failed to delete cart item', ci, err);
                    }
                }

                // refresh header/cart counts if context available
                if (ctx && typeof ctx.fetchCartCount === 'function') ctx.fetchCartCount();
                if (ctx && typeof ctx.fetchWishlistCount === 'function') ctx.fetchWishlistCount();

                // navigate to orders page
                navigate('/my-order');
            } else {
                toast.error(res?.message || 'Failed to place order');
            }
        } catch (err) {
            console.error('Order error', err);
            toast.error('Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section py-10">
            <div className="container flex gap-5">
                <div className="leftCol w-[70%]">
                    <div className="card bg-white shadow-md p-5 rounded-md w-full ">
                        <h2>Billing Details</h2>

                        {/* saved addresses */}
                        {addresses.length > 0 && (
                            <div className="mb-4">
                                <h5 className="mb-2">Select saved address</h5>
                                <div className="flex flex-col gap-3">
                                    {addresses.map(addr => (
                                        <label key={addr._id} className={`p-3 border rounded-md flex items-start gap-3 ${selectedAddressId === addr._id ? 'border-primary bg-[#f9fbff]' : 'bg-white'}`}>
                                            <input type="radio" name="selectedAddress" value={addr._id} checked={selectedAddressId === addr._id} onChange={async (e) => {
                                                const id = e.target.value;
                                                setSelectedAddressId(id);
                                                // inform server about selection
                                                try {
                                                    const res = await postData('/api/v1/address/select-address', { addressId: id });
                                                    if (res && !res.error) {
                                                        // update UI and form
                                                        setForm(prev => ({ ...prev, name: addr.name || '', email: addr.email || '', address: addr.address_line || '', city: addr.city || '', state: addr.state || '', zip: addr.pincode || '', phone: addr.mobile || '' }));
                                                    }
                                                } catch (err) { console.error(err); }
                                            }} />
                                            <div>
                                                <div className="font-semibold">{addr?.address_line}</div>
                                                <div className="text-sm">{addr?.city}, {addr?.state} - {addr?.pincode}</div>
                                                <div className="text-sm">{addr?.mobile}</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        <form action="" className="w-full mt-5">
                            <div className="flex items-center gap-5 pb-5">
                                <div className="col w-[50%]">
                                    <TextField
                                        id="outlined-basic"
                                        label="First Name"
                                        variant="outlined"
                                        className="w-full"
                                        type="text"
                                        size="small"
                                        required
                                        name="name"
                                        value={form.name}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div className="col w-[50%]">
                                    <TextField
                                        id="outlined-basic"
                                        label="Email Address"
                                        variant="outlined"
                                        className="w-full"
                                        type="email"
                                        size="small"
                                        required
                                        name="email"
                                        value={form.email}
                                        onChange={handleInput}
                                    />
                                </div>
                            </div>

                            <h6 className="text-[14px] font-[500] mb-3">Street Address</h6>

                            <div className="flex items-center pb-5">
                                <div className="col w-[100%]">
                                    <TextField
                                        id="outlined-basic"
                                        label="House No, Street, Area, Landmark"
                                        variant="outlined"
                                        className="w-full"
                                        type="text"
                                        size="small"
                                        required
                                        name="address"
                                        value={form.address}
                                        onChange={handleInput}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center pb-5">
                                <div className="col w-[100%]">
                                    <TextField
                                        id="outlined-basic"
                                        label="Apartment, suite, unit, etc.(optional)"
                                        variant="outlined"
                                        className="w-full"
                                        type="text"
                                        size="small"
                                        name="apartment"
                                        value={form.apartment}
                                        onChange={handleInput}
                                    />
                                </div>
                            </div>

                            <h6 className="text-[14px] font-[500] mb-3">Town / City</h6>

                            <div className="flex items-center pb-5">
                                <div className="col w-[100%]">
                                    <TextField
                                        id="outlined-basic"
                                        label="Town / City"
                                        variant="outlined"
                                        className="w-full"
                                        type="text"
                                        size="small"
                                        required
                                        name="city"
                                        value={form.city}
                                        onChange={handleInput}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center pb-5">
                                <div className="col w-[100%]">
                                    <TextField
                                        id="outlined-basic"
                                        label="State / country"
                                        variant="outlined"
                                        className="w-full"
                                        type="text"
                                        size="small"
                                        required
                                        name="state"
                                        value={form.state}
                                        onChange={handleInput}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-5 pb-5">
                                <div className="col w-[50%]">
                                    <TextField
                                        id="outlined-basic"
                                        label="Zip Code"
                                        variant="outlined"
                                        className="w-full"
                                        type="text"
                                        size="small"
                                        required
                                        name="zip"
                                        value={form.zip}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div className="col w-[50%]">
                                    <TextField
                                        id="outlined-basic"
                                        label="Phone Number"
                                        variant="outlined"
                                        className="w-full"
                                        type="text"
                                        size="small"
                                        required
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleInput}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="rightCol w-[30%]">
                    <div className="card shadow-md rounded-md bg-white p-5">
                        <h4 className="mb-4">Your Order</h4>

                        <div className="flex items-center justify-between border-b border-t border-[rgba(0,0,0,0.1)] py-3">
                            <span className="text-[14px] font-[600]">Products</span>
                            <span className="text-[14px] font-[600]">Subtotal</span>
                        </div>

                        <div className="scroll max-h-[250px] overflow-x-hidden overflow-y-auto pr-2">
                            {cartItems.length === 0 ? (
                                <div className="py-6 text-center text-sm text-gray-600">Your cart is empty</div>
                            ) : (
                                cartItems.map(ci => (
                                    <div key={ci._id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                                        <div className="part1 flex items-center gap-3">
                                            <div className="img w-[50px] h-[50px] object-cover rounded-md overflow-hidden bg-gray-100">
                                                <img
                                                    src={ci.productId?.image?.[0] || ''}
                                                    alt={ci.productId?.name || ''}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="info">
                                                <h4 className="text-[14px] font-[600]">{ci.productId?.name || ci.title}</h4>
                                                <span className="text-[13px]">Qty : {ci.quantity || 1}</span>
                                            </div>
                                        </div>

                                        <span className="text-[14px] font-[600]">₹ {Number(ci.productId?.price || 0) * Number(ci.quantity || 1)}</span>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="pt-4 border-t mt-4">
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm">Subtotal</span>
                                <span className="font-semibold">₹ {computeSubTotal()}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm">Shipping</span>
                                <div className="flex items-center gap-3">
                                    {/* mirror Cart shipping display: fallback to simple rule when estimate missing */}
                                    {(() => {
                                        const sub = computeSubTotal();
                                        const fallback = sub > 500 ? 0 : (sub === 0 ? 0 : 50);
                                        const shippingCharge = typeof shippingInfo.shippingCharge === 'number' ? shippingInfo.shippingCharge : fallback;
                                        return (
                                            <>
                                                <span className="font-semibold">{shippingCharge === 0 ? 'Free' : `₹ ${Number(shippingCharge).toFixed(2)}`}</span>
                                                <button
                                                    className="text-sm underline text-primary"
                                                    onClick={async () => {
                                                        try {
                                                            const items = cartItems.map(ci => ({ productId: ci.productId?._id || ci.productId, price: ci.productId?.price || 0, quantity: ci.quantity || 1 }));
                                                            const addressObj = addresses.find(a => a._id === selectedAddressId) || {
                                                                address_line: form.address,
                                                                city: form.city,
                                                                state: form.state,
                                                                country: 'India',
                                                                pincode: form.zip,
                                                                mobile: form.phone
                                                            };
                                                            const json = await postData('/api/v1/order/estimate', { subtotal: sub, items, address: addressObj });
                                                            if (json && json.data) {
                                                                setShippingInfo(json.data);
                                                                toast.success('Shipping estimate updated');
                                                            } else {
                                                                toast.error('Failed to fetch shipping estimate');
                                                            }
                                                        } catch (err) {
                                                            console.error('apply shipping failed', err);
                                                            toast.error('Failed to fetch shipping estimate');
                                                        }
                                                    }}
                                                >Apply Shipping</button>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-3 border-t mt-2">
                                <span className="text-base font-[600]">Total</span>
                                <span className="text-base font-[700]">₹ { (Number(computeSubTotal()) + Number(shippingInfo.shippingCharge || 0)).toFixed(2) }</span>
                            </div>

                            <div className="pt-5">
                                <Button onClick={handlePlaceOrder} disabled={loading} className="!text-[14px] !bg-[#ff5252] !font-[600] !text-[#fff] !py-3 hover:!bg-[#000] hover:!text-[#ff5252] !transition-all !duration-150 w-full">
                                    <BsBagCheck className="mr-2 text-[20px]" /> {loading ? 'Processing...' : 'Place Order'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;
