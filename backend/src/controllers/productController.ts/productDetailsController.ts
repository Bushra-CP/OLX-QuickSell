import type { Request, Response } from "express";
import type { ProductDetailsService } from "../../services/productServices/productDetailsService.js";
import mongoose from "mongoose";

export class ProductDetailsController {
  constructor(private productDetailsService: ProductDetailsService) {}

  getProductDetails = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const product = await this.productDetailsService.getProduct(id);

      // console.log(product);

      res.status(200).json(product);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  };
}
