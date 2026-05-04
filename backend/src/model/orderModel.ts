import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const singleOrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },

    items: [orderItemSchema],

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Success",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true },
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    orders: [singleOrderSchema],
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
