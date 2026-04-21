import type { Request, Response } from "express";
import type { GetCategoryService } from "../../services/productServices/getCategoriesService.js";

export class GetCategoriesController {
  constructor(private getCategoryService: GetCategoryService) {}

  getCategories = async (req: Request, res: Response) => {
    try {
      const categories = await this.getCategoryService.getCategory();
      // console.log('cat:',categories);
      res.status(200).json(categories);
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
