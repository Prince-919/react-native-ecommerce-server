import express from "express";
import {
  addProductImage,
  createProduct,
  deleteProduct,
  deleteProductImage,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from "./productController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
} from "../category/categoryController.js";

const router = express.Router();

router.get("/all", getAllProducts);
router
  .route("/single/:id")
  .get(getProductDetails)
  .put(isAuthenticated, updateProduct)
  .delete(isAuthenticated, deleteProduct);
router.post("/new", isAuthenticated, singleUpload, createProduct);
router
  .route("/images/:id")
  .post(isAuthenticated, singleUpload, addProductImage)
  .delete(isAuthenticated, deleteProductImage);

router.post("/category", isAuthenticated, addCategory);
router.get("/categories", getAllCategories);
router.delete("/category/:id", isAuthenticated, deleteCategory);

export default router;