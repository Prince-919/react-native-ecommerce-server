import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Produt name is required"],
  },
  description: {
    type: String,
    required: [true, "Description name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price name is required"],
  },
  stock: {
    type: Number,
    required: [true, "Stock name is required"],
  },
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Product = mongoose.model("Product", productSchema);
