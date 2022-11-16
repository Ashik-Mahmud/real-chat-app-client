import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../Context/AppProvider";

type Props = {
  children: React.ReactNode;
};

const ProtectRoute = ({ children }: Props) => {
  const { user } = useAppContext();
  const location = useLocation();

  if (user?.token) {
    return <Navigate to="/messages" replace state={{ from: location }} />;
  }
  return <>{children}</>;
};

export default ProtectRoute;
