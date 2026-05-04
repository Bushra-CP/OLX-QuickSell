import { UpdateCartQuantityController } from "../../controllers/cartController/updateCartQuantityController.js";
import { CartRepository } from "../../repositories/cartRepository/cartRepository.js";
import { UpdateCartQuantityService } from "../../services/cartService/updateCartQuantityService.js";

const cartRepository = new CartRepository();
const updateCartQuantityService = new UpdateCartQuantityService(cartRepository);
export const updateCartQuantityController = new UpdateCartQuantityController(
  updateCartQuantityService,
);
