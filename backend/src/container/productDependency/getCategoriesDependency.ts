import { GetCategoriesController } from "../../controllers/productController.ts/getCategoriesController.js";
import { GetCategoriesRepository } from "../../repositories/productRepository/getCategoriesRepository.js";
import { GetCategoryService } from "../../services/productServices/getCategoriesService.js";

const getCategoryRepo = new GetCategoriesRepository();
const getCategoryService = new GetCategoryService(getCategoryRepo);
export const getCategoryController = new GetCategoriesController(
  getCategoryService,
);
