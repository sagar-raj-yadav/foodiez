// Card.js
import React from "react";
import "./card.css"; // Import the CSS file

const Card = ({ image, title, placesCount }) => {

    
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-places-count">{placesCount} Places</p>
      </div>
    </div>
  );
};

export default Card;
