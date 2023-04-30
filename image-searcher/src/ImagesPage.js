import React, { useState } from "react";
import "./ImagesPage.css";

export default function ImagesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <header>
        <h1>{searchTerm}</h1>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </header>
      <main>
        
      </main>
    </div>
  );
}
