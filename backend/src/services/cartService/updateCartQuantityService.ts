import type { CartRepository } from "../../repositories/cartRepository/cartRepository.js";

export class UpdateCartQuantityService {
  constructor(private cartRepo: CartRepository) {}

  // UPDATE CART QUANTITY
  async updateCartQuantity(userId: string, productId: string, quantity: number) {
    // update quantity of product
    await this.cartRepo.updateProductQuantity(productId, quantity);

    //update cart quantity
    return await this.cartRepo.updateQuantityInCart(
      userId,
      productId,
      quantity,
    );
  }
}
