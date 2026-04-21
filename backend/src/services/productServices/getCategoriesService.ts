import type { GetCategories } from "../../types/productTypes/productInterface.js";

export class GetCategoryService {
  constructor(private category: GetCategories) {}

  async getCategory() {
    return this.category.getCategories();
  }
}
