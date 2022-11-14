import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Authentication/Login/Login";
import ResetPassword from "./pages/Authentication/Login/ResetPassword";
import Register from "./pages/Authentication/Register/Register";
import Home from "./pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
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
