import { AddToCartController } from "../../controllers/cartController/addToCartController.js";
import { CartRepository } from "../../repositories/cartRepository/cartRepository.js";
import { AddToCartService } from "../../services/cartService/addToCartService.js";

const cartRepository = new CartRepository();
const addToCartService = new AddToCartService(cartRepository);
export const addToCartController = new AddToCartController(addToCartService);
