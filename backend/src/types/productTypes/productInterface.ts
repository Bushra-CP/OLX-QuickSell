export interface ProductInterface {
  _id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  quantity:number;
  image: string;
  status?: "available" | "reserved" | "sold";
}

export interface Category {
  category: string;
}

export interface Filters {
  search?: string;
  category?: string[];
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  page?: number;
  limit: number;
}

export interface ProductListingResponse {
  products: ProductInterface[];
  page: number;
  totalPages: number;
  total: number;
}

export interface AddProductInterface {
  addProduct(data: ProductInterface): Promise<ProductInterface>;
}

export interface FetchProductInterface {
  fetchProductHome(): Promise<ProductInterface[]>;
  fetchProductListing(filter: Filters): Promise<ProductListingResponse>;
}

export interface GetCategories {
  getCategories(): Promise<string[]>;
}

export interface GetProductDetailsInterface {
  getProductDetails(id: string): Promise<ProductInterface>;
}
