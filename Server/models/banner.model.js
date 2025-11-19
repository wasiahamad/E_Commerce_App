import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    img: { type: String, default: '' },
    price: { type: String, default: '' },
    cloudinary_id: { type: String, default: '' },
    // optional category linkage so client can build links from banner
    category: { type: mongoose.Types.ObjectId, ref: 'Category', default: null },
    subCategory: { type: mongoose.Types.ObjectId, ref: 'Category', default: null },
    thirdCategory: { type: mongoose.Types.ObjectId, ref: 'Category', default: null },
    link: { type: String, default: '' },
    cta: { type: String, default: '' },
    // optional listType to distinguish different banner areas (e.g. 'banner2')
    listType: { type: String, default: '' },
    position: { type: String, default: 'center' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'Admin', default: null },
}, { timestamps: true });

const BannerModel = mongoose.model('Banner', BannerSchema);
export default BannerModel;
