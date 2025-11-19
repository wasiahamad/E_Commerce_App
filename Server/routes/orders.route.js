import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { createOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder, estimateShipping } from "../controllers/orders.controller.js";

const router = Router();

// Create order (authenticated user)
router.post("/", authMiddleware, createOrder);

// Shipping estimate (public)
router.post("/estimate", estimateShipping);

// Admin: list orders with pagination
router.get("/", authMiddleware, getOrders);

// Get specific order
router.get("/:id", authMiddleware, getOrderById);

// Update order status (admin)
router.put("/:id/status", authMiddleware, updateOrderStatus);

// Delete order (admin)
router.delete("/:id", authMiddleware, deleteOrder);

export default router;
