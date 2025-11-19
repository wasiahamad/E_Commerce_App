import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minlength: [3, 'Product name must be at least 3 characters long'],
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true,
        minlength: [3, 'Product description must be at least 3 characters long'],
    },
    image: [
        {
            type: String,
            required: [true, 'Product image is required'],
        }
    ],
    brand: {
        type: String,
        default: "",
    },
    price: {
        type: Number,
        default: 0
    },
    oldPrice: {
        type: Number,
        default: 0,
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        // required: [true, 'Product category is required'],
    },
    catName: {
        type: String,
        default: ""
    },
    subCatName: {
        type: String,
        default: ""
    },
    subCatId: {
        type: String,
        default: ""
    },
    catId: {
        type: String,
        default: ""
    },
    thirdSubCat: {
        type: String,
        default: ""
    },
    thirdSubCatId: {
        type: String,
        default: ""
    },
    countInStock: {
        type: Number,
        required: [true, 'Product count in stock is required'],
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
            userName: { type: String, default: '' },
            userAvatar: { type: String, default: '' },
            images: [
                {
                    type: String,
                    default: ''
                }
            ],
            rating: { type: Number, default: 0 },
            comment: { type: String, default: '' },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    reviewsCount: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    discount: {
        type: Number,
        required: [true, 'Product discount is required'],
    },
    productRam: [
        {
            type: String,
            default: ""
        }
    ],
    size: [
        {
            type: String,
            default: ""
        }
    ],
    productWeight: [
        {
            type: String,
            default: ""
        }
    ],
    // Unique code (SKU / barcode / QR payload) to allow lookup by scanner
    code: {
        type: String,
        unique: true,
        sparse: true,
        default: null,
    },
    // who created/added this product (admin user)
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: null
    },
    // Type of code generated or provided (e.g., 'qr' or 'barcode')
    codeType: {
        type: String,
        default: "qr",
    },
    // URL/path to generated code image (stored in uploads or cloudinary)
    codeImage: {
        type: String,
        default: "",
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;   