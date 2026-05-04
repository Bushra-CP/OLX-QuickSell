import CheckoutNavbar from "@/components/shared/CheckoutNavbar";
import { Outlet } from "react-router-dom";

function CheckoutLayout() {
  return (
    <>
      <CheckoutNavbar />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default CheckoutLayout;
