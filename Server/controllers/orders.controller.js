import OrderModel from "../models/orders.model.js";
import AddressModel from "../models/address.model.js";
import { computeShippingCharge, computeShippingDetails } from "../utils/shipping.js";

// Create order (from client cart)
export const createOrder = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;
    let { items = [], delivery_address, paymentMethod = "cod", /* shippingCharge from client ignored */ notes = "" } = req.body;

        if (!userId) return res.status(401).json({ message: "Unauthorized", error: true, success: false });
        if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: "No items provided", error: true, success: false });

        let subTotal = 0;
        const normalizedItems = items.map((it) => {
            const price = Number(it.price || 0);
            const qty = Number(it.quantity || it.qty || 1);
            const subTotalItem = price * qty;
            subTotal += subTotalItem;
            return {
                productId: it.productId || it._id,
                title: it.title || it.name || "",
                image: it.image || it.img || "",
                price,
                quantity: qty,
                subTotal: subTotalItem,
            };
        });

    // compute shipping server-side (authoritative)
    const shippingChargeComputed = await computeShippingCharge({ subtotal: subTotal, items, address: delivery_address });
    const totalAmount = subTotal + Number(shippingChargeComputed || 0);

        // If client passed a delivery_address object instead of an address id, create Address doc and use its id
        if (delivery_address && typeof delivery_address === 'object' && !delivery_address._id) {
            try {
                const addrPayload = {
                    address_line: delivery_address.address_line || delivery_address.address || '',
                    city: delivery_address.city || '',
                    state: delivery_address.state || '',
                    country: delivery_address.country || 'India',
                    pincode: delivery_address.pincode || delivery_address.zip || delivery_address.pin || '',
                    mobile: delivery_address.mobile || delivery_address.phone || '',
                    userId: userId
                };

                const createdAddr = new AddressModel(addrPayload);
                await createdAddr.save();
                delivery_address = createdAddr._id;
            } catch (addrErr) {
                console.error('Failed to create address from payload:', addrErr);
                return res.status(400).json({ message: 'Invalid delivery address', error: true, success: false });
            }
        }

        // build orderId using user id and timestamp to avoid external uuid dependency
        const userIdShort = String(userId).slice(-6);
        const newOrder = new OrderModel({
            userId,
            orderId: `ORD-${userIdShort}-${Date.now()}`,
            items: normalizedItems,
            delivery_address,
            subTotalAmount: subTotal,
            shippingCharge: shippingChargeComputed,
            totalAmount,
            paymentMethod,
            paymentStatus: paymentMethod === "cod" ? "cod" : "pending",
            status: "pending",
            notes,
        });

        await newOrder.save();

        return res.status(201).json({ message: "Order created", success: true, error: false, data: newOrder });
    } catch (error) {
        console.error("createOrder error:", error);
        return res.status(500).json({ message: error.message || "Server error", error: true, success: false });
    }
};

// Admin: get all orders with pagination & filters
export const getOrders = async (req, res) => {
    try {
        const page = Number(req.query.page || 1);
        const perPage = Number(req.query.perPage || 10);
        const skip = (page - 1) * perPage;

        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.userId) filter.userId = req.query.userId;

        const [orders, total] = await Promise.all([
            OrderModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(perPage).populate("userId", "name email mobile").populate("delivery_address").lean(),
            OrderModel.countDocuments(filter),
        ]);

        return res.status(200).json({ success: true, error: false, data: orders, total, page, perPage });
    } catch (error) {
        console.error("getOrders error:", error);
        return res.status(500).json({ message: error.message || "Server error", error: true, success: false });
    }
};

// Get one order by id
export const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await OrderModel.findById(id).populate("userId", "name email mobile").populate("delivery_address");
        if (!order) return res.status(404).json({ message: "Order not found", error: true, success: false });
        return res.status(200).json({ success: true, error: false, data: order });
    } catch (error) {
        console.error("getOrderById error:", error);
        return res.status(500).json({ message: error.message || "Server error", error: true, success: false });
    }
};

// Update order status (admin)
export const updateOrderStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        if (!status) return res.status(400).json({ message: "Status is required", error: true, success: false });

        const allowed = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
        if (!allowed.includes(status)) return res.status(400).json({ message: "Invalid status", error: true, success: false });

        const order = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!order) return res.status(404).json({ message: "Order not found", error: true, success: false });

        return res.status(200).json({ success: true, error: false, data: order });
    } catch (error) {
        console.error("updateOrderStatus error:", error);
        return res.status(500).json({ message: error.message || "Server error", error: true, success: false });
    }
};

// Delete order (admin)
export const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await OrderModel.findByIdAndDelete(id);
        if (!order) return res.status(404).json({ message: "Order not found", error: true, success: false });
        return res.status(200).json({ success: true, error: false, message: "Order deleted" });
    } catch (error) {
        console.error("deleteOrder error:", error);
        return res.status(500).json({ message: error.message || "Server error", error: true, success: false });
    }
};

// Shipping estimate endpoint (client can request an estimate before placing order)
export const estimateShipping = async (req, res) => {
    try {
        // accept items and optional subtotal and address in body (POST) or query (GET)
        const items = req.body?.items || (req.query?.items ? JSON.parse(req.query.items) : []) || [];
        const subtotal = Number(req.body?.subtotal ?? req.query?.subtotal ?? items.reduce((s, it) => s + (Number(it.price || 0) * Number(it.quantity || it.qty || 1)), 0));
        const address = req.body?.address || (req.query?.address ? JSON.parse(req.query.address) : null) || null;

    // return detailed breakdown for debugging/UX
    const details = await computeShippingDetails({ subtotal, items, address });
    return res.status(200).json({ success: true, error: false, data: { ...details, subtotal, totalAmount: subtotal + (details.shippingCharge || 0) } });
    } catch (error) {
        console.error('estimateShipping error', error);
        return res.status(500).json({ message: 'Failed to estimate shipping', success: false, error: true });
    }
};
