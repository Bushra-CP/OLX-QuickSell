import type { Request, Response } from "express";
import type { UpdateCartQuantityService } from "../../services/cartService/updateCartQuantityService.js";

export class UpdateCartQuantityController {
  constructor(private updateCartQuantityService: UpdateCartQuantityService) {}

  updateCartQuantity = async (
    req: Request<{ productId: string }>,
    res: Response,
  ) => {
    try {
      const { productId } = req.params;

      const { quantity } = req.body;

      const userId = (req as any).userId;

      await this.updateCartQuantityService.updateCartQuantity(
        userId,
        productId,
        quantity,
      );

      res.status(200).json({
        message: "Item removed successfully",
      });
    } catch (error) {
      console.error("Remove cart error:", error);

      res.status(500).json({
        message: "Something went wrong",
      });
    }
  };
}
