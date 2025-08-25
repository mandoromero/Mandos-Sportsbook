import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,  // ✅ Navbar + Footer included
    children: [
      { index: true, element: <Home /> },   // ✅ "/" becomes index
      { path: "login", element: <LogIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "forgot-password", element: <ForgotPassword /> },

      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: "single/:theId", element: <Single /> },
          { path: "demo", element: <Demo /> },
        ],
      },
    ],
  },
]);
