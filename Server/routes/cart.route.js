import {Router} from 'express';
import {addToCart, deleteCart, getCart, updateCart} from '../controllers/cart.controller.js';
import authMiddleware from '../middlewares/auth.js';

const cartRouter = Router();

cartRouter.get("/", authMiddleware, getCart);
cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.put("/update-qty", authMiddleware, updateCart);
cartRouter.delete("/remove", authMiddleware, deleteCart);

export default cartRouter;