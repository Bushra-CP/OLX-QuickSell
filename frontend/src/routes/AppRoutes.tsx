import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Sell from "@/pages/Sell";
import ProductListing from "@/pages/ProductListing";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import ProductDetails from "@/pages/ProductDetails";
import Signup from "@/pages/Signup";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route
            path="/sell"
            element={
              <ProtectedRoute>
                <Sell />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
