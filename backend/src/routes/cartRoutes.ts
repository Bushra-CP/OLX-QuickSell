import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { addToCartController } from "../container/cartDependency/addToCartDependency.js";
const router = express.Router();

router.post("/addToCart", verifyToken, addToCartController.addToCart);

export default router;
