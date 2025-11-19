import mongoose from 'mongoose';

const weightSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Weight name is required'],
        trim: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const WeightModel = mongoose.model('Weight', weightSchema);
export default WeightModel;
