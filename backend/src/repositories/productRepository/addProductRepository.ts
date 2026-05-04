import { productModel } from "../../model/productModel.js";
import type {
  AddEditProductInterface,
  ProductInterface,
} from "../../types/productTypes/productInterface.js";

export class AddProductRepository implements AddEditProductInterface {
  async addProduct(data: ProductInterface) {
    return productModel.create(data);
  }

  async editProduct(productId: string, updateData: ProductInterface) {
    await productModel.findByIdAndUpdate(productId, { $set: updateData });
  }

  async deleteProduct(productId: string) {
    await productModel.findByIdAndDelete(productId);
  }
}
