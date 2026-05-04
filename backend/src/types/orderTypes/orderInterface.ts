import type { CartInterface } from "../cartTypes/cartInterface.js";

export interface OrderData {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  items: CartInterface[];
  total: number;
}

export interface OrderProcesses {
  placeOrder(userId: string, orderdata: OrderData): Promise<void>;

  getUserOrders(userId: string): Promise<OrderData[]>;
}
