import { response } from "express";
import ErrorHandler from "../utils/error.js";
import asyncErrorHandler from "./../middlewares/asyncError.js";
import { Category } from "./categoryModel.js";

// Add Category ->  http://localhost:8000/api/v1/product/category
export const addCategory = asyncErrorHandler(async (req, res, next) => {
  const { category } = req.body;

  await Category.create({ category });

  res.status(201).json({
    success: true,
    message: "Category added successfully",
  });
});

// Get All  Categories -> http://localhost:8000/api/v1/product/categories
export const getAllCategories = asyncErrorHandler(async (req, res, next) => {
  const categories = await Category.find({});

  res.status(200).json({
    success: true,
    categories,
  });
});

// Delete Category ->  http://localhost:8000/api/v1/product/category/123
export const deleteCategory = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) return next(new ErrorHandler("Category not found", 404));
  const products = await Category.find({ category: category._id });

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    product.category = undefined;
    await product.save();
  }
  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});
