import type { OrderRepository } from "../../repositories/orderRepository/orderRepository.js";
import type { OrderData } from "../../types/orderTypes/orderInterface.js";

export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async placeOrder(userId: string, orderData: OrderData) {
    await this.orderRepository.placeOrder(userId, orderData);
  }

  async getOrders(userId: string) {
    return await this.orderRepository.getUserOrders(userId);
  }
}
