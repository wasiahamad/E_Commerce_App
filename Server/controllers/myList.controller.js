import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import MyListModel from "../models/myList.model.js";
import ProductModel from "../models/product.model.js";


// add to mylist controller
export const addToMyList = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            productId,
            productTitle,
            price,
            oldPrice,
            image,
            rating,
            brand,
            discount
        } = req.body;

        // if client only passed productId, fetch product details to populate required fields
        let productData = null;
        if (productId && (!image || !productTitle || discount === undefined || rating === undefined || !brand)) {
            productData = await ProductModel.findById(productId).lean();
        }

        // Use an atomic upsert to avoid duplicate inserts in race conditions
        const docToInsert = {
            productId: productId,
            userId: userId,
            image: image || (productData && (Array.isArray(productData.image) ? productData.image[0] : productData.image)) || "",
            productTitle: productTitle || (productData && (productData.name || productData.title)) || "",
            price: price ?? (productData && productData.price) ?? 0,
            oldPrice: oldPrice ?? (productData && productData.oldPrice) ?? 0,
            rating: rating ?? (productData && productData.rating) ?? 0,
            brand: brand || (productData && productData.brand) || "",
            discount: discount ?? (productData && productData.discount) ?? 0
        };

        const raw = await MyListModel.findOneAndUpdate(
            { userId: userId, productId: productId },
            { $setOnInsert: docToInsert },
            { upsert: true, new: true, rawResult: true }
        );

        // raw.lastErrorObject.updatedExisting === true means it was already present
        if (raw && raw.lastErrorObject && raw.lastErrorObject.updatedExisting) {
            return res.status(400).json({
                message: "Product already in mylist",
                error: true,
                success: false
            });
        }

        // Otherwise, the document was inserted and the value is in raw.value
        res.status(200).json({
            message: "Product added to mylist successfully",
            error: false,
            success: true,
            data: raw.value
        })

    } catch (error) {
        console.error("Error adding product to cart:", error);
        // Handle duplicate key error (E11000) gracefully
        if (error && error.code === 11000) {
            return res.status(400).json({
                message: "Product already in mylist",
                error: true,
                success: false
            });
        }
        res.status(500).json({
            message: "Error adding product to cart",
            error: true,
            success: false
        });
    }
};

// get mylist controller
export const getMyList = async (req, res) => {
    try {
        const userId = req.user.id;
        const myLists = await MyListModel.find({ userId: userId });

        res.status(200).json({
            message: "Mylist fetched successfully",
            error: false,
            success: true,
            data: myLists
        });
    } catch (error) {
        console.error("Error fetching mylist:", error);
        res.status(500).json({
            message: "Error fetching mylist",
            error: true,
            success: false
        });
    }
};

// delete from mylist controller
export const deleteFromMyList = async (req, res) => {
    try {
        const userId = req.user.id;
        const myListId = await MyListModel.findById(req.params.id);

        if (!myListId) {
            return res.status(400).json({
                message: "mylist ID is required",
                error: true,
                success: false
            });
        }

        const deletedMyListProduct = await MyListModel.deleteOne({
            _id: myListId._id,
            userId: userId
        });

        if (!deletedMyListProduct) {
            return res.status(404).json({
                message: "Error deleting product from mylist",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            message: "Product deleted from mylist successfully",
            error: false,
            success: true,
            data: deletedMyListProduct
        });
    } catch (error) {
        console.error("Error deleting product from mylist:", error);
        res.status(500).json({
            message: "Error deleting product from mylist",
            error: true,
            success: false
        });
    }
};

