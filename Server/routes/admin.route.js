import { Router } from 'express';
import { loginAdmin, getAdminDetails } from '../controllers/admin.controller.js';
import authMiddleware from '../middlewares/auth.js';

const router = Router();

// Admin authentication (login only)
router.post('/login', loginAdmin);

// get logged-in admin details
router.get('/details', authMiddleware, getAdminDetails);

export default router;
