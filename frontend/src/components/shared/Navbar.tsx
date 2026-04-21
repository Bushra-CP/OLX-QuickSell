import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;

    navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <header className="w-full border-b bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-xl font-bold text-blue-600">QuickSell</h1>
        </Link>

        {/* Search Bar */}
<div className="flex items-center gap-2 w-1/2">

  <div className="relative w-full">
    <Input
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      className="pr-10" // space for X
    />

    {search.length > 0 && (
      <button
        type="button"
        onClick={clearSearch}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>

  <Button onClick={handleSearch}>Search</Button>
</div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/cart">
            <div className="flex items-center gap-2 border px-3 py-1 rounded-md hover:bg-gray-100 cursor-pointer">
              <ShoppingCart className="w-5 h-5" />
              Cart
            </div>
          </Link>
          <Link to="/login">
            <div className="flex items-center gap-2 border px-3 py-1 rounded-md hover:bg-gray-100 cursor-pointer">
              <User className="w-4 h-4" />
              Login
            </div>
          </Link>
          <Link to="/sell">
            <Button className="bg-green-500 hover:bg-green-600">+ Sell</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
