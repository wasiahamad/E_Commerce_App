import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import { upload } from '../middlewares/multer.js';
import { getPublicHomeSliders, getAllHomeSliders, createHomeSlider, updateHomeSlider, deleteHomeSlider } from '../controllers/homeSlider.controller.js';

const router = express.Router();

// Public
router.get('/', getPublicHomeSliders);

// Admin
router.get('/admin/all', authMiddleware, getAllHomeSliders);
router.post('/create', authMiddleware, upload.single('image'), createHomeSlider);
router.put('/update/:id', authMiddleware, upload.single('image'), updateHomeSlider);
router.delete('/delete/:id', authMiddleware, deleteHomeSlider);

export default router;
