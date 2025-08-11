import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        minlength: [3, 'Category name must be at least 3 characters long'],
    },
    image: [{
            type: String,
            required: [true, 'Category image is required'],
        }],
        
    parentCatName: {
        type: String,
        trim: true,
        minlength: [3, 'Parent category name must be at least 3 characters long'],
    },
    parentCatId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        default: null
    },
    status: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true
});

const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel;