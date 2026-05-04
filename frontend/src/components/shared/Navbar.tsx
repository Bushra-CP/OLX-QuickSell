import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingCart,
  User,
  X,
  Menu,
  Search,
  LogOutIcon,
  PlusCircle,
  Home,
  Package,
  ClipboardList,
  LogIn,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  persistor,
  type AppDispatch,
  type RootState,
} from "@/redux/store/store";
import { logout } from "@/redux/feactures/authSlice";
import { clearCart } from "@/redux/feactures/cartSlice";

function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const email = user?.email;
  const [search, setSearch] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  //Sync search input with URL
  useEffect(() => {
    function getSerchURLs() {
      const searchFromURL = searchParams.get("search") || "";
      setSearch(searchFromURL);
    }

    getSerchURLs();
  }, [searchParams]);

  const handleSearch = () => {
    if (!search.trim()) return;

    const params = Object.fromEntries(searchParams.entries());
    params.search = search;

    setSearchParams(params);
    navigate(`/products?${new URLSearchParams(params)}`);

    setIsMobileSearchOpen(false);
  };

  const clearSearch = () =>  {
    setSearch("");

    const params = Object.fromEntries(searchParams.entries());
    delete params.search;

    setSearchParams(params);
  };

  const handleLogout = async () => {
    await dispatch(logout());

    dispatch(clearCart());

    await persistor.purge();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* --- LEFT SIDE: MOBILE MENU & LOGO --- */}
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-1">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              {/* Increased width and added padding to prevent text cutoff */}
              <SheetContent side="left" className="w-[280px] sm:w-[350px] px-6">
                <SheetHeader className="text-left border-b pb-4">
                  <SheetTitle className="text-blue-600 text-2xl font-bold">
                    QuickSell
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-5 mt-6">
                  <Link
                    to="/"
                    className="flex items-center gap-3 text-lg font-medium hover:text-blue-600"
                  >
                    <Home className="w-5 h-5" /> Home
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center gap-3 text-lg font-medium hover:text-blue-600"
                  >
                    <ShoppingCart className="w-5 h-5" /> Cart
                  </Link>
                  <Link
                    to="/sell"
                    className="flex items-center gap-3 text-lg font-medium hover:text-blue-600"
                  >
                    <PlusCircle className="w-5 h-5 text-green-600" /> Sell Item
                  </Link>

                  <div className="mt-4 pt-6 border-t">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                      {user ? "Account Settings" : ""}
                    </p>
                    {user ? (
                      <div className="flex flex-col gap-4">
                        <Link
                          to="/myProducts"
                          className="flex items-center gap-3 text-lg font-medium"
                        >
                          <Package className="mr-2 h-4 w-4" /> My Listings
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center gap-3 text-lg font-medium"
                        >
                          <ClipboardList className="mr-2 h-4 w-4" /> My Orders
                        </Link>
                        <Button
                          variant="destructive"
                          className="mt-4 w-full justify-start gap-3"
                          onClick={handleLogout}
                        >
                          <LogOutIcon className="mr-2 h-4 w-4" /> Log out
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <Link to="/login">
                          <Button variant="outline" className="w-full">
                            Login
                          </Button>
                        </Link>
                        <Link to="/signup">
                          <Button className="w-full bg-blue-600">
                            Sign Up
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <Link to="/" className="flex-shrink-0">
            <h1 className="text-xl font-bold text-blue-600 tracking-tight">
              QuickSell
            </h1>
          </Link>
        </div>

        {/* --- CENTER: DESKTOP SEARCH --- */}
        <div className="hidden md:flex items-center gap-2 w-full max-w-md lg:max-w-xl px-4">
          <div className="relative w-full">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pr-10"
            />
            {search.length > 0 && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>

        {/* --- RIGHT SIDE: ACTIONS --- */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            {isMobileSearchOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>

          {/* Desktop Cart */}
          <Link to="/cart" className="hidden md:flex">
            <div className="flex items-center gap-2 border px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden lg:inline text-sm font-medium">Cart</span>
            </div>
          </Link>

          {/* Desktop Profile Dropdown */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {user ? email : "Profile"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user ? (
                  <>
                    <Link to="/myProducts">
                      <DropdownMenuItem className="cursor-pointer">
                        <Package className="mr-2 h-4 w-4" /> My Listings
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/orders">
                      <DropdownMenuItem className="cursor-pointer">
                        <ClipboardList className="mr-2 h-4 w-4" /> My Orders
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOutIcon className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <DropdownMenuItem className="cursor-pointer">
                        <LogIn className="mr-2 h-4 w-4" />
                        Login
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/signup">
                      <DropdownMenuItem className="cursor-pointer">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Signup
                      </DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Sell Button - Visible on all screens */}
          <Link to="/sell">
            <Button className="bg-green-600 hover:bg-green-700 text-white shadow-sm">
              <PlusCircle className="w-4 h-4 md:mr-2" />
              <span className=" xs:inline text-white">Sell</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* --- MOBILE SEARCH BAR (Expandable) --- */}
      {isMobileSearchOpen && (
        <div className="p-3 border-t md:hidden flex gap-2 bg-gray-50 animate-in slide-in-from-top duration-200">
          <Input
            autoFocus
            placeholder="Search for items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="bg-white"
          />
          <Button onClick={handleSearch} className="bg-blue-600">
            Go
          </Button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
