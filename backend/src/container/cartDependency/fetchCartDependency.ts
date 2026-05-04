import { FetchCartController } from "../../controllers/cartController/fetchCartController.js";
import { CartRepository } from "../../repositories/cartRepository/cartRepository.js";
import { FetchCartService } from "../../services/cartService/fetchCartService.js";

const cartRepository = new CartRepository();
const fetchCartService = new FetchCartService(cartRepository);
export const fetchCartController = new FetchCartController(fetchCartService);
