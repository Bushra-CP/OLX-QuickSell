import type { Request, Response } from "express";
import type { AddToCartService } from "../../services/cartService/addToCartService.js";

export class AddToCartController {
  constructor(private addToCartService: AddToCartService) {}

  addToCart = async (req: Request, res: Response) => {
    try {
      const { productId, quantity } = req.body;
      const userId = (req as any).userId;

      const result = await this.addToCartService.addToCart(
        userId,
        productId,
        quantity,
      );

      res.status(200).json({
        message: "Product added to cart",
        data: result,
      });
    } catch (error) {
      console.error("Add to Cart Error:", error);

      res.status(500).json({
        message: "Something went wrong",
      });
    }
  };
}
