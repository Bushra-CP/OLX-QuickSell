export interface ProductInterface {
  _id?: string;
  userId: string;
  title: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  image: string;
  status?: "available" | "reserved" | "sold";
}

export interface EditProductInterface {
  userId?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  image?: string | undefined;
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

export interface AddEditProductInterface {
  addProduct(data: ProductInterface): Promise<ProductInterface>;
  editProduct(productId: string, data: EditProductInterface): Promise<void>;
  deleteProduct(productId: string): Promise<void>;
}

export interface FetchProductInterface {
  fetchProductHome(): Promise<ProductInterface[]>;
  fetchProductListing(filter: Filters): Promise<ProductListingResponse>;
  fetchUserProducts(userId: string): Promise<ProductInterface[]>;
}

export interface GetCategories {
  getCategories(): Promise<string[]>;
}

export interface GetProductDetailsInterface {
  getProductDetails(id: string): Promise<ProductInterface>;
}
