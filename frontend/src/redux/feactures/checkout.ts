import api from "@/api/api";
import axios from "axios";

interface CartInterface {
  productId: string;
  title: string;
  price: number;
  category: string;
  quantity: number;
  image: string;
}

export interface CheckoutInterface {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  items: CartInterface[]; // you can type this properly later
  total: number;
}

export const checkoutAPI = async (orderData: CheckoutInterface) => {
  try {
    const res = await api.post("/order/placeOrder", orderData);

    return res.data;
  } catch (error) {
    let message = "Failed to place order";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message || message;
    }

    throw new Error(message);
  }
};

export const getUserOrdersAPI = async () => {
  const res = await api.get("/order/getOrders");
  return res.data;
};
