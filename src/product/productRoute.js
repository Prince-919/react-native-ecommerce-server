import express from "express";
import {
  addProductImage,
  createProduct,
  deleteProduct,
  deleteProductImage,
  getAdminProducts,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from "./productController.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
} from "../category/categoryController.js";

const router = express.Router();

router.get("/all", getAllProducts);
router.get("/admin", isAuthenticated, isAdmin, getAdminProducts);
router
  .route("/single/:id")
  .get(getProductDetails)
  .put(isAuthenticated, isAdmin, updateProduct)
  .delete(isAuthenticated, isAdmin, deleteProduct);
router.post("/new", isAuthenticated, isAdmin, singleUpload, createProduct);
router
  .route("/images/:id")
  .post(isAuthenticated, isAdmin, singleUpload, addProductImage)
  .delete(isAuthenticated, isAdmin, deleteProductImage);

router.post("/category", isAuthenticated, isAdmin, addCategory);
router.get("/categories", getAllCategories);
router.delete("/category/:id", isAuthenticated, isAdmin, deleteCategory);

export default router;
