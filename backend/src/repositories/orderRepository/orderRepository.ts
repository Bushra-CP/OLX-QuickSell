import cartModel from "../../model/cartModel.js";
import orderModel from "../../model/orderModel.js";
import type {
  OrderData,
  OrderProcesses,
} from "../../types/orderTypes/orderInterface.js";

export class OrderRepository implements OrderProcesses {
  //PLACE ORDER
  async placeOrder(userId: string, orderData: OrderData) {
    //save order
    const existing = await orderModel.findOne({ userId });

    if (existing) {
      await orderModel.findOneAndUpdate(
        { userId },

        {
          $push: { orders: orderData },
        },

        { new: true },
      );
    } else {
      await orderModel.create({
        userId,

        orders: [orderData],
      });
    }

    //clear cart
    await cartModel.findOneAndUpdate({ userId }, { $set: { items: [] } });
  }

  //GET USER ORDERS
  async getUserOrders(userId: string): Promise<OrderData[]> {
    const res = await orderModel.findOne(
      { userId },
      { orders: 1, createdAt: 1, _id: 0 },
    );

    if (!res) return [];

    const sortedOrders = res.orders.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return sortedOrders;
  }
}
