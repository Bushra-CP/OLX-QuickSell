import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feactures/authSlice";
import productsReducer from "../feactures/productsSlice";
import productListingReducer from "../feactures/productListingSlice";
import addProductReducer from "../feactures/addProductSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    addProduct: addProductReducer,
    products: productsReducer,
    productsListing: productListingReducer,
  },
});

// TS helper types for Redux:
// RootState = type of store state
// AppDispatch = type of dispatch
// Used for type safety (not needed in JS)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
