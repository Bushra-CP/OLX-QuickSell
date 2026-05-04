import mongoose, { Schema } from "mongoose";
import type { ProductInterface } from "../types/productTypes/productInterface.js";

const productSchema = new Schema<ProductInterface>(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    },
  },
  {
    timestamps: true,
  },
);

export const productModel = mongoose.model<ProductInterface>(
  "Products",
  productSchema,
);
