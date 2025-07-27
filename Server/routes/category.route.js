import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { createCategory, deleteCategory, getAllCategories, getCategoryCount, getSingleCategory, getSubCategoryCount, removeCategoryImage, updateCategory } from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/count", getCategoryCount);
categoryRouter.get("/sub-count", getSubCategoryCount);
categoryRouter.get("/:id", getSingleCategory);
categoryRouter.post("/create", authMiddleware, upload.array("image"), createCategory);
categoryRouter.delete("/delete-avatar", authMiddleware, removeCategoryImage);
categoryRouter.delete("/delete/:id", authMiddleware, deleteCategory);
categoryRouter.put("/update/:id", upload.array("image"), authMiddleware, updateCategory);


export default categoryRouter;