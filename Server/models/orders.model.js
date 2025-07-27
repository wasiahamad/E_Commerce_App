import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    orderId: {
        type: String,
        required: [true, 'Order ID is required'],
        unique: true
    },
    productsId: {
        type: mongoose.Schema.ObjectId,
        ref: 'cartProduct',
        required: true
    },
    product_details : {
        type: String,
        image : Array
    },
    paymentId : {
        type: String,
        default: ""
    },
    paymentStatus : {
        type: String,
        // enum: ['pending', 'completed', 'failed'],
        default: ""
    },
    delivery_address: {
        type: mongoose.Schema.ObjectId,
        ref: 'address',
    },
    subTotalAmount: {
        type: Number,
        default: 0,
        min: [0, 'Sub Total amount cannot be negative']
    },
    totalAmount: {
        type: Number,
        default: 0,
        min: [0, 'Total amount cannot be negative']
    },

}, {
    timestamps: true
});

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;