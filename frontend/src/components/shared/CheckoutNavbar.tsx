import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { User } from "lucide-react";

import { Button } from "@/components/ui/button";

import { type RootState } from "@/redux/store/store";

function CheckoutNavbar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const email = user?.email;
  //   const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* --- LEFT SIDE: MOBILE MENU & LOGO --- */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-xl font-bold text-blue-600 tracking-tight">
              QuickSell
            </h1>
          </Link>
        </div>

        {/* --- RIGHT SIDE: ACTIONS --- */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop Profile Dropdown */}
          <div className="hidden md:block">
            <Button variant="outline" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">
                {user ? email : "Profile"}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default CheckoutNavbar;
