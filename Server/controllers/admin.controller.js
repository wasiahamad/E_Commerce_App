import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminModel from '../models/admin.model.js';

// Admin login (only login allowed for admins)
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password required', success: false, error: true });

        const admin = await AdminModel.findOne({ email: email.toLowerCase() });
        if (!admin) return res.status(404).json({ message: 'Admin not found', success: false, error: true });

        if (admin.status !== 'active') return res.status(403).json({ message: 'Admin is not active', success: false, error: true });

        const match = await bcrypt.compare(password, admin.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials', success: false, error: true });

        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.SECRET_KEY_ACESS_TOKEN, { expiresIn: '5h' });

        // Set cookies similar to user login (optional)
        res.cookie('accessToken', token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 5 * 60 * 60 * 1000 });

        return res.status(200).json({ message: 'Admin logged in', success: true, error: false, data: { id: admin._id, email: admin.email, name: admin.name }, accessToken: token });
    } catch (err) {
        console.error('Admin login error', err);
        return res.status(500).json({ message: err.message || err, success: false, error: true });
    }
};

export const getAdminDetails = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden', success: false, error: true });

        const adminId = req.user.id;
        const admin = await AdminModel.findById(adminId).select('-password');
        if (!admin) return res.status(404).json({ message: 'Admin not found', success: false, error: true });

        return res.status(200).json({ message: 'Admin details fetched', success: true, error: false, data: admin });
    } catch (err) {
        console.error('Get admin details error', err);
        return res.status(500).json({ message: err.message || err, success: false, error: true });
    }
};
