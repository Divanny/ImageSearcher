import React from "react";
import "../assets/styles/ImageCard.css";

const ImageCard = ({ title, authorName, avatarUrl, imageUrl, dimensions }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} />
      <div className="card-details">
        <h3>{title}</h3>
        <div className="d-flex justify-content-between">
          <div className="d-flex author">
            <img src={avatarUrl} alt={authorName} />
            <span>{authorName}</span>
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
