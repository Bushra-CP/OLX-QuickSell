import { FetchProductController } from "../../controllers/productController.ts/fetchProductController.js";
import { FetchProductRepository } from "../../repositories/productRepository/fetchProductRepository.js";
import { FetchProductService } from "../../services/productServices/fetchProductService.js";

const fetchProductRepo = new FetchProductRepository();
const fetchProductService = new FetchProductService(fetchProductRepo);
export const fetchProductController = new FetchProductController(
  fetchProductService,
);
