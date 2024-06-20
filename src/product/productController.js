import asyncErrorHandler from "../middlewares/asyncError.js";
import ErrorHandler from "../utils/error.js";
import { getDataUri } from "../utils/features.js";
import { Product } from "./productModel.js";
import cloudinary from "cloudinary";

// Get All Product -> http://localhost:8000/api/v1/product/all
export const getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({
    success: true,
    products,
  });
});

// Get Single Product -> http://localhost:8000/api/v1/product/single/123
export const getProductDetails = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  res.status(200).json({
    success: true,
    product,
  });
});

// Create a new product -> http://localhost:8000/api/v1/product/new
export const createProduct = asyncErrorHandler(async (req, res, next) => {
  const { name, description, price, stock, category } = req.body;

  if (!req.file) return next(new ErrorHandler("Please add image", 400));

  const file = getDataUri(req.file);
  const myCloud = await cloudinary.v2.uploader.upload(file.content);
  const image = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await Product.create({
    name,
    description,
    price,
    stock,
    category,
    images: [image],
  });
  res.status(200).json({
    success: true,
    message: "Product created successfully",
  });
});

// Update product ->http://localhost:8000/api/v1/product/single/667427d24a18374cc0eefed7
export const updateProduct = asyncErrorHandler(async (req, res, next) => {
  const { name, description, price, stock, category } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category) product.category = category;

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
  });
});

// Update product ->http://localhost:8000/api/v1/product/single/667427d24a18374cc0eefed7
export const deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// Add Image -> http://localhost:8000/api/v1/product/images/667427d24a18374cc0eefed7
export const addProductImage = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  if (!req.file) return next(new ErrorHandler("Please add image", 400));

  const file = getDataUri(req.file);
  const myCloud = await cloudinary.v2.uploader.upload(file.content);
  const image = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  product.images.push(image);
  await product.save();

  res.status(200).json({
    success: true,
    message: "Image added successfully",
  });
});

// Delete Image -> http://localhost:8000/api/v1/product/images/667427d24a18374cc0eefed7?id=66742dfdec4bff00884ec0fb
export const deleteProductImage = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  const { id } = req.query;
  if (!id) return next(new ErrorHandler("Please image id", 400));

  let isExist = -1;

  product.images.forEach((item, index) => {
    if (item._id.toString() === id.toString()) isExist = index;
  });

  if (isExist < 0) return next(new ErrorHandler("Image does not exist", 400));

  await cloudinary.v2.uploader.destroy(product.images[isExist].public_id);

  product.images.splice(isExist, 1);

  await product.save();

  res.status(200).json({
    success: true,
    message: "Image deleted successfully",
  });
});
