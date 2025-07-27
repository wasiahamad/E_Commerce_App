import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import MyListModel from "../models/myList.model.js";


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

        const items = await MyListModel.findOne({
            userId: userId,
            productId: productId
        });

        if (items) {
            return res.status(400).json({
                message: "Product already in mylist",
                error: true,
                success: false
            });
        }

        const myList = new MyListModel({
            productId: productId,
            userId: userId,
            image: image,
            productTitle: productTitle,
            price: price,
            oldPrice: oldPrice,
            rating: rating,
            brand: brand,
            discount: discount
        });

        const result = await myList.save();

        res.status(200).json({
            message: "Product added to mylist successfully",
            error: false,
            success: true,
            data: result
        })

    } catch (error) {
        console.error("Error adding product to cart:", error);
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

