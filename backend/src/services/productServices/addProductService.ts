import type {
  AddProductInterface,
  ProductInterface,
} from "../../types/productTypes/productInterface.js";

export class AddProductService {
  constructor(private productAdd: AddProductInterface) {}

  async newProduct(data: ProductInterface) {
    return this.productAdd.addProduct(data);
  }
}
