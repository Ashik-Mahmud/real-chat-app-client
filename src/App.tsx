import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthRoute from "./auth/AuthRoute";
import ProtectRoute from "./auth/ProtectRoute";
import ChangePassword from "./pages/Authentication/Login/ChangePassword";
import Login from "./pages/Authentication/Login/Login";
import ResetPassword from "./pages/Authentication/Login/ResetPassword";
import Register from "./pages/Authentication/Register/Register";
import Home from "./pages/Home/Home";
import Messages from "./pages/Messages/Messages";
import Profile from "./pages/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute>
        <Home />
      </ProtectRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <ProtectRoute>
        <Login />
      </ProtectRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectRoute>
        <Register />
      </ProtectRoute>
    ),
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/change-password/:userId",
    element: <ChangePassword />,
  },
  {
    path: "/messages",
    element: (
      <AuthRoute>
        <Messages />
      </AuthRoute>
    ),
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
