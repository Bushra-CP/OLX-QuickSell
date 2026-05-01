import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "../feactures/authSlice";
import productsReducer from "../feactures/productsSlice";
import productListingReducer from "../feactures/productListingSlice";
import addProductReducer from "../feactures/addProductSlice";
import cartReducer from "../feactures/cartSlice";

//config to persist user
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};

//config to persist cart
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["cartItems"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  addProduct: addProductReducer,
  products: productsReducer,
  productsListing: productListingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

//export persistor
export const persistor = persistStore(store);

// TS helper types for Redux:
// RootState = type of store state
// AppDispatch = type of dispatch
// Used for type safety (not needed in JS)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
