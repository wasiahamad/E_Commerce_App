import { Router } from 'express';
import { createRam, getAllRams, updateRam, deleteRam, deleteMultipleRams } from '../controllers/ram.controller.js';
import authMiddleware from '../middlewares/auth.js';

const router = Router();

router.get('/', getAllRams);
router.post('/', authMiddleware, createRam);
router.put('/:id', authMiddleware, updateRam);
router.delete('/:id', authMiddleware, deleteRam);
router.delete('/delete-multiple', authMiddleware, deleteMultipleRams);

export default router;
