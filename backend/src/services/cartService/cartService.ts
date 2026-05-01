import type { CartInterface, CartProcesses } from "../../types/cartTypes/cartInterface.js";

export class CartService {
  constructor(private cart: CartProcesses) {}

  // 🛒 FETCH CART
  async fetchCart(userId: string) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    return await this.cart.fetchCart(userId);
  }

    // ➕ ADD TO CART
  async addToCart(userId: string, data: CartInterface) {
    return await this.cart.addToCart(userId, data);
  }

  
}
