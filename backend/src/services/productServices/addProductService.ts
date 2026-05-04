import type {
  AddEditProductInterface,
  EditProductInterface,
  ProductInterface,
} from "../../types/productTypes/productInterface.js";

export class AddProductService {
  constructor(private productAdd: AddEditProductInterface) {}

  async newProduct(data: ProductInterface) {
    return this.productAdd.addProduct(data);
  }

  async updateProduct(
    productId: string,
    updateData: EditProductInterface,
    image?: string,
  ) {
    if (image) {
      updateData.image = image;
    }

    await this.productAdd.editProduct(productId, updateData);
  }

  async deleteProduct(productId: string) {
    await this.productAdd.deleteProduct(productId);
  }
}
