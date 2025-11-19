import mongoose from 'mongoose';

const sizeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Size name is required'],
        trim: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const SizeModel = mongoose.model('Size', sizeSchema);
export default SizeModel;
