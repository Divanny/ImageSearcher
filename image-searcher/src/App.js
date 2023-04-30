import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';

function App() {
  return (
    <div>
      <div className="glass-container">
        <div className="glass-card">
          <h1 className="title">Image Searcher</h1>
          <h2 className="subtitle">Find the perfect <span className="transparent">image</span> for your project</h2>
          <div className="search-container">
            <input className="input" type="search" placeholder="Search..."/>
            <button class="button">
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" class="icon"/>
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

export default App;