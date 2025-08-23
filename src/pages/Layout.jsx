import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <Navbar />      {/* Always visible on protected pages */}
      <main>
        <Outlet />    {/* Protected page content */}
      </main>
    </>
  );
}
