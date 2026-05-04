import type {
  FetchProductInterface,
  Filters,
} from "../../types/productTypes/productInterface.js";

export class FetchProductService {
  constructor(private productList: FetchProductInterface) {}

  async productFetch() {
    return this.productList.fetchProductHome();
  }

  async productListingFetch(filter: Filters) {
    return this.productList.fetchProductListing(filter);
  }

  async fetchUserProducts(userId: string) {
    return this.productList.fetchUserProducts(userId);
  }
}
