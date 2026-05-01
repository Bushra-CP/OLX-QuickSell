import api from "@/api/api";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//////////////////////////////////////////////////////
// cart related APIs
export const getCartAPI = async () => {
  const res = await api.get("http://localhost:3000/quickSell/cart");
  return res.data;
};

export const addToCartAPI = async (data: {
  productId: string;
  quantity: number;
}) => {
  try {
    const res = await api.post(
      "http://localhost:3000/quickSell/cart/addToCart",
      data,
    );
    return res.data;
  } catch (error: unknown) {
    let message = "Something went wrong";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }

    throw new Error(message);
  }
};

export const updateCartAPI = async (productId: string, quantity: number) => {
  const res = await api.put(
    `http://localhost:3000/quickSell/updateCart/${productId}`,
    { quantity },
  );
  return res.data;
};

export const removeFromCartAPI = async (productId: string) => {
  const res = await api.delete(
    `http://localhost:3000/quickSell/removeFromCart/${productId}`,
  );
  return res.data;
};

////////////////////////////////////////////////////////

interface CartItem {
  productId: string;
  title: string;
  price: number;
  category: string;
  quantity: number;
  image: string;
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },

    addToCart: (state, action) => {
      const existing = state.cartItems.find(
        (item) => item.productId == action.payload.productId,
      );

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },

    updateQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.productId == action.payload.productId,
      );

      if (item) {
        item.quantity += action.payload.quantity;

        if (item?.quantity <= 0) {
          state.cartItems = state.cartItems.filter(
            (i) => i.productId !== action.payload.productId,
          );
        }
      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload,
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { setCart, addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
