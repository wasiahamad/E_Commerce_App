import { Router } from 'express';
import { createSize, getAllSizes, updateSize, deleteSize, deleteMultipleSizes } from '../controllers/size.controller.js';
import authMiddleware from '../middlewares/auth.js';

const router = Router();

router.get('/', getAllSizes);
router.post('/', authMiddleware, createSize);
router.put('/:id', authMiddleware, updateSize);
router.delete('/:id', authMiddleware, deleteSize);
router.delete('/delete-multiple', authMiddleware, deleteMultipleSizes);

export default router;
