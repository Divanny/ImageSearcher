import React, { useState } from "react";
import "./assets/styles/HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState();

  return (
    <div className="homepage">
      <div className="glass-container">
        <div className="glass-card">
          <h1 className="title">Image Searcher</h1>
          <h2 className="subtitle">
            Find the perfect <span className="transparent">image</span> for your
            project
          </h2>
          <div className="search-container">
            <input className="input" value={searchTerm} type="search" placeholder="Search..." onChange={(event) => setSearchTerm(event.target.value)}/>
            <Link to={"/search/" + searchTerm}>
              <button class="button">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </Link>
          </div>
        </div>
        <div className="area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
