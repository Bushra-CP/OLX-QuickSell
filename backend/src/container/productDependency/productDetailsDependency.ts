import { ProductDetailsController } from "../../controllers/productController.ts/productDetailsController.js";
import { ProductDetailsRepository } from "../../repositories/productRepository/productDetailsRepository.js";
import { ProductDetailsService } from "../../services/productServices/productDetailsService.js";

const productDetailsRepo = new ProductDetailsRepository();
const productDetailsService = new ProductDetailsService(productDetailsRepo);
export const productDetailsController = new ProductDetailsController(
  productDetailsService,
);
