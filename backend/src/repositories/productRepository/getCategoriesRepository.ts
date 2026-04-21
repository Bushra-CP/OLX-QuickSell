import { productModel } from "../../model/productModel.js";
import type { GetCategories } from "../../types/productTypes/productInterface.js";

export class GetCategoriesRepository implements GetCategories {
  async getCategories() {
    return productModel.distinct("category");
  }
}
