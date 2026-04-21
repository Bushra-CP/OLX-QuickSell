import { AddProductController } from "../../controllers/productController.ts/addProductController.js";
import { AddProductRepository } from "../../repositories/productRepository/addProductRepository.js";
import { AddProductService } from "../../services/productServices/addProductService.js";

const addProductRepository = new AddProductRepository();
const addProductService = new AddProductService(addProductRepository);
export const addProductController = new AddProductController(addProductService);
