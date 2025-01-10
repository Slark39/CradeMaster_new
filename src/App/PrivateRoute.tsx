// PrivateRoute.tsx
import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("isAuthenticated", isAuthenticated);
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log("isAuthenticated===>", isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated == "true" ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;
