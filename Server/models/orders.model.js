import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
        title: { type: String, required: true },
        image: { type: String },
        price: { type: Number, required: true, min: 0 },
        quantity: { type: Number, required: true, min: 1 },
        subTotal: { type: Number, required: true, min: 0 },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
        orderId: { type: String, required: true, unique: true },
        items: { type: [orderItemSchema], default: [] },
        paymentId: { type: String, default: "" },
        paymentMethod: { type: String, default: "" },
        paymentStatus: { type: String, enum: ["pending", "completed", "failed", "cod"], default: "pending" },
        delivery_address: { type: mongoose.Schema.ObjectId, ref: "Address" },
        subTotalAmount: { type: Number, default: 0, min: 0 },
        shippingCharge: { type: Number, default: 0, min: 0 },
        totalAmount: { type: Number, default: 0, min: 0 },
        status: { type: String, enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"], default: "pending" },
        notes: { type: String, default: "" },
    },
    { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;