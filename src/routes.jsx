import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,   // Navbar + Footer included
    children: [
      { path: "/", element: <Home /> },           // Public
      { path: "/login", element: <LogIn /> },     // Public
      { path: "/signup", element: <SignUp /> },   // Public

      // Protected routes
      {
        element: <ProtectedRoute />,             // Wrap only protected pages
        children: [
          { path: "/single/:theId", element: <Single /> },
          { path: "/demo", element: <Demo /> },
        ],
      },
    ],
  },
]);
