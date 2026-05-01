import type { RootState } from "@/redux/store/store";
import { useEffect, type ReactNode } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      toast.error("Please login first", { id: '"login-required-toast"' });
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
