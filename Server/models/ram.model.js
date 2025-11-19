import mongoose from 'mongoose';

const ramSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'RAM name is required'],
        trim: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const RamModel = mongoose.model('Ram', ramSchema);
export default RamModel;
