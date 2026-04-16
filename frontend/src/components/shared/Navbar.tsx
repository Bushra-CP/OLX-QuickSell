import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { User } from "lucide-react";

function Navbar() {
  return (
    <header className="w-full border-b bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-xl font-bold text-blue-600">QuickSell</h1>
        </Link>

        {/* Search Bar */}
        <div className="flex items-center gap-2 w-1/2">
          <Input placeholder="Search products..." />
          <Button>Search</Button>
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
