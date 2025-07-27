import mongoose from "mongoose";

const myListSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: [true, 'Product ID is required'],
        unique: true
    },
    userId: {
        type: String,
        required: [true, 'User ID is required'],
        unique: true
    },
    image: {
        type: String,
        required: [true, 'Product image is required'],
    },
    productTitle: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minlength: [3, 'Product name must be at least 3 characters long'],
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
        require : [true, 'Product rating is required'],
    },
    discount : {
        type: Number,
        required: [true, 'Product discount is required'],
    },
    brand: {
        type: String,
        require : [true, 'Product brand is required'],
    },
}, {
    timestamps: true
});

const MyListModel = mongoose.model('MyList', myListSchema);

export default MyListModel;