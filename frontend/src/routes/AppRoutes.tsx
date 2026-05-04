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
import CheckoutLayout from "@/layout/CheckoutLayout";
import Orders from "@/pages/Orders";
import MyProducts from "@/pages/UserProducts";
import EditProduct from "@/pages/EditProduct";
import ErrorBoundary from "@/error/ErrorBoundary";

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
              <ErrorBoundary>
                <ProtectedRoute>
                  <Sell />
                </ProtectedRoute>
              </ErrorBoundary>
            }
          />
          <Route
            path="/cart"
            element={
              <ErrorBoundary>
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              </ErrorBoundary>
            }
          />
          <Route
            path="/orders"
            element={
              <ErrorBoundary>
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              </ErrorBoundary>
            }
          />

          <Route
            path="/myProducts"
            element={
              <ErrorBoundary>
                <ProtectedRoute>
                  <MyProducts />
                </ProtectedRoute>
              </ErrorBoundary>
            }
          />

          <Route
            path="/editProduct/:productId"
            element={
              <ErrorBoundary>
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              </ErrorBoundary>
            }
          />
        </Route>

        <Route element={<CheckoutLayout />}>
          <Route
            path="/checkout"
            element={
              <ErrorBoundary>
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              </ErrorBoundary>
            }
          />
        </Route>

        <Route
          path="/login"
          element={
            <ErrorBoundary>
              <PublicRoute>
                <Login />
              </PublicRoute>
            </ErrorBoundary>
          }
        />
        <Route
          path="/signup"
          element={
            <ErrorBoundary>
              <PublicRoute>
                <Signup />
              </PublicRoute>
            </ErrorBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
