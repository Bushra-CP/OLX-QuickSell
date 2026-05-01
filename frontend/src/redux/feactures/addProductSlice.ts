import api from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ProductType {
  success: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductType = {
  success: null,
  loading: false,
  error: null,
};

export const addProduct = createAsyncThunk(
  "products/addProductSlice",
  async (formData: FormData) => {
    const res = await api.post(
      "http://localhost:3000/quickSell/addProduct",
      formData,
      {
        withCredentials: true,
      },
    );
    return res.data;
  },
);

const addProductSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = "Product uploaded successfully!";
      })
      .addCase(addProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to upload product";
      });
  },
});

export default addProductSlice.reducer;
