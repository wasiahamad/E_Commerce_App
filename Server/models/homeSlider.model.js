import mongoose from 'mongoose';

const HomeSliderSchema = new mongoose.Schema({
    img: { type: String, required: true },
    cloudinary_id: { type: String, default: '' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'admin', default: null },
}, { timestamps: true });

const HomeSliderModel = mongoose.model('homeslider', HomeSliderSchema);
export default HomeSliderModel;
