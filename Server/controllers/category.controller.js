import { v2 as cloudinary } from "cloudinary";
import CategoryModel from "../models/category.model.js";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET,
    secure: true
});


// image upload controller
let imagesArr = [];

export const createCategory = async (req, res) => {
    try {
        imagesArr = [];

        // ✅ Handle req.files safely
        const image = req.files || [];
        // ✅ Agar root category (parentCatId null ya undefined) hai → Image required
        if ((!req.body.parentCatId || req.body.parentCatId === "null") && image.length === 0) {
            return res.status(400).json({
                message: "Image is required for main category",
                error: true,
                success: false,
            });
        }

        // Cloudinary upload options
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
        };

        // ✅ Upload each image to cloudinary
        for (let i = 0; i < image.length; i++) {
            const result = await cloudinary.uploader.upload(
                image[i].path,
                options
            );
            imagesArr.push(result.url);

            // ✅ Remove file from local disk
            fs.unlinkSync(image[i].path);
        }

        // ✅ Create category instance
        let category = new CategoryModel({
            name: req.body.name,
            image: imagesArr[0], // only first image used
            parentCatName: req.body.parentCatName,
            parentCatId: req.body.parentCatId,
            status: req.body.status,
        });

        // ✅ Save to DB
        category = await category.save();
        imagesArr = [];

        return res.status(200).json({
            message: "Category created successfully",
            error: false,
            success: true,
            data: category,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// get all categories controller
export const getAllCategories = async (req, res) => {
    try {
        // ✅ Get all categories
        const categories = await CategoryModel.find();
        const categoryMap = {};

        // ✅ Create category map
        categories.forEach(cat => {
            categoryMap[cat._id] = { ...cat._doc, children: [] };
        });

        const rootCategories = [];

        categories.forEach(cat => {
            if (!cat.parentCatId) {
                rootCategories.push(categoryMap[cat._id]);
            } else {
                categoryMap[cat.parentCatId].children.push(categoryMap[cat._id]);
            }
        });

        return res.status(200).json({
            message: "Categories fetched successfully",
            error: false,
            success: true,
            data: rootCategories,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// get category count controller
export const getCategoryCount = async (req, res) => {
    try {
        // ✅ Get category count
        const count = await CategoryModel.countDocuments({ parentCatId: null });
        if (!count) {
            return res.status(404).json({
                message: "No categories found",
                error: true,
                success: false,
            });
        }
        return res.status(200).json({
            message: "Category count fetched successfully",
            error: false,
            success: true,
            data: count,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// get sub category count controller
export const getSubCategoryCount = async (req, res) => {
    try {
        // ✅ Get category count
        const count = await CategoryModel.find();

        if (!count) {
            return res.status(404).json({
                message: "No categories found",
                error: true,
                success: false,
            });
        } else {
            const subCatArr = [];
            for (let i = 0; i < count.length; i++) {
                if (count[i].parentCatId !== null) {
                    subCatArr.push(count[i]);
                }
            }
            return res.status(200).json({
                message: "Category count fetched successfully",
                error: false,
                success: true,
                data: subCatArr.length,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// get single category controller
export const getSingleCategory = async (req, res) => {
    try {
        // ✅ Get single category
        const category = await CategoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({
                message: "Category not found",
                error: true,
                success: false,
            });
        }
        return res.status(200).json({
            message: "Category fetched successfully",
            error: false,
            success: true,
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// remove image from category controller
export const removeCategoryImage = async (req, res) => {
    try {
        const imageUrl = req.query.img; // Get image URL from request body
        const urlArr = imageUrl.split("/");
        const image = urlArr[urlArr.length - 1].split(".")[0]; // Extract image name from URL

        // Check if the image exists in Cloudinary
        if (image) {
            const result = await cloudinary.uploader.destroy(image, (error, result) => {
                if (error) {
                    console.error("Cloudinary delete error:", error);
                    return res.status(500).json({
                        message: "Error removing image from Cloudinary",
                        error: true,
                        success: false,
                    });
                }
                console.log("Image deleted:", image);
                return res.status(200).json({
                    message: "Image removed successfully",
                    error: false,
                    success: true,
                });
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// delete category controller
export const deleteCategory = async (req, res) => {
    try {
        // Find the category
        const category = await CategoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({
                message: "Category not found",
                error: true,
                success: false,
            });
        }

        // Delete third-level subcategories
        const subCategories = await CategoryModel.find({ parentCatId: req.params.id });
        for (const subCat of subCategories) {
            const thirdLevel = await CategoryModel.find({ parentCatId: subCat._id });
            for (const third of thirdLevel) {
                await CategoryModel.findByIdAndDelete(third._id);
            }
            await CategoryModel.findByIdAndDelete(subCat._id);
        }

        // Delete main category
        await CategoryModel.findByIdAndDelete(req.params.id);

        // Delete images from Cloudinary
        if (category.image && category.image.length > 0) {
            const image = category.image.split("/").pop().split(".")[0]; // Extract image name from URL
            const result = await cloudinary.uploader.destroy(image, (error, result) => {
                if (error) {
                    console.error("Cloudinary delete error:", error);
                    return res.status(500).json({
                        message: "Error removing image from Cloudinary",
                        error: true,
                        success: false,
                    });
                }
                console.log("Image deleted:", image);
            });
        }

        return res.status(200).json({
            message: "Category and its Cloudinary images deleted successfully",
            error: false,
            success: true,
        });
    } catch (error) {
        console.error("Delete category error:", error);
        return res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
};

// update category controller
export const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const existingCategory = await CategoryModel.findById(categoryId);
        console.log("Request Body:", req.body);

        if (!existingCategory) {
            return res.status(404).json({
                message: "Category not found",
                error: true,
                success: false,
            });
        }

        // If new image uploaded (from imagesArr), delete old image from cloudinary
        let updatedImage = existingCategory.image;
        if (imagesArr.length > 0) {
            const oldImage = existingCategory.image;

            // Delete old image from Cloudinary
            if (oldImage && oldImage[0]?.public_id) {
                await cloudinary.uploader.destroy(oldImage[0].public_id);
            }

            // Set new image
            updatedImage = imagesArr;
        } else if (req.body.image) {
            // If no new upload but image info is sent from frontend (existing URL or object)
            updatedImage = req.body.image;
        }

        // Update category
        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            categoryId,
            {
                ...(req.body.name && { name: req.body.name }),
                ...(req.body.image && { image: updatedImage }),
                ...(req.body.parentCatId && { parentCatId: req.body.parentCatId }),
                ...(req.body.parentCatName && { parentCatName: req.body.parentCatName }),
            },
            { new: true }
        );


        if (!updatedCategory) {
            return res.status(400).json({
                message: "Failed to update category. Validation error.",
                error: true,
                success: false,
            });
        }


        imagesArr = [];

        return res.status(200).json({
            message: "Category updated successfully",
            success: true,
            error: false,
            data: updatedCategory,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

