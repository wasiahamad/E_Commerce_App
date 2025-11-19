import {Router} from "express";
import {createProduct, deleteMultipleProducts, deleteProduct, getAllProducts, getAllProductsByCatId, getAllProductsByCatName, getAllProductsByFeatured, getAllProductsByPriceRange, getAllProductsByRating, getAllProductsBySubCatId, getAllProductsBySubCatName, getAllProductsCount, getSingleProduct, updateProduct, getProductByCode, getProductByCodeSearch, lookupProduct, getAllProductsByThirdSubCatId } from "../controllers/product.controller.js";
import { addProductReview } from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.js";
import {upload} from "../middlewares/multer.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/category", getAllProductsByCatName);
productRouter.get("/category/:id", getAllProductsByCatId);
productRouter.get("/subCategoryByName", getAllProductsBySubCatName);
productRouter.get("/subCategoryById/:id", getAllProductsBySubCatId);
productRouter.get("/thirdSubCategoryById/:id", getAllProductsByThirdSubCatId);
productRouter.get("/price", getAllProductsByPriceRange);
productRouter.get("/rating", getAllProductsByRating);
productRouter.get("/getAllProductsCount", getAllProductsCount);
productRouter.get("/getAllProductsByFeatured", getAllProductsByFeatured);
// productRouter.get("/:id", getAllProductsByCatId);
productRouter.post("/create", authMiddleware, upload.array("image"), createProduct);
productRouter.delete("/delete/:id", authMiddleware, deleteProduct);
productRouter.delete("/delete-multiple", authMiddleware, deleteMultipleProducts);
// route to lookup by code (must come before '/:id' to avoid conflicts)
productRouter.get("/code/:code", authMiddleware, getProductByCode);
// admin scanner lookup: check local DB then external services
// support both query param and path param styles
productRouter.get("/lookup/:barcode", authMiddleware, lookupProduct);
productRouter.get("/lookup", authMiddleware, lookupProduct);
// temporary public search that tries multiple match strategies. Remove or protect in production.
// Make the debug search admin-protected to avoid exposing DB info publicly.
productRouter.get("/code-search/:code", authMiddleware, getProductByCodeSearch);
// admin product name search for autocomplete
productRouter.get("/search", authMiddleware, (req, res, next) => {
	import('../controllers/product.controller.js').then(mod => mod.searchProducts(req, res, next)).catch(next);
});
// public product search (used by client site)
productRouter.get("/public-search", (req, res, next) => {
    import('../controllers/product.controller.js').then(mod => mod.searchProducts(req, res, next)).catch(next);
});
productRouter.get("/:id", getSingleProduct);
// admin route to assign a code to a product
productRouter.put("/set-code/:id", authMiddleware, async (req, res, next) => {
	// forward to controller
	// lazy load controller to avoid circular issues
	import('../controllers/product.controller.js').then(mod => mod.setProductCode(req, res, next)).catch(next);
});
productRouter.put("/update/:id", authMiddleware, upload.array("image"), updateProduct);
productRouter.post('/:id/review', authMiddleware, upload.array('reviewImages', 5), addProductReview);


export default productRouter;