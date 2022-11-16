import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, useLocation } from "react-router-dom";
type Props = {
  children: React.ReactNode;
};

const AuthRoute = ({ children }: Props) => {
  const [cookies] = useCookies(["user"]);
  const location = useLocation();
  if (!cookies?.user?.token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
};

export default AuthRoute;
