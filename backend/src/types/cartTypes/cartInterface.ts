import type { ProductInterface } from "../productTypes/productInterface.js";

export interface CartInterface {
  productId: string;
  title: string;
  price: number;
  category: string;
  quantity: number;
  image: string;
}

export interface CartProcesses {
  getProductDetails(id: string): Promise<ProductInterface>;

  addToCart(userId: string, data: CartInterface): Promise<void>;

  updateProductQuantity(productId: string, quantity: number): Promise<void>;

  fetchCart(userId: string): Promise<CartInterface[]>;

  updateQuantityInCart(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<void>;
}
