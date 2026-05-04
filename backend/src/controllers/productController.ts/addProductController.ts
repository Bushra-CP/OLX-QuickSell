import type { Request, Response } from "express";
import type { AddProductService } from "../../services/productServices/addProductService.js";
import cloudinary from "../../config/cloudinary.js";
import type { EditProductInterface } from "../../types/productTypes/productInterface.js";

export class AddProductController {
  constructor(private productService: AddProductService) {}

  addProduct = async (req: Request, res: Response) => {
    try {
      // console.log(req.body);
      // console.log(req.file);
      const userId = (req as any).userId;
      // console.log(userId);

      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      const { title, description, price, category, quantity } = req.body;

      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      const image = result.secure_url;

      const data = {
        userId,
        title,
        description,
        price: Number(price),
        category,
        quantity,
        image,
      };

      const product = await this.productService.newProduct(data);

      res.status(201).json({
        message: "Product created",
        product,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  };

  //UPDATE PRODUCT
  updateProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      // console.log(productId);

      const { title, description, price, category, quantity } = req.body;

      let image;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "image",
        });
        image = result.secure_url;
      }

      const data: EditProductInterface = {
        title,
        description,
        price: Number(price),
        category,
        quantity,
      };

      await this.productService.updateProduct(productId as string, data, image);

      res.status(200).json({
        message: "Product updated successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(400).json({
        message: (error as Error).message || "Update failed",
      });
    }
  };

  //DELETE PRODUCT
  deleteProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      await this.productService.deleteProduct(productId as string);

      res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server error",
      });
    }
  };
}
