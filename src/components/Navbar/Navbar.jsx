import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../components/Navbar/Navbar.css";

export default function Navbar() {
	const [searchNames, setSearchNames] = useState('')

	const handleSearch =async(e) => {
		e.preventDefault();

		const baseUrl = import.meta.env.Vite_Movie_API;
		const apiKey = import.meta.env.Vite_API_KEY;

		try{
			const response = await fetch(`${baseUrl}?apikey=${apiKe}&s=${seaarchNames}`);
			const data = await response.json();

			if (data.Response === "True") {
				console.log("Search results:", data.Search);
				
					// TODO: Route to Details page
		
			} else {
				console.warn("No results found:", data .Error);
			}
		} catch (error) {
			console.error("Error fetching movies:", error);
		}
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-between align-item-center w-100">

				<form onSubmit={handleSearch} className="d-flex">
					<input
						type="text"
						className="form-control me-2"
						placeholder="Search movies..."
						value={searchNames}
						onChange={(e) => setSearchNames(e.target.value)}
					/>
					<button type="submit" className="btn btn-outline-success">
						Search
					</button>
				</form>
				<div class="btn-group">
  					<button type="button" class="btn btn-primary">Action</button>
  					<button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    					<span class="sr-only">Toggle Dropdown</span>
  					</button>
  					<div class="dropdown-menu">
    					<a class="dropdown-item" href="#">Sign Up</a>
    					<a class="dropdown-item" href="#">Sign In</a>
 						<div class="dropdown-divider"></div>
    						<a class="dropdown-item" href="#">Separated link</a>
 					</div>
				</div>	
			</div>
		</nav>
	);
};