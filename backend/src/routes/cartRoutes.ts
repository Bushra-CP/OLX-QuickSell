import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { addToCartController } from "../container/cartDependency/addToCartDependency.js";
import { fetchCartController } from "../container/cartDependency/fetchCartDependency.js";
import { updateCartQuantityController } from "../container/cartDependency/updateCartQuantityRepository.js";
const router = express.Router();

router.get("/", verifyToken, fetchCartController.fetchCart);

router.post("/addToCart", verifyToken, addToCartController.addToCart);

router.patch(
  "/updateCartQuantity/:productId",
  verifyToken,
  updateCartQuantityController.updateCartQuantity,
);

export default router;
