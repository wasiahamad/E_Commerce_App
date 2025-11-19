import ProductModel from "../models/product.model.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";
import CategoryModel from "../models/category.model.js";
import { lookupByBarcode } from "../utils/productLookup.js";

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

        // If client provided a code (barcode/sku) for this new product, ensure it doesn't already exist
        const providedCode = req.body && req.body.code && String(req.body.code).trim() !== '' ? String(req.body.code).trim() : null;
        if (providedCode) {
            const already = await ProductModel.findOne({ code: providedCode });
            if (already) {
                return res.status(409).json({
                    message: "Duplicate Product",
                    error: true,
                    success: false,
                });
            }
        }

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
        // ✅ create product first (without code fields). We'll generate code after we have the DB id
        let product = new ProductModel({
            name: req.body.name,
            description: req.body.description,
            image: imagesArr,
            // code, codeType and codeImage will be set after initial save so we can use product._id if needed
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
            ,
            createdBy: req.user ? req.user.id : null
            // ✅ MISSING LINE ADDED

        });

        // ✅ Save initial product to DB
        product = await product.save();

    // --- Now generate a unique code (use provided code if given, otherwise use product._id as the base)
    let finalCode = providedCode || `P-${product._id.toString()}`;
        let codeImageUrl = "";
        const codeType = req.body.codeType || "qr";

        // If providedCode is given, ensure it's unique (not used by another product)
        if (providedCode) {
            const existing = await ProductModel.findOne({ code: providedCode, _id: { $ne: product._id } });
            if (existing) {
                // collision: append timestamp to make unique
                finalCode = `${providedCode}-${Date.now().toString().slice(-6)}`;
            }
        }

        // Generate QR (or barcode) image and upload to Cloudinary. If generation fails, we still return product with code string.
        try {
            if (codeType === 'qr') {
                const qrDataUrl = await QRCode.toDataURL(finalCode, { margin: 1, width: 400 });
                const base64Data = qrDataUrl.replace(/^data:image\/(png|jpeg);base64,/, "");
                const tmpFileName = `code-${Date.now()}-${Math.random().toString(36).substring(2,8)}.png`;
                const tmpPath = path.resolve(process.cwd(), "uploads", tmpFileName);
                // ensure uploads folder exists
                try { fs.mkdirSync(path.resolve(process.cwd(), 'uploads'), { recursive: true }); } catch (e) { /* ignore */ }
                fs.writeFileSync(tmpPath, base64Data, "base64");

                const qrUpload = await cloudinary.uploader.upload(tmpPath, { folder: "product_codes" });
                codeImageUrl = qrUpload.secure_url || qrUpload.url || "";

                try { fs.unlinkSync(tmpPath); } catch (e) { /* ignore */ }
            } else {
                // For barcode we could use bwip-js server-side; for now fallback to QR image of the code string
                const qrDataUrl = await QRCode.toDataURL(finalCode, { margin: 1, width: 400 });
                const base64Data = qrDataUrl.replace(/^data:image\/(png|jpeg);base64,/, "");
                const tmpFileName = `code-${Date.now()}-${Math.random().toString(36).substring(2,8)}.png`;
                const tmpPath = path.resolve(process.cwd(), "uploads", tmpFileName);
                try { fs.mkdirSync(path.resolve(process.cwd(), 'uploads'), { recursive: true }); } catch (e) { /* ignore */ }
                fs.writeFileSync(tmpPath, base64Data, "base64");
                const qrUpload = await cloudinary.uploader.upload(tmpPath, { folder: "product_codes" });
                codeImageUrl = qrUpload.secure_url || qrUpload.url || "";
                try { fs.unlinkSync(tmpPath); } catch (e) { /* ignore */ }
            }
        } catch (qrErr) {
            console.error("Code generation/upload failed:", qrErr);
        }

        // Update product with code fields
        try {
            const updated = await ProductModel.findByIdAndUpdate(product._id, {
                code: finalCode,
                codeType: codeType,
                codeImage: codeImageUrl
            }, { new: true });

            imagesArr = [];

            return res.status(200).json({
                message: "Product created successfully",
                error: false,
                success: true,
                data: updated,
            });
        } catch (updErr) {
            console.error('Error updating product with code:', updErr);
            return res.status(200).json({
                message: "Product created but code could not be saved",
                error: false,
                success: true,
                data: product,
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

// get all products
export const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        console.log(`[getAllProducts] page=${page} perPage=${perPage}`);

        const totalPost = await ProductModel.countDocuments();
        const totalPage = Math.ceil(totalPost / perPage);

        // If there are no products, return an empty list (200) instead of 404.
        if (totalPost === 0) {
            return res.status(200).json({
                message: "No products found",
                error: false,
                success: true,
                data: [],
                currentPage: 1,
                perPage: perPage,
                totalPost: 0,
                totalPage: 0
            });
        }

        // If requested page number is greater than available pages, return an empty result
        // (avoid returning 404 which the frontend may treat as a hard failure).
        if (totalPage > 0 && page > totalPage) {
            return res.status(200).json({
                message: "Page out of range",
                error: false,
                success: true,
                data: [],
                currentPage: page,
                perPage: perPage,
                totalPost: totalPost,
                totalPage: totalPage
            });
        }

        // ✅ Get products for the requested page
        // Support optional sorting via query params: sortBy=price|rating|size and order=asc|desc
        const sortBy = req.query.sortBy;
        const order = req.query.order === 'desc' ? -1 : 1;
        const sortObj = {};
        if (sortBy) {
            if (sortBy === 'price' || sortBy === 'rating') {
                sortObj[sortBy] = order;
            } else if (sortBy === 'size') {
                // 'size' is an array on the product; sort by the first element when present
                // Mongo/Mongoose can sort by 'size.0' to use the first element of the array
                sortObj['size.0'] = order;
            }
        }

        const query = ProductModel.find();
        if (Object.keys(sortObj).length > 0) query.sort(sortObj);

        const products = await query
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
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        console.log(`[getAllProductsByCatId] page=${page} perPage=${perPage} catId=${req.params.id}`);

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
        // Support optional sorting via query params: sortBy=price|rating|size and order=asc|desc
        const sortBy = req.query.sortBy;
        const order = req.query.order === 'desc' ? -1 : 1;
        const sortObj = {};
        if (sortBy) {
            if (sortBy === 'price' || sortBy === 'rating') {
                sortObj[sortBy] = order;
            } else if (sortBy === 'size') {
                sortObj['size.0'] = order;
            }
        }

        const query = ProductModel.find({ catId: req.params.id });
        if (Object.keys(sortObj).length > 0) query.sort(sortObj);

        const products = await query
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
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        console.log(`[getAllProductsByCatName] page=${page} perPage=${perPage} catName=${req.query.catName}`);

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
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        console.log(`[getAllProductsBySubCatId] page=${page} perPage=${perPage} subCatId=${req.params.id}`);

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
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        console.log(`[getAllProductsBySubCatName] page=${page} perPage=${perPage} subCatName=${req.query.subCatName}`);

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
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        console.log(`[getAllProductsByThirdSubCatId] page=${page} perPage=${perPage} thirdSubCatId=${req.params.id}`);

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
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        console.log(`[getAllProductsByThirdSubCatName] page=${page} perPage=${perPage} thirdSubCat=${req.query.thirdSubCat}`);

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

// multiple delete product controller also delete images from cloudnary
export const deleteMultipleProducts = async (req, res) => {
    try {
        const ids = req.body.ids; // Expecting an array of IDs in the request body

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                message: "Invalid request",
                success: false,
                error: true,
            });
        }

        // Find products by IDs
        const products = await ProductModel.find({ _id: { $in: ids } });

        if (products.length === 0) {
            return res.status(404).json({
                message: "No products found",
                success: false,
                error: true,
            });
        }

        // --- 🧹 Delete Cloudinary Images ---
        for (const product of products) {
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
        }

        // --- 🗑️ Delete Products from MongoDB ---
        await ProductModel.deleteMany({ _id: { $in: ids } });

        return res.status(200).json({
            message: "Products deleted successfully",
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

// lookup product by code (SKU / barcode / QR payload)
export const getProductByCode = async (req, res) => {
    try {
        const code = req.params.code;
        if (!code) {
            return res.status(400).json({ message: 'Code is required', success: false, error: true });
        }

        const product = await ProductModel.findOne({ code: code }).populate('category');

        if (!product) {
            return res.status(404).json({ message: 'Product not found for this code', success: false, error: true });
        }

        return res.status(200).json({ message: 'Product fetched successfully', success: true, error: false, data: product });
    } catch (error) {
        console.error('Get by code error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// Temporary helper endpoint for debugging barcode lookups.
// Tries multiple strategies to find a product matching the scanned value.
export const getProductByCodeSearch = async (req, res) => {
    try {
        const raw = req.params.code;
        if (!raw) {
            return res.status(400).json({ message: 'Code is required', success: false, error: true });
        }

        const code = String(raw).trim();

        // 1) Exact match
        let product = await ProductModel.findOne({ code: code }).populate('category');

        // 2) If not found, try digits-only version (some scanners send only digits)
        if (!product) {
            const digits = code.replace(/\D/g, '');
            if (digits && digits !== code) {
                product = await ProductModel.findOne({ code: digits }).populate('category');
            }
        }

        // 3) If still not found, try partial/contains match (case-insensitive)
        if (!product) {
            product = await ProductModel.findOne({ code: { $regex: code, $options: 'i' } }).populate('category');
        }

        if (!product) {
            return res.status(404).json({ message: `Product not found for this code ${code}`, success: false, error: true });
        }

        return res.status(200).json({ message: 'Product fetched successfully', success: true, error: false, data: product });
    } catch (error) {
        console.error('Get by code-search error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// Lookup endpoint used by admin scanner flow.
// Checks local DB first; if not present, queries external services via utils/productLookup.
export const lookupProduct = async (req, res) => {
    try {
        const barcode = String(req.query.barcode || req.query.code || '').trim();
        if (!barcode) return res.status(400).json({ message: 'barcode query param is required', success: false, error: true });

        // Try local DB using flexible strategies (exact, digits-only, contains)
        let product = await ProductModel.findOne({ code: barcode }).populate('category');

        if (!product) {
            const digits = barcode.replace(/\D/g, '');
            if (digits && digits !== barcode) {
                product = await ProductModel.findOne({ code: digits }).populate('category');
            }
        }

        if (!product) {
            product = await ProductModel.findOne({ code: { $regex: barcode, $options: 'i' } }).populate('category');
        }

        if (product) {
            return res.status(200).json({ message: 'Product found (local)', source: 'local', success: true, error: false, data: product });
        }

        // Not in local DB: try external lookup
        const external = await lookupByBarcode(barcode);
        if (external) {
            return res.status(200).json({ message: 'Product suggested from external source', source: external.source || 'external', success: true, error: false, data: external });
        }

        return res.status(404).json({ message: 'Product not found locally or in external sources', success: false, error: true });
    } catch (error) {
        console.error('lookupProduct error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// Search products by name (admin use). Query param: ?query=...
export const searchProducts = async (req, res) => {
    try {
        const q = String(req.query.query || '').trim();
        if (!q) {
            return res.status(400).json({ message: 'Query is required', success: false, error: true });
        }

        // Determine if caller is public (client site) or admin autocomplete
        // public route is mounted as /public-search in routes
        const isPublic = req.originalUrl && req.originalUrl.includes('/public-search');

        if (isPublic) {
            // support pagination for public searches
            const page = parseInt(req.query.page, 10) || 1;
            const perPage = parseInt(req.query.perPage, 10) || 12;

            const filter = { name: { $regex: q, $options: 'i' } };
            const totalPost = await ProductModel.countDocuments(filter);
            const totalPage = Math.max(1, Math.ceil(totalPost / perPage));

            // fetch full product documents for client listing
            const products = await ProductModel.find(filter)
                .populate('category')
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec();

            return res.status(200).json({
                message: 'Products fetched',
                success: true,
                error: false,
                data: products,
                currentPage: page,
                perPage: perPage,
                totalPost: totalPost,
                totalPage: totalPage
            });
        }

        // admin autocomplete: lightweight response
        const products = await ProductModel.find({ name: { $regex: q, $options: 'i' } }).limit(30).select('name code image').exec();

        return res.status(200).json({ message: 'Products fetched', success: true, error: false, data: products });
    } catch (error) {
        console.error('Search products error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

// add review to product
export const addProductReview = async (req, res) => {
    try {
        const productId = req.params.id;
        const { rating, comment } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized', success: false, error: true });
        }

        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found', success: false, error: true });
        }

        // handle optional review images uploaded via multipart/form-data
        let reviewImages = [];
        try {
            if (req.files && req.files.length > 0) {
                // upload each file to cloudinary and collect secure urls
                for (const f of req.files) {
                    try {
                        const up = await cloudinary.uploader.upload(f.path, { folder: 'product_reviews' });
                        if (up && (up.secure_url || up.url)) {
                            reviewImages.push(up.secure_url || up.url);
                        }
                        // remove temp file
                        try { fs.unlinkSync(f.path); } catch (e) { }
                    } catch (uerr) {
                        console.error('Cloudinary upload error for review image', uerr);
                    }
                }
            }
        } catch (imgEx) {
            console.error('Review image handling error', imgEx);
        }

        const review = {
            userId: req.user.id,
            userName: req.user.name || req.user.email || 'User',
            userAvatar: req.user.avatar || '',
            images: reviewImages,
            rating: Number(rating) || 0,
            comment: comment || '',
            createdAt: new Date()
        };

        product.reviews.push(review);
        product.reviewsCount = product.reviews.length;

        // update average rating
        const totalRating = product.reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
        product.rating = product.reviews.length ? (totalRating / product.reviews.length) : 0;

        await product.save();

        return res.status(200).json({ message: 'Review added', success: true, error: false, data: product });

    } catch (error) {
        console.error('Add review error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
}

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
        // Build an explicit update object so falsy but valid values (e.g. 0) are applied.
        const updateData = {};

        if (req.body.name !== undefined) updateData.name = req.body.name;
        if (req.body.description !== undefined) updateData.description = req.body.description;

        // imagesArr contains either newly uploaded urls or the existing product.image
        updateData.image = imagesArr;

        if (req.body.brand !== undefined) updateData.brand = req.body.brand;

        if (req.body.price !== undefined && req.body.price !== "") updateData.price = Number(req.body.price);
        if (req.body.oldPrice !== undefined && req.body.oldPrice !== "") updateData.oldPrice = Number(req.body.oldPrice);

        if (req.body.catName !== undefined) updateData.catName = req.body.catName;
        if (req.body.catId !== undefined) updateData.catId = req.body.catId;
        if (req.body.subCatName !== undefined) updateData.subCatName = req.body.subCatName;
        if (req.body.subCatId !== undefined) updateData.subCatId = req.body.subCatId;
        if (req.body.thirdSubCat !== undefined) updateData.thirdSubCat = req.body.thirdSubCat;
        if (req.body.thirdSubCatId !== undefined) updateData.thirdSubCatId = req.body.thirdSubCatId;

        if (req.body.countInStock !== undefined && req.body.countInStock !== "") updateData.countInStock = Number(req.body.countInStock);

        if (req.body.isFeatured !== undefined) {
            // Handle boolean values sent as strings from form-data
            if (typeof req.body.isFeatured === 'string') {
                updateData.isFeatured = req.body.isFeatured === 'true';
            } else {
                updateData.isFeatured = Boolean(req.body.isFeatured);
            }
        }

        if (req.body.discount !== undefined && req.body.discount !== "") updateData.discount = Number(req.body.discount);
        if (req.body.rating !== undefined && req.body.rating !== "") updateData.rating = Number(req.body.rating);

        // Arrays: productRam, size, productWeight — multer/form-data may send single string or array
        if (req.body.productRam !== undefined) {
            updateData.productRam = Array.isArray(req.body.productRam) ? req.body.productRam : [req.body.productRam];
        }
        if (req.body.size !== undefined) {
            updateData.size = Array.isArray(req.body.size) ? req.body.size : [req.body.size];
        }
        if (req.body.productWeight !== undefined) {
            updateData.productWeight = Array.isArray(req.body.productWeight) ? req.body.productWeight : [req.body.productWeight];
        }

        // Perform update
        const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

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

// admin: set a product's code (useful for assigning scanned barcode/EAN to an existing product)
export const setProductCode = async (req, res) => {
    try {
        const productId = req.params.id;
        const { code, codeType } = req.body;

        if (!code || String(code).trim() === '') {
            return res.status(400).json({ message: 'Code is required', success: false, error: true });
        }

        // ensure product exists
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found', success: false, error: true });
        }

        // check uniqueness
        const existing = await ProductModel.findOne({ code: String(code).trim(), _id: { $ne: productId } });
        if (existing) {
            return res.status(409).json({ message: 'Code already assigned to another product', success: false, error: true });
        }

        product.code = String(code).trim();
        if (codeType) product.codeType = codeType;
        await product.save();

        return res.status(200).json({ message: 'Code assigned to product', success: true, error: false, data: product });
    } catch (error) {
        console.error('Set product code error', error);
        return res.status(500).json({ message: error.message || error, success: false, error: true });
    }
};

