import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../Context/AppProvider";

type Props = {
  children: React.ReactNode;
};

const AuthRoute = ({ children }: Props) => {
  const { user } = useAppContext();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
};

export default AuthRoute;
