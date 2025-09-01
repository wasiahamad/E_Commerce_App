import ProductModel from "../models/product.model.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import CategoryModel from "../models/category.model.js";

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET,
    secure: true
});


// image upload controller
let imagesArr = [];

// create product
export const createProduct = async (req, res) => {
    try {
        imagesArr = [];

        // ✅ Handle req.files safely
        const image = req.files || [];
        if (image.length === 0) {
            return res.status(400).json({
                message: "No image uploaded",
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

        // ✅ Validate and convert category to ObjectId
        if (!req.body.category || !mongoose.Types.ObjectId.isValid(req.body.category)) {
            return res.status(400).json({
                message: "Invalid or missing category ID",
                error: true,
                success: false
            });
        }

        // ✅ create product
        let product = new ProductModel({
            name: req.body.name,
            description: req.body.description,
            image: imagesArr,
            brand: req.body.brand,
            price: req.body.price,
            oldPrice: req.body.oldPrice,
            catName: req.body.catName,
            catId: req.body.catId,
            subCatName: req.body.subCatName,
            subCatId: req.body.subCatId,
            thirdSubCat: req.body.thirdSubCat,
            thirdSubCatId: req.body.thirdSubCatId,
            countInStock: req.body.countInStock,
            isFeatured: req.body.isFeatured,
            discount: req.body.discount,
            rating: req.body.rating,
            productRam: req.body.productRam,
            size: req.body.size,
            productWeight: req.body.productWeight,
            category: new mongoose.Types.ObjectId(req.body.category)
            // ✅ MISSING LINE ADDED

        });

        // ✅ Save to DB
        product = await product.save();
        imagesArr = [];

        return res.status(200).json({
            message: "Category created successfully",
            error: false,
            success: true,
            data: product,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// get all products
export const getAllProducts = async (req, res) => {
    try {
        console.log("Page:", req.query.page);
        console.log("PerPage:", req.query.perPage);
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;

        const totalPost = await ProductModel.countDocuments();
        const totalPage = Math.ceil(totalPost / perPage);

        if (page > totalPage) {
            return res.status(404).json({
                message: "Page not found",
                error: true,
                success: false
            });
        }

        // ✅ Get single product
        const products = await ProductModel.find()
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        return res.status(200).json({
            message: "Products fetched successfully",
            error: false,
            success: true,
            data: products,
            currentPage: page,
            perPage: perPage,
            totalPost: totalPost,
            totalPage: totalPage
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

//  get all products by category id
export const getAllProductsByCatId = async (req, res) => {
    try {
        console.log("Page:", req.query.page);
        console.log("PerPage:", req.query.perPage);
        console.log("Category ID:", req.params.id);

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;

        const totalPost = await ProductModel.countDocuments();
        const totalPage = Math.ceil(totalPost / perPage);

        if (page > totalPage) {
            return res.status(404).json({
                message: "Page not found",
                error: true,
                success: false
            });
        }

        // ✅ Get single product
        const products = await ProductModel.find({
            catId: req.params.id
        })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if (products.length === 0) {
            console.log("No products found for this category ID.");
        }


        return res.status(200).json({
            message: "Products fetched successfully",
            error: false,
            success: true,
            data: products,
            currentPage: page,
            perPage: perPage,
            totalPost: totalPost,
            totalPage: totalPage
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// get all products by category name
export const getAllProductsByCatName = async (req, res) => {
    try {
        console.log("Page:", req.query.page);
        console.log("PerPage:", req.query.perPage);

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;

        const totalPost = await ProductModel.countDocuments();
        const totalPage = Math.ceil(totalPost / perPage);

        if (page > totalPage) {
            return res.status(404).json({
                message: "Page not found",
                error: true,
                success: false
            });
        }

        // ✅ Get single product
        const products = await ProductModel.find({
            catName: req.query.catName
        })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if (products.length === 0) {
            console.log("No products found for this category ID.");
        }


        return res.status(200).json({
            message: "Products fetched successfully",
            error: false,
            success: true,
            data: products,
            currentPage: page,
            perPage: perPage,
            totalPost: totalPost,
            totalPage: totalPage
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

//  get all products by sub category id
export const getAllProductsBySubCatId = async (req, res) => {
    try {
        console.log("Page:", req.query.page);
        console.log("PerPage:", req.query.perPage);
        console.log("Category ID:", req.params.id);

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;

        const totalPost = await ProductModel.countDocuments();
        const totalPage = Math.ceil(totalPost / perPage);

        if (page > totalPage) {
            return res.status(404).json({
                message: "Page not found",
                error: true,
                success: false
            });
        }

        // ✅ Get single product
        const products = await ProductModel.find({
            subCatId: req.params.id
        })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if (products.length === 0) {
            console.log("No products found for this category ID.");
        }


        return res.status(200).json({
            message: "Products fetched successfully",
            error: false,
            success: true,
            data: products,
            currentPage: page,
            perPage: perPage,
            totalPost: totalPost,
            totalPage: totalPage
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// get all products by sub category name
export const getAllProductsBySubCatName = async (req, res) => {
    try {
        console.log("Page:", req.query.page);
        console.log("PerPage:", req.query.perPage);

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;

        const totalPost = await ProductModel.countDocuments();
        const totalPage = Math.ceil(totalPost / perPage);

        if (page > totalPage) {
            return res.status(404).json({
                message: "Page not found",
                error: true,
                success: false
            });
        }

        // ✅ Get single product
        const products = await ProductModel.find({
            subCatName: req.query.subCatName
        })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if (products.length === 0) {
            console.log("No products found for this category ID.");
        }


        return res.status(200).json({
            message: "Products fetched successfully",
            error: false,
            success: true,
            data: products,
            currentPage: page,
            perPage: perPage,
            totalPost: totalPost,
            totalPage: totalPage
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

//  get all products by third sub category id
export const getAllProductsByThirdSubCatId = async (req, res) => {
    try {
        console.log("Page:", req.query.page);
        console.log("PerPage:", req.query.perPage);
        console.log("Category ID:", req.params.id);

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;

        const totalPost = await ProductModel.countDocuments();
        const totalPage = Math.ceil(totalPost / perPage);

        if (page > totalPage) {
            return res.status(404).json({
                message: "Page not found",
                error: true,
                success: false
            });
        }

        // ✅ Get single product
        const products = await ProductModel.find({
            thirdSubCatId: req.params.id
        })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if (products.length === 0) {
            console.log("No products found for this category ID.");
        }


        return res.status(200).json({
            message: "Products fetched successfully",
            error: false,
            success: true,
            data: products,
            currentPage: page,
            perPage: perPage,
            totalPost: totalPost,
            totalPage: totalPage
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// get all products by third sub category name
export const getAllProductsByThirdSubCatName = async (req, res) => {
    try {
        console.log("Page:", req.query.page);
        console.log("PerPage:", req.query.perPage);

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;

        const totalPost = await ProductModel.countDocuments();
        const totalPage = Math.ceil(totalPost / perPage);

        if (page > totalPage) {
            return res.status(404).json({
                message: "Page not found",
                error: true,
                success: false
            });
        }

        // ✅ Get single product
        const products = await ProductModel.find({
            thirdSubCat: req.query.thirdSubCat
        })
            .populate("category")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();

        if (products.length === 0) {
            console.log("No products found for this category ID.");
        }


        return res.status(200).json({
            message: "Products fetched successfully",
            error: false,
            success: true,
            data: products,
            currentPage: page,
            perPage: perPage,
            totalPost: totalPost,
            totalPage: totalPage
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// get all products by price range
export const getAllProductsByPriceRange = async (req, res) => {
    try {
        let productList = [];

        if (req.query.catId !== "" && req.query.catId !== undefined) {
            const productListArr = await ProductModel.find({
                catId: req.query.catId
            })
                .populate("category")
            productList = productListArr;
        }

        if (req.query.subCatId !== "" && req.query.subCatId !== undefined) {
            const productListArr = await ProductModel.find({
                subCatId: req.query.subCatId
            })
                .populate("category")
            productList = productListArr;

        }

        if (req.query.thirdSubCatId !== "" && req.query.thirdSubCatId !== undefined) {
            const productListArr = await ProductModel.find({
                thirdSubCatId: req.query.thirdSubCatId
            })
                .populate("category")
            productList = productListArr;

        }

        const filteredProducts = productList.filter((product) => {
            if (req.query.minPrice && product.price < parseInt(+req.query.minPrice)) {
                return false;
            }

            if (req.query.maxPrice && product.price > parseInt(+req.query.maxPrice)) {
                return false;
            }

            return true;
        });

        return res.status(200).json({
            message: "Products fetched successfully",
            error: false,
            success: true,
            data: filteredProducts,
            totalPage: 0,
            page: 0
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

// get all products by rating
export const getAllProductsByRating = async (req, res) => {
    try {
        console.log("Page:", req.query.page);
        console.log("PerPage:", req.query.perPage);

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;

        const totalPost = await ProductModel.countDocuments();
        const totalPage = Math.ceil(totalPost / perPage);

        if (page > totalPage) {
            return res.status(404).json({
                message: "Page not found",
                error: true,
                success: false
            });
        }

        // for category id
        let products = [];
        if (req.query.catId !== undefined) {
            products = await ProductModel.find({
                rating: req.query.rating,
                catId: req.query.catId,
            })
                .populate("category")
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        }

        // for sub categoryid 
        if (req.query.subCatId !== undefined) {
            products = await ProductModel.find({
                rating: req.query.rating,
                subCatId: req.query.subCatId,
            })
                .populate("category")
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        }

        // for third sub category
        if (req.query.thirdSubCatId !== undefined) {
            products = await ProductModel.find({
                rating: req.query.rating,
                thirdSubCatId: req.query.thirdSubCatId,
            })
                .populate("category")
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();
        }

        if (products.length === 0) {
            console.log("No products found for this category ID.");
        }


        return res.status(200).json({
            message: "Products fetched successfully",
            error: false,
            success: true,
            data: products,
            currentPage: page,
            perPage: perPage,
            totalPost: totalPost,
            totalPage: totalPage
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// get all products count 
export const getAllProductsCount = async (req, res) => {
    try {
        const count = await ProductModel.countDocuments();

        if (count === 0) {
            return res.status(404).json({
                message: "No products found",
                error: true,
                success: false,
            });
        }

        return res.status(200).json({
            message: "Products count fetched successfully",
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

// get all Products by featured
export const getAllProductsByFeatured = async (req, res) => {
    try {
        const products = await ProductModel.find({ isFeatured: true }).populate("category");

        if (products.length === 0) {
            return res.status(404).json({
                message: "No products found",
                error: true,
                success: false,
            });
        }

        return res.status(200).json({
            message: "Products fetched successfully",
            error: false,
            success: true,
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

// delete product controller also delete images from cloudnary
export const deleteProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
                error: true,
            });
        }

        // --- 🧹 Delete Cloudinary Image ---
        if (product.image) {
            try {
                // If image is a string (single URL)
                if (typeof product.image === "string") {
                    const publicId = product.image.split("/").pop().split(".")[0];
                    await cloudinary.uploader.destroy(publicId);
                }
                // If image is an array of URLs
                else if (Array.isArray(product.image)) {
                    for (const img of product.image) {
                        const publicId = img.split("/").pop().split(".")[0];
                        await cloudinary.uploader.destroy(publicId);
                    }
                }
                // If image is an object with public_id
                else if (product.image.public_id) {
                    await cloudinary.uploader.destroy(product.image.public_id);
                }
            } catch (imgErr) {
                console.error("Cloudinary image delete error:", imgErr);
            }
        }

        // --- 🗑️ Delete Product from MongoDB ---
        await ProductModel.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            error: false,
        });

    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: true,
        });
    }
};

// get single,k products by id
export const getSingleProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id).populate("category");

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
                error: true,
            });
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            error: false,
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        });
    }
};

// update products and images by id
// Assuming cloudinary is already configured
export const updateProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
                error: true,
            });
        }

        // 1. Upload new images to Cloudinary (if provided)
        let imagesArr = [];

        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const uploadResult = await cloudinary.uploader.upload(file.path, {
                    folder: "products",
                });
                imagesArr.push(uploadResult.secure_url);
            }
        } else {
            // If no new image provided, keep old image
            imagesArr = product.image;
        }

        // 2. Update product in DB
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name || product.name,
                description: req.body.description || product.description,
                image: imagesArr,
                brand: req.body.brand || product.brand,
                price: req.body.price || product.price,
                oldPrice: req.body.oldPrice || product.oldPrice,
                catName: req.body.catName || product.catName,
                catId: req.body.catId || product.catId,
                subCatName: req.body.subCatName || product.subCatName,
                subCatId: req.body.subCatId || product.subCatId,
                thirdSubCat: req.body.thirdSubCat || product.thirdSubCat,
                thirdSubCatId: req.body.thirdSubCatId || product.thirdSubCatId,
                countInStock: req.body.countInStock || product.countInStock,
                isFeatured: req.body.isFeatured || product.isFeatured,
                discount: req.body.discount || product.discount,
                rating: req.body.rating || product.rating,
                productRam: req.body.productRam || product.productRam,
                size: req.body.size || product.size,
                productWeight: req.body.productWeight || product.productWeight,
            },
            { new: true }
        );

        return res.status(200).json({
            message: "Product updated successfully",
            success: true,
            error: false,
            data: updatedProduct,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        });
    }
};

