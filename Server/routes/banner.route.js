import { Router } from 'express';
import authMiddleware from '../middlewares/auth.js';
import { getPublicBanners, getAllBanners, createBanner, updateBanner, deleteBanner } from '../controllers/banner.controller.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

// Public
router.get('/', getPublicBanners);

// Admin
router.get('/admin/all', authMiddleware, getAllBanners);
router.post('/create', authMiddleware, upload.array('image'), createBanner);
router.put('/update/:id', authMiddleware, upload.array('image'), updateBanner);
router.delete('/delete/:id', authMiddleware, deleteBanner);

export default router;
