import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    role: { type: String, enum: ['admin'], default: 'admin' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

const AdminModel = mongoose.model('Admin', adminSchema);
export default AdminModel;
