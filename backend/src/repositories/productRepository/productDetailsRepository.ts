import { productModel } from "../../model/productModel.js";
import type { GetProductDetailsInterface } from "../../types/productTypes/productInterface.js";

export class ProductDetailsRepository implements GetProductDetailsInterface {
  async getProductDetails(id: string) {
    const product = await productModel.findById(id).lean();

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }
}
