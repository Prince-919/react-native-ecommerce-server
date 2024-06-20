import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Category is required"],
  },
});

export const Category = mongoose.model("Category", categorySchema);
