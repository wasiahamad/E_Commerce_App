import { Router } from 'express';
import { createNotifyRequest, getNotifyRequestsForAdmin, markAsNotified, deleteNotify, getUnreadCountForAdmin, markAsRead } from '../controllers/notify.controller.js';
import authMiddleware from '../middlewares/auth.js';

const router = Router();

// client: request to be notified when product is back in stock
router.post('/', authMiddleware, createNotifyRequest);

// check if the logged-in user has already requested notify for a product
router.get('/check', authMiddleware, async (req, res, next) => {
	// delegate to controller function if present
	try {
		const productId = req.query.productId;
		if (!productId) return res.status(400).json({ message: 'productId query param required', success: false, error: true });
		// simple lookup
		const NotifyModel = (await import('../models/notify.model.js')).default;
		const existing = await NotifyModel.findOne({ productId, userId: req.user.id });
		return res.status(200).json({ message: 'Check done', success: true, error: false, data: { requested: !!existing, notify: existing } });
	} catch (err) {
		next(err);
	}
});

// admin: list notify requests for products they added
router.get('/', authMiddleware, getNotifyRequestsForAdmin);

// admin: unread count
router.get('/count', authMiddleware, getUnreadCountForAdmin);

// admin mark as notified
router.put('/:id/mark', authMiddleware, markAsNotified);
// admin mark as read (seen in UI)
router.put('/:id/read', authMiddleware, markAsRead);
// admin delete request
router.delete('/:id', authMiddleware, deleteNotify);

export default router;
