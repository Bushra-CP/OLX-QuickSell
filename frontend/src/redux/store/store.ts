import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../feactures/productsSlice";
import productListingReducer from "../feactures/productListingSlice";
import addProductReducer from "../feactures/addProductSlice";
import authReducer from "../feactures/authSlice";

export const store = configureStore({
  reducer: {
    addProduct: addProductReducer,
    products: productsReducer,
    productsListing: productListingReducer,
    auth: authReducer,
  },
});

// TS helper types for Redux:
// RootState = type of store state
// AppDispatch = type of dispatch
// Used for type safety (not needed in JS)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
