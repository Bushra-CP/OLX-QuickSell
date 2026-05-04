import type { CartRepository } from "../../repositories/cartRepository/cartRepository.js";

export class FetchCartService {
  constructor(private fetchCartRepo: CartRepository) {}

  // FETCH CART
  async fetchCart(userId: string) {
    return await this.fetchCartRepo.fetchCart(userId);
  }
}
