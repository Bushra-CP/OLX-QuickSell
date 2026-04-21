import { productModel } from "../../model/productModel.js";
import type {
  AddProductInterface,
  ProductInterface,
} from "../../types/productTypes/productInterface.js";

export class AddProductRepository implements AddProductInterface {
  async addProduct(data: ProductInterface) {
    return productModel.create(data);
  }
}
