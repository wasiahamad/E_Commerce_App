import mongoose from "mongoose";


const cartProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        min: [1, 'Quantity must be at least 1'],
        default: 1
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
});

const CartProductModel = mongoose.model('CartProduct', cartProductSchema);

export default CartProductModel;