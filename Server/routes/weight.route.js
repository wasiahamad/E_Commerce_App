import { Router } from 'express';
import { createWeight, getAllWeights, updateWeight, deleteWeight, deleteMultipleWeights } from '../controllers/weight.controller.js';
import authMiddleware from '../middlewares/auth.js';

const router = Router();

router.get('/', getAllWeights);
router.post('/', authMiddleware, createWeight);
router.put('/:id', authMiddleware, updateWeight);
router.delete('/:id', authMiddleware, deleteWeight);
router.delete('/delete-multiple', authMiddleware, deleteMultipleWeights);

export default router;
