import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/ImageCard.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ImageCard = ({ title, authorName, avatarUrl, authorProfile, imageUrl, dimensions, description, imageUrlDownload }) => {
  const download = () => {
    const toastId = toast.loading("Cargando...", { autoClose: false, hideProgressBar: true });
    fetch(imageUrlDownload)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${description}.jpeg`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        toast.update(toastId, { type: toast.TYPE.SUCCESS, render: "Guardado", isLoading: false, hideProgressBar: false, autoClose: 2000 });
    })
    .catch((error) => {
      toast.update(toastId, { type: toast.TYPE.ERROR, render: error.message, isLoading: false, hideProgressBar: false, autoClose: 2000 });
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
            <a className="authorLink" rel="noreferrer" target="_blank" href={authorProfile}>
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
