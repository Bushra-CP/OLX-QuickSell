import api from "@/api/api";
import type { ProductInterface } from "@/types/productInterface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//function for productFetch
export const productFetch = createAsyncThunk(
  "products/productFetch",
  async () => {
    const res = await axios.get("http://localhost:3000/quickSell/");
    return res.data;
  },
);

//TO GET USER PRODUCTS
export const getUserProductsAPI = async () => {
  const res = await api.get("/myProducts");
  return res.data;
};

//TO DELETE A PRODUCT
export const deleteProductAPI = async (productId: string) => {
  const res = await api.delete(`/deleteProduct/${productId}`, {
    withCredentials: true,
  });
  return res.data;
};

// TO GET A PRODUCT
export const getSingleProductAPI = async (productId: string) => {
  const res = await axios.get(
    `http://localhost:3000/quickSell/product/${productId}`,
  );
  return res.data;
};

//UPDATE PRODUCT DETAILS
export const updateProductAPI = async (
  productId: string,
  formData: FormData,
) => {
  const res = await api.put(`/editProduct/${productId}`, formData, {
    withCredentials: true,
  });
  return res.data;
};

///////////////////////////////////////////////

interface ProductType {
  products: ProductInterface[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductType = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id == action.payload.productId,
      );

      if (item) {
        item.quantity += action.payload.quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productFetch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(productFetch.rejected, (state) => {
        state.loading = false;
        state.error = "failed to fetch products";
      });
  },
});

export const { updateQuantity } = productSlice.actions;

export default productSlice.reducer;
