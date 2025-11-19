import NotifyModel from '../models/notify.model.js';
import ProductModel from '../models/product.model.js';
import UserModel from '../models/user.model.js';
import AdminModel from '../models/admin.model.js';
import { sendEmail } from '../utils/EmailService.js';
import notifyUserTemplate from '../utils/notifyUserTemplate.js';

// create notify request (client)
export const createNotifyRequest = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!req.user || !req.user.id) return res.status(401).json({ message: 'Unauthorized', success: false, error: true });
        if (!productId) return res.status(400).json({ message: 'ProductId is required', success: false, error: true });

        const product = await ProductModel.findById(productId).populate('createdBy');
        if (!product) return res.status(404).json({ message: 'Product not found', success: false, error: true });

        // If product is in stock, return with message
        if (product.countInStock && product.countInStock > 0) {
            return res.status(400).json({ message: 'Product is already in stock', success: false, error: true });
        }

        // create notify request
        const user = await UserModel.findById(req.user.id);

        // Determine admin to notify:
        // 1) if product.createdBy refers to an Admin, use that
        // 2) otherwise try configured NOTIFY_ADMIN_EMAIL (Admin)
        // 3) otherwise pick first Admin in Admin collection
        let adminUser = null;
        if (product.createdBy && product.createdBy._id) {
            // try Admin collection first (new admin model)
            adminUser = await AdminModel.findById(product.createdBy._id);
            if (!adminUser) {
                // fallback: if createdBy refers to a legacy User who was an admin, try to match by email to AdminModel
                const maybeUser = await UserModel.findById(product.createdBy._id);
                if (maybeUser && maybeUser.email) {
                    adminUser = await AdminModel.findOne({ email: maybeUser.email.toLowerCase() });
                }
            }
        }

        if (!adminUser) {
            // Try configured fallback admin email from env (Admin collection)
            if (process.env.NOTIFY_ADMIN_EMAIL) {
                adminUser = await AdminModel.findOne({ email: process.env.NOTIFY_ADMIN_EMAIL.toLowerCase() });
            }
        }

        if (!adminUser) {
            // final fallback: pick any admin from Admin collection
            adminUser = await AdminModel.findOne().sort({ createdAt: 1 });
        }

        // avoid creating duplicate notify requests for same user+product
        let notify = await NotifyModel.findOne({ productId: product._id, userId: user._id });
        if (!notify) {
            notify = new NotifyModel({
            productId: product._id,
            productName: product.name,
            userId: user._id,
            userName: user.name || user.email,
            userEmail: user.email || '',
            // store adminId from Admin collection if available
            adminId: adminUser ? adminUser._id : null
            });
            await notify.save();
        }

        // send email to admin if we have an email
    const adminEmail = adminUser ? adminUser.email : null;
        if (adminEmail) {
            const subject = `Notify request for product: ${product.name}`;
            const text = `User ${user.name || user.email} has requested to be notified when your product "${product.name}" is back in stock.\n\nUser Email: ${user.email}\nProduct ID: ${product._id}`;
            // fire-and-forget
            sendEmail(adminEmail, subject, text, `<p>${text}</p>`).then(() => {}).catch(() => {});
        }

        // populate references for response using model find to get a fully populated document
        const populated = await NotifyModel.findById(notify._id)
            .populate('productId')
            .populate('userId')
            .populate('adminId')
            .lean();

        return res.status(200).json({ message: 'Notify request saved', success: true, error: false, data: populated });
    } catch (err) {
        console.error('Notify create error', err);
        return res.status(500).json({ message: err.message || err, success: false, error: true });
    }
};

// admin: get notify requests for products created by this admin
export const getNotifyRequestsForAdmin = async (req, res) => {
    try {
        if (!req.user || !req.user.id) return res.status(401).json({ message: 'Unauthorized', success: false, error: true });
        // only admins allowed
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden', success: false, error: true });

        const adminId = req.user.id;
        // support optional query ?unread=true to return only unread notifications
        const { unread } = req.query;
        const filter = { adminId };
        if (unread === 'true') filter.read = false;

    const requests = await NotifyModel.find(filter).populate('productId').populate('userId').populate('adminId').sort({ createdAt: -1 });
        return res.status(200).json({ message: 'Notify requests fetched', success: true, error: false, data: requests });
    } catch (err) {
        console.error('Get notify requests error', err);
        return res.status(500).json({ message: err.message || err, success: false, error: true });
    }
};

// admin: get unread notifications count
export const getUnreadCountForAdmin = async (req, res) => {
    try {
        if (!req.user || !req.user.id) return res.status(401).json({ message: 'Unauthorized', success: false, error: true });
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden', success: false, error: true });

        const adminId = req.user.id;
        const count = await NotifyModel.countDocuments({ adminId, read: false });
        return res.status(200).json({ message: 'Unread count fetched', success: true, error: false, data: { count } });
    } catch (err) {
        console.error('Get unread count error', err);
        return res.status(500).json({ message: err.message || err, success: false, error: true });
    }
};

// admin: mark a notify as read (admin has seen it in UI)
export const markAsRead = async (req, res) => {
    try {
        if (!req.user || !req.user.id) return res.status(401).json({ message: 'Unauthorized', success: false, error: true });
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden', success: false, error: true });

        const id = req.params.id;
        const notify = await NotifyModel.findById(id);
        if (!notify) return res.status(404).json({ message: 'Notify request not found', success: false, error: true });

        notify.read = true;
        await notify.save();

        const populated = await NotifyModel.findById(id).populate('productId').populate('userId').populate('adminId').lean();
        return res.status(200).json({ message: 'Notification marked read', success: true, error: false, data: populated });
    } catch (err) {
        console.error('Mark read error', err);
        return res.status(500).json({ message: err.message || err, success: false, error: true });
    }
};

// admin: mark a notify as sent
export const markAsNotified = async (req, res) => {
    try {
        if (!req.user || !req.user.id) return res.status(401).json({ message: 'Unauthorized', success: false, error: true });
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden', success: false, error: true });

        const id = req.params.id;
        const notify = await NotifyModel.findById(id).populate('userId').populate('productId');
        if (!notify) return res.status(404).json({ message: 'Notify request not found', success: false, error: true });

        // send email to user using template
        try {
            const userEmail = notify.userEmail;
            const productName = notify.productName;
            const productUrl = `${process.env.CLIENT_URL || 'http://localhost:5174'}/product/${notify.productId}`;
            const adminName = req.user?.name || '';
            const tpl = notifyUserTemplate({ userName: notify.userName, productName, productUrl, adminName });
            await sendEmail(userEmail, tpl.subject, tpl.text, tpl.html);
        } catch (err) {
            console.error('Error sending notify email to user', err);
            // continue even if email fails
        }

        notify.notified = true;
        notify.notifiedAt = new Date();
        await notify.save();

        return res.status(200).json({ message: 'User notified and request updated', success: true, error: false, data: notify });
    } catch (err) {
        console.error('Mark notified error', err);
        return res.status(500).json({ message: err.message || err, success: false, error: true });
    }
};

// admin: delete a notify request
export const deleteNotify = async (req, res) => {
    try {
        if (!req.user || !req.user.id) return res.status(401).json({ message: 'Unauthorized', success: false, error: true });
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden', success: false, error: true });

        const id = req.params.id;
        await NotifyModel.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Notify request deleted', success: true, error: false });
    } catch (err) {
        console.error('Delete notify error', err);
        return res.status(500).json({ message: err.message || err, success: false, error: true });
    }
};
