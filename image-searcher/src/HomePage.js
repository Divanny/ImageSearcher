import React from "react";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <div>
      <div className="glass-container">
        <div className="glass-card">
          <h1 className="title">Image Searcher</h1>
          <h2 className="subtitle">Find the perfect <span className="transparent">image</span> for your project</h2>
          <div className="search-container">
            <input className="input" type="search" placeholder="Search..."/>
            <button class="button">
                <Link to="/search">
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </Link>
            </button>
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
        </div >
      </div>
    </div>
  );
}
