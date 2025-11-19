import mongoose from 'mongoose';

const notifySchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
    productName: { type: String, default: '' },
    userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    userName: { type: String, default: '' },
    userEmail: { type: String, default: '' },
    adminId: { type: mongoose.Schema.ObjectId, ref: 'Admin', default: null },
    notified: { type: Boolean, default: false },
    notifiedAt: { type: Date, default: null },
    // whether the admin has seen/read this notify request in the admin UI
    read: { type: Boolean, default: false },
}, {
    timestamps: true
});

const NotifyModel = mongoose.model('NotifyRequest', notifySchema);
export default NotifyModel;
