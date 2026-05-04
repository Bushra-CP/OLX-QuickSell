import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { orderController } from "../container/orderDependency/orderDependency.js";

const router = express.Router();

router.post("/placeOrder", verifyToken, orderController.placeOrder);

router.get("/getOrders", verifyToken, orderController.getOrders);

export default router;
