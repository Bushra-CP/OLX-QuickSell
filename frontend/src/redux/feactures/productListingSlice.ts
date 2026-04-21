import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { ProductInterface } from "@/types/productInterface";

interface Filters {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: number;
  limit?: number;
}

interface ProductListingState {
  products: ProductInterface[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  total: number;
}

const initialState: ProductListingState = {
  products: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  total: 1,
};

export const fetchProductListing = createAsyncThunk(
  "productsListing/fetchProductListing",
  async (filters: Filters) => {
    const res = await axios.get("http://localhost:3000/quickSell/products", {
      params: { ...filters, page: filters.page || 1, limit: 8 },
    });
    return res.data;
  },
);

const productListingSlice = createSlice({
  name: "productsListing",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductListing.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      })
      .addCase(fetchProductListing.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch products";
      });
  },
});

export const { setPage } = productListingSlice.actions;
export default productListingSlice.reducer;
