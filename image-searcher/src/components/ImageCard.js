import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/ImageCard.css";

const ImageCard = ({ title, authorName, avatarUrl, authorProfile, imageUrl, dimensions }) => {
  const download = () => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.jpg");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };
  
  return (
    <div className="card">
      <div className="image-container">
        <img src={imageUrl} alt={title} />
        <button className="downloadButton" onClick={download}>
          <FontAwesomeIcon icon={ faDownload } />
        </button>
      </div>
      <div className="card-details">
        <h3>{title}</h3>
        <div className="d-flex justify-content-between">
          <div className="d-flex author">
            <a class="authorLink" rel="noreferrer" target="_blank" href={authorProfile}>
              <img src={avatarUrl} alt={authorName} />
              <span>{authorName}</span>
            </a>
          </div>
          <div className="dimensions">
            <span>{dimensions}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
