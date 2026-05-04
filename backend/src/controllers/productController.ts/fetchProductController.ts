import type { Request, Response } from "express";
import type { FetchProductService } from "../../services/productServices/fetchProductService.js";

export class FetchProductController {
  constructor(private fetchProductService: FetchProductService) {}

  fetchProductHomeScreen = async (req: Request, res: Response) => {
    try {
      const products = await this.fetchProductService.productFetch();

      res.status(200).json(products);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  };

  fetchProductListing = async (req: Request, res: Response) => {
    try {
      // console.log(req.query);

      const filter = {
        search: typeof req.query.search == "string" ? req.query.search : "",
        category:
          typeof req.query.category == "string" &&
          req.query.category.trim() !== ""
            ? req.query.category.split(",")
            : [],
        minPrice:
          typeof req.query.minPrice == "string"
            ? Number(req.query.minPrice)
            : undefined,
        maxPrice:
          typeof req.query.maxPrice == "string"
            ? Number(req.query.maxPrice)
            : undefined,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 8,
      };

      const { products, page, totalPages, total } =
        await this.fetchProductService.productListingFetch(filter);

      res.status(200).json({ products, page, totalPages, total });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  };

  fetchUserProducts = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;

      const products = await this.fetchProductService.fetchUserProducts(userId);

      // console.log(products);

      res.json({ products });
    } catch (error) {
      console.log(error);
    }
  };
}
