import mongoose from "mongoose";
import CartProductModel from "../models/cartProduct.model.js";
import UserModel from "../models/user.model.js";


// add to card controller
export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        if (!productId) {
            return res.status(400).json({
                message: "Product ID and quantity are required",
                error: true,
                success: false
            });
        }

        const existingCartProduct = await CartProductModel.findOne({
            userId: userId,
            productId: productId
        });

        if (existingCartProduct) {
            return res.status(400).json({
                message: "Product already in cart",
                error: true,
                success: false
            });
        }

        const cartProduct = new CartProductModel({
            productId: productId,
            quantity: 1,
            userId: userId
        });

        const savedCartProduct = await cartProduct.save();

        const updateCartUser = await UserModel.updateOne(
            { _id: new mongoose.Types.ObjectId(userId) },
            { $push: { shopping_cart: productId } }
        );
        console.log("Updating user with ID:", userId);


        console.log("UPDATE CART USER:", updateCartUser);

        if (!updateCartUser) {
            return res.status(500).json({
                message: "Error updating user cart",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            message: "Product added to cart successfully",
            error: false,
            success: true,
            data: savedCartProduct
        });

    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({
            message: "Error adding product to cart",
            error: true,
            success: false
        });
    }
};

// get cart controller
export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartProducts = await CartProductModel.find({ userId: userId }).populate("productId");

        res.status(200).json({
            message: "Cart fetched successfully",
            error: false,
            success: true,
            data: cartProducts
        });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({
            message: "Error fetching cart",
            error: true,
            success: false
        });
    }
};

// update cart controller
export const updateCart = async (req, res) => {
    try {
        const { _id, quantity } = req.body;
        const userId = req.user.id;

        if (!_id || !quantity) {
            return res.status(400).json({
                message: "Product ID and quantity are required",
                error: true,
                success: false
            });
        }

        const updatedCartProduct = await CartProductModel.updateOne({
            _id: _id,
            userId: userId
        }, {
            quantity: quantity
        });

        res.status(200).json({
            message: "Cart updated successfully",
            error: false,
            success: true,
            data: updatedCartProduct
        });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({
            message: "Error updating cart",
            error: true,
            success: false
        });
    }
};

// delete cart controller
export const deleteCart = async (req, res) => {
    try {
        const { _id , productId} = req.body;
        const userId = req.user.id;

        if (!_id || !userId) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false
            });
        }

        const deletedCartProduct = await CartProductModel.deleteOne({
            _id: _id,
            userId: userId
        });

        if(!deletedCartProduct) {
            return res.status(404).json({
                message: "Error deleting cart",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const cartItems = user?.shopping_cart;

        const updateCart = [...cartItems.slice(0, cartItems.indexOf(productId)), ...cartItems.slice(cartItems.indexOf(productId) + 1)];
        
        user.shopping_cart = updateCart;
        await user.save();

        res.status(200).json({
            message: "Cart deleted successfully",
            error: false,
            success: true,
            data: deletedCartProduct
        });
    } catch (error) {
        console.error("Error deleting cart:", error);
        res.status(500).json({
            message: "Error deleting cart",
            error: true,
            success: false
        });
    }
};
