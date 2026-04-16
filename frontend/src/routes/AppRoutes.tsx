import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Sell from "@/pages/Sell";
import ProductListing from "@/pages/ProductListing";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
