import {Router} from "express";
import {createProduct, deleteMultipleProducts, deleteProduct, getAllProducts, getAllProductsByCatId, getAllProductsByCatName, getAllProductsByFeatured, getAllProductsByPriceRange, getAllProductsByRating, getAllProductsBySubCatId, getAllProductsBySubCatName, getAllProductsCount, getSingleProduct, updateProduct} from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.js";
import {upload} from "../middlewares/multer.js";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/category", getAllProductsByCatName);
productRouter.get("/category/:id", getAllProductsByCatId);
productRouter.get("/subCategoryByName", getAllProductsBySubCatName);
productRouter.get("/subCategoryById/:id", getAllProductsBySubCatId);
productRouter.get("/price", getAllProductsByPriceRange);
productRouter.get("/rating", getAllProductsByRating);
productRouter.get("/getAllProductsCount", getAllProductsCount);
productRouter.get("/getAllProductsByFeatured", getAllProductsByFeatured);
// productRouter.get("/:id", getAllProductsByCatId);
productRouter.post("/create", authMiddleware, upload.array("image"), createProduct);
productRouter.delete("/delete/:id", authMiddleware, deleteProduct);
productRouter.delete("/delete-multiple", authMiddleware, deleteMultipleProducts);
productRouter.get("/:id", getSingleProduct);
productRouter.put("/update/:id", authMiddleware, upload.array("image"), updateProduct);


export default productRouter;