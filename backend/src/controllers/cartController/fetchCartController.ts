import type { Request, Response } from "express";
import type { FetchCartService } from "../../services/cartService/fetchCartService.js";

export class FetchCartController {
  constructor(private fetchCartService: FetchCartService) {}

  fetchCart = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;

      // console.log(userId);

      const cartItems = await this.fetchCartService.fetchCart(userId);

      res.status(200).json(cartItems);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);

      res.status(500).json({
        message: "Something went wrong",
      });
    }
  };
}
