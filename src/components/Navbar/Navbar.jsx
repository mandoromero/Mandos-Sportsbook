// components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from"../AuthContext";
import { auth } from "../../firebase.js";
import { signOut } from "firebase/auth";
import { useState } from "react";
import "../Navbar/Navbar.css";

export default function Navbar() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to use search!");
      return;
    }
    console.log("Search for:", searchTerm);
    // TODO: Add search logic / navigate to results page
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Mando’s Sportsbook</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {/* Navigation Buttons */}
      <div className="nav-links">
        {!user ? (
          <>
            <button className="signup-link-btn">
              <Link to="/signup" className="nav-btn">Sign Up</Link>
            </button>
            <button className="login-link-btn">
              <Link to="/login" className="nav-btn">Log In</Link>
            </button>
          </>
        ) : (
          <button onClick={handleLogout} className="nav-btn">Logout</button>
        )}
      </div>
    </nav>
  );
}
