import React from "react";

const Card = ({ image, title, placesCount, className }) => {
  const cardStyle = {
    position: 'relative',
    maxWidth: '200px',
    height: '200px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const cardHoverStyle = {
    cursor: 'pointer',
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.3)',
  };

  const cardImageStyle = {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
  };

  const cardContentStyle = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    padding: '20px',
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
    color: '#fff',
  };

  const cardTitleStyle = {
    fontSize: '1em',
    fontWeight: 'bold',
    margin: '0',
  };

  const cardPlacesCountStyle = {
    fontSize: '1em',
    marginTop: '5px',
  };

  return (
    <div
      className={className}
      style={cardStyle}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
      onMouseLeave={(e) =>
        Object.assign(e.currentTarget.style, cardStyle, {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(0)',
        })
      }
    >
      <img src={image} alt={title} style={cardImageStyle} />
      <div style={cardContentStyle}>
        <h2 style={cardTitleStyle}>{title}</h2>
        <p style={cardPlacesCountStyle}>{placesCount} Places</p>
      </div>
    </div>
  );
};

export default Card;
