import jwt from "jsonwebtoken";
import UserModel from '../models/user.model.js';
import AdminModel from '../models/admin.model.js';

const authMiddleware = async (req, res, next) => {
    console.log("authMiddleware called on:", req.path);
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    console.log("TOKEN RECEIVED:", token);  // Debug log
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access",
            error: true,
            success: false,
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY_ACESS_TOKEN);
        console.log("TOKEN DECODED:", decoded);  // Debug log

        // Attach minimal user info (id and role) by fetching from DB
        let userDoc = null;
        if (decoded.role && decoded.role === 'admin') {
            userDoc = await AdminModel.findById(decoded.id).select('-password');
            if (!userDoc) return res.status(401).json({ message: 'Admin not found', success: false, error: true });
            req.user = { id: userDoc._id.toString(), role: 'admin', email: userDoc.email, name: userDoc.name };
        } else {
            userDoc = await UserModel.findById(decoded.id).select('-password -refresh_token');
            if (!userDoc) return res.status(401).json({ message: 'User not found', success: false, error: true });
            req.user = { id: userDoc._id.toString(), role: userDoc.role || 'user', email: userDoc.email, name: userDoc.name };
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log("TOKEN ERROR:", error.message);  // Debug log
        return res.status(403).json({
            message: "Invalid token",
            error: true,
            success: false,
        });
    }
}

export default authMiddleware;