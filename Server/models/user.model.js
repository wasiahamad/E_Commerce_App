
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatar: {
        type: String,
        default: ""
    },
    mobile : {
        type: Number,
        default : null,
        unique: true
    },
    verify_email : {
        type: Boolean,
        default: false
    },
    last_login_date: {
        type: Date,
        default: Date.now
    },
    status : {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    },
    address_details: [{
        type: mongoose.Schema.ObjectId,
        ref: 'address'
    }],
    shopping_cart: [{
        type: mongoose.Schema.ObjectId,
        ref: 'CartProduct'
    }],
    orderHistory :[{
        type: mongoose.Schema.ObjectId,
        ref: 'order'
    }],
    otp: {
        type: String,
        default: null
    },
    otp_expiry: {
        type: Date,
        default: null
    },

}, 
{
    timestamps: true
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;