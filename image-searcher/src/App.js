import React from 'react';
import HomePage from './HomePage';
import ImagesPage from './ImagesPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="search/:searchTerm" element={<ImagesPage />} />
        <Route path="search" element={<ImagesPage />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;