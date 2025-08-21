import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../components/Navbar/Navbar.css";

export default function Navbar() {
  const [searchNames, setSearchNames] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // for now, just log search
    console.log("Searching for:", searchNames);
  };

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <div className="container d-flex justify-content-between align-items-center w-100">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search..."
            value={searchNames}
            onChange={(e) => setSearchNames(e.target.value)}
          />
          <button type="submit" className="btn btn-outline-success">
            Search
          </button>
        </form>

        {/* Auth Buttons */}
        <div>
          <Link to="/signup" className="btn btn-primary me-2">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-outline-primary">
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
}
