import { response } from "express";
import { stripe } from "../../server.js";
import asyncErrorHandler from "../middlewares/asyncError.js";
import { Product } from "../product/productModel.js";
import ErrorHandler from "../utils/error.js";
import { Order } from "./orderModel.js";

// Order Create -> http://localhost:8000/api/v1/order/new
export const createOrder = asyncErrorHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethods,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
  } = req.body;

  await Order.create({
    user: req.user._id,
    shippingInfo,
    orderItems,
    paymentMethods,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
  });

  for (let i = 0; i < orderItems.length; i++) {
    const product = await Product.findById(orderItems[i].product);
    product.stock -= orderItems[i].quantity;

    await product.save();
  }

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
  });
});

// Get My Orders -> http://localhost:8000/api/v1/order/my
export const getMyOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    orders,
  });
});

// Get Admin Orders -> http://localhost:8000/api/v1/order/my
export const getAdminOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find({});
  res.status(200).json({
    success: true,
    orders,
  });
});

// Get Order Details-> http://localhost:8000/api/v1/order/single/123
export const getOrderDetails = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new ErrorHandler("Order not found", 404));
  res.status(200).json({
    success: true,
    order,
  });
});

// Proccess Order -> http://localhost:8000/api/v1/order/single/123
export const proccessOrder = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new ErrorHandler("Order Not Found", 404));

  if (order.orderStatus === "Preparing") order.orderStatus = "Shipped";
  else if (order.orderStatus === "Shipped") {
    order.orderStatus = "Delivered";
    order.deliveredAt = new Date(Date.now());
  } else return next(new ErrorHandler("Order Already Delivered", 400));

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order processed successfully",
  });
});

export const proccessPayment = asyncErrorHandler(async (req, res, next) => {
  const { totalAmount } = req.body;

  const { client_secret } = await stripe.paymentIntents.create({
    amount: Number(totalAmount * 100),
    currency: "inr",
  });

  res.status(200).json({
    success: true,
    client_secret,
  });
});
