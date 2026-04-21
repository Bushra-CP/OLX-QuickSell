import type { ProductDetailsRepository } from "../../repositories/productRepository/productDetailsRepository.js";

export class ProductDetailsService {
  constructor(private productDetailsRepo: ProductDetailsRepository) {}

  async getProduct(id: string) {
    return this.productDetailsRepo.getProductDetails(id);
  }
}
