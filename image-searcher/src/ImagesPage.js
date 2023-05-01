import { React, useState, useEffect } from "react";
import "./assets/styles/ImagesPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CardGrid from "./components/MasonryLayout";
import ImageCard from "./components/ImageCard";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function ImagesPage() {
  const { searchTerm: initialSearchTerm } = useParams();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');
  const [searchInput, setSearchInput] = useState(searchTerm);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [numImages, setNumImages] = useState(30);

  function truncateString(str, num) {
    if (str != null){
      if (str.length <= num) {
        return str;
      } else {
        return str.slice(0, num) + "...";
      }
    }
  }

  async function fetchImages(searchTerm, numImages) {
    setSearchTerm(searchTerm);
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos?query=${searchTerm}&per_page=${numImages}&client_id=${process.env.REACT_APP_ACCESS_KEY}`);
      setImages(response.data.results);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
    }
    fetchImages(searchTerm, numImages);
  }, [initialSearchTerm, searchTerm, numImages]);
  
  return (
    <div className="content imagesPage">
      <header className="headerContent">
        <div className="d-flex justify-content-between flex-wrap">
          <div className="title-container">
            <h1 className="title">Image Searcher</h1>
          </div>
          <div className="searchbox-container d-flex">
          <input
              className="input"
              value={searchInput}
              type="search"
              placeholder="Search..."
              onChange={(event) => setSearchInput(event.target.value)}
            />            
            <button className="button" onClick={() => fetchImages(searchInput)}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
      </header>
      <main className="mainContent">
        <div className="contentDescrition d-flex justify-content-between mb-4">
          <div className="f">
            <p className="resultsFor">Showing {images.length} results for...</p>
            <h3 className="searchTitle">{truncateString(searchTerm, 30)}</h3>
          </div>
          <div className="filters">
            <label htmlFor="numImagesSelect" className="resultsFor">Show:</label>
            <select id="numImagesSelect" className="numImages" value={numImages} onChange={(event) => setNumImages(event.target.value)}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
        </div>
        <div>
          <div className="images-container">
          {isLoading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {!isLoading && <CardGrid>
              {images.map((image) => (
                <ImageCard
                  title={image.description}
                  authorName={image.user.username}
                  avatarUrl={image.user.profile_image.large}
                  imageUrl={image.urls.small}
                  dimensions={image.width + "x" + image.height}
                />
              ))}
            </CardGrid>}
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
