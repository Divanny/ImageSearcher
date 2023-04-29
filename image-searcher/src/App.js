import React from 'react';
import './App.css';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";    
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {
  return (
    <div className="glass-container">
      <div className="glass-card">
        <h1 className="title">Image Searcher</h1>
        <h2 className="subtitle">Find the perfect image for your project</h2>
        <div className="search-container">
          <input class="input" type="text" placeholder="Search..."/>
          <Button icon="pi pi-search" rounded outlined aria-label="Search" />
        </div>
      </div>
    </div>
  );
}

export default App;