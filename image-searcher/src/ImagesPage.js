import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./assets/styles/ImagesPage.css";
import CardGrid from "./components/MasonryLayout";
import ImageCard from "./components/ImageCard";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ImagesPage() {
  const { searchTerm: initialSearchTerm } = useParams();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');
  const [searchInput, setSearchInput] = useState(searchTerm);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [actualPage, setActualPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [numImages, setNumImages] = useState(30);
  const [orientation, setOrientation] = useState(null);
  const [isPressed, setIsPressed] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const buttonRef = useRef(null);

  function truncateString(str, num) {
    if (str != null){
      if (str.length <= num) {
        return str;
      } else {
        return str.slice(0, num) + "...";
      }
    }
  }

  const handlePage = (page) => {
    setActualPage(page);
    fetchImages(searchTerm, numImages, page)
  }

  async function fetchImages(searchTerm, numImages, actualPage, orientation, color) {
    setSearchTerm(searchTerm);
    setIsLoading(true);
    try {
      let request = `https://api.unsplash.com/search/photos?query=${searchTerm}&page=${actualPage}&per_page=${numImages}`;
      if (orientation) {
        request += `&orientation=${orientation}`;
      }
      if (color) {
        request += `&color=${color}`;
      }
      request += `&client_id=${process.env.REACT_APP_ACCESS_KEY}`;
      const response = await axios.get(request);      
      console.log(response.data.results[0]);
      setImages(response.data.results);
      setTotalPages(response.data.total_pages);
      setTotalImages(response.data.total);
    } catch (error) {
      if (error.response.status === 403){
        toast.warn(`Free request limit reached. Please try again in 1 hour. Visit "Divanny" on GitHub to support this project and get more requests. Thank you!`);
      }
      else {
        toast.error(error.message);
      }
    }
    setIsLoading(false);
  }
  

  useEffect(() => {
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
    }
    fetchImages(searchTerm, numImages, actualPage, orientation, selectedColor);
  }, [ initialSearchTerm, searchTerm, actualPage, numImages, orientation, selectedColor ]);
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setIsPressed(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setIsPressed(false);
        buttonRef.current.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

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
            <button className={`button ${isPressed ? "pressed" : ""}`} ref={buttonRef} onClick={() => {
              setActualPage(1);
              fetchImages(searchInput);
            }}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
      </header>
      <main className="mainContent">
        <div className="contentDescrition d-flex justify-content-between mb-4 flex-wrap">
          <div className="f">
            <p className="resultsFor">Showing {totalImages} results for...</p>
            <h3 className="searchTitle">{truncateString(searchTerm, 30)}</h3>
          </div>
          <div className="filters d-flex justify-content-end flex-wrap">
          <div className="filterItem mx-4 orientationContainer">
              <label htmlFor="colorSelect" className="resultsFor">Color:</label>
              <select id="colorSelect" className="numImages" value={selectedColor} onChange={(event) => setSelectedColor(event.target.value)}>
                <option value={""}>Any</option>
                <option value={"black_and_white"}>Black & White</option>
                <option value={"black"}>Black</option>
                <option value={"white"}>White</option>
                <option value={"yellow"}>Yellow</option>
                <option value={"orange"}>Orange</option>
                <option value={"red"}>Red</option>
                <option value={"purple"}>Purple</option>
                <option value={"magenta"}>Magenta</option>
                <option value={"green"}>Green</option>
                <option value={"teal"}>Teal</option>
                <option value={"blue"}>Blue</option>
              </select>
            </div>
            <div className="filterItem mx-4 orientationContainer">
              <label htmlFor="orientationSelect" className="resultsFor">Orientation:</label>
              <select id="orientationSelect" className="numImages" value={orientation} onChange={(event) => setOrientation(event.target.value)}>
                <option value={""}>Any</option>
                <option value={"landscape"}>Landscape</option>
                <option value={"portrait"}>Portrait</option>
                <option value={"squarish"}>Squarish</option>
              </select>
            </div>
            <div className="filterItem mx-4">
              <label htmlFor="numImagesSelect" className="resultsFor">Show:</label>
              <select id="numImagesSelect" className="numImages" value={numImages} onChange={(event) => setNumImages(event.target.value)}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <div className="images-container">
          {isLoading && <div>Loading...</div>}
          {!isLoading && <CardGrid>
              {images.map((image) => (
                <ImageCard
                  title={truncateString(image.description, 55)}
                  description={image.alt_description}
                  authorName={truncateString(image.user.username, 13)}
                  avatarUrl={image.user.profile_image.small}
                  authorProfile={image.user.portfolio_url ?? image.user.links.html}
                  imageUrl={image.urls.small}
                  dimensions={image.width + "x" + image.height}
                  imageUrlDownload={image.urls.full}
                />
              ))}
            </CardGrid>}
          </div>
        </div>
        <div className="contentFooter">
          <div className="paginationContainer d-flex justify-content-end">
            <button className="paginationButton mx-2" onClick={() => handlePage(actualPage - 1)} disabled={actualPage === 1}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className="actualPage">{actualPage}</span> 
            <button className="paginationButton mx-2" onClick={() => handlePage(actualPage + 1)} disabled={actualPage === totalPages}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </main>
      <footer></footer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </div>
  );
}
