import type { RootState } from "@/redux/store/store";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }: { children: ReactNode }) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PublicRoute;
