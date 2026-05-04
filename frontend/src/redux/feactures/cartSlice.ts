import api from "@/api/api";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//////////////////////////////////////////////////////
// cart related APIs
export const getCartAPI = async () => {
  try {
    const res = await api.get("/cart");
    return res.data;
  } catch (error) {
    let message = "Something went wrong";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }

    throw new Error(message);
  }
};

export const addToCartAPI = async (data: {
  productId: string;
  quantity: number;
}) => {
  try {
    const res = await api.post("/cart/addToCart", data);
    return res.data;
  } catch (error: unknown) {
    let message = "Something went wrong";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }

    throw new Error(message);
  }
};

export const updateCartQuantityAPI = async (
  productId: string,
  quantity: number,
) => {
  try {
    const res = await api.patch(`/cart/updateCartQuantity/${productId}`, {
      quantity,
    });

    return res.data;
  } catch (error) {
    let message = "Something went wrong";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
    }

    throw new Error(message);
  }
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

    updateCartQuantity: (state, action) => {
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

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { setCart, addToCart, updateCartQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
