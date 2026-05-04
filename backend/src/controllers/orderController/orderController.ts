import type { Request, Response } from "express";
import type { OrderService } from "../../services/orderService/orderService.js";

export class OrderController {
  constructor(private orderService: OrderService) {}

  placeOrder = async (req: Request, res: Response) => {
    try {
      const orderData  = req.body;

      console.log(orderData)

      const userId = (req as any).userId;

      await this.orderService.placeOrder(userId, orderData);

      res.status(200).json({
        message: "Order placed successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Checkout failed",
      });
    }
  };

  getOrders = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;

      const orders = await this.orderService.getOrders(userId);

      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch orders",
      });
    }
  };
}
