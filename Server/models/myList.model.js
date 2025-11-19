import mongoose from "mongoose";

const myListSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Product ID is required']
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    image: {
        type: String,
        default: ''
    },
    productTitle: {
        type: String,
        trim: true,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    oldPrice: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    brand: {
        type: String,
        default: ''
    },
}, {
    timestamps: true
});

// ensure a user cannot add the same product multiple times
myListSchema.index({ userId: 1, productId: 1 }, { unique: true });

const MyListModel = mongoose.model('MyList', myListSchema);

export default MyListModel;