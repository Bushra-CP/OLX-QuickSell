import type { ProductInterface } from "@/types/productInterface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//function for productFetch
export const productFetch = createAsyncThunk("products/productFetch", async () => {
  const res = await axios.get("http://localhost:3000/quickSell/");
  return res.data;
});

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
  reducers: {},
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

export default productSlice.reducer;
