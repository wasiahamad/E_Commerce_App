import mongoose from "mongoose";    

const addressSchema = new mongoose.Schema({
    address_line : {
        type: String,
        required: [true, 'Address line is required'],
        trim: true,
        minlength: [3, 'Address line must be at least 3 characters long'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
        minlength: [2, 'City must be at least 2 characters long'],
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
        minlength: [2, 'State must be at least 2 characters long'],
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
        minlength: [2, 'Country must be at least 2 characters long'],
    },
    pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        trim: true,
        validate: {
            validator: function(v) {
                return /^\d{6}$/.test(v);
            },
            message: props => `${props.value} is not a valid pincode!`
        }    
    },
    mobile: {
        type: String,
        // required: [true, 'Mobile number is required'],
        // trim: true,
        // validate: {
        //     validator: function(v) {
        //         return /^\d{10}$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid mobile number!`
        // }   
        default: null, 
    },
    status: {
        type: Boolean,
        default: true,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: ""
    }
}, {
    timestamps: true
});

const AddressModel = mongoose.model('Address', addressSchema);

export default AddressModel;