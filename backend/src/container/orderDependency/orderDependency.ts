import { OrderController } from "../../controllers/orderController/orderController.js";
import { OrderRepository } from "../../repositories/orderRepository/orderRepository.js";
import { OrderService } from "../../services/orderService/orderService.js";

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
export const orderController = new OrderController(orderService);
