import { useState } from 'react';

const RestaurantCard = ({
  name,
  cuisine,
  location,
  distance = '2.0 km',
  time ,
  costForTwo = '₹200 for two',
  avgRatingString,
  image = 'logo.png', // Default image
}) => {

  return (
    <div
      style={{ ...styles.card, ...(isHovered ? styles.cardHover : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        style={{ ...styles.img, ...(isHovered ? styles.imgHover : {}) }}
        src={image}
        alt={name}
      />
      <div
        style={{ ...styles.textOverlay, ...(isHovered ? styles.textOverlayHover : {}) }}
      >
        <h3 style={styles.h3}>{name}</h3>
        <h5 style={styles.cuisine}>{cuisine}</h5>
        <h5 style={styles.h5}>{location}</h5>
        <h5 style={styles.h5}>{time}</h5>
        <div style={styles.infoContainer}>
          <h4
            style={
              avgRatingString < 4
                ? { ...styles.h4, backgroundColor: 'var(--light-red)' }
                : avgRatingString === '--'
                ? { ...styles.h4, backgroundColor: 'white', color: 'black' }
                : { ...styles.h4, color: 'white' }
            }
          >
            {avgRatingString} ⭐
          </h4>
          <h4 style={styles.h4}>•</h4>
          <h4 style={styles.h4}>{distance}</h4>
          <h4 style={styles.h4}>•</h4>
          <h4 style={styles.h4}>{costForTwo}</h4>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    position: 'relative',
    width: '250px',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    margin: '16px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  },
  img: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease',
  },
  imgHover: {
    opacity: '0.8',
  },
  textOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '16px',
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    transition: 'background 0.3s ease',
    boxSizing: 'border-box', // Ensure padding does not cause overflow
  },
  textOverlayHover: {
    background: 'rgba(0, 0, 0, 0.7)',
  },
  h3: {
    margin: '0 0 8px 0',
    fontSize: '18px', // Adjusted for better fit
    fontWeight: 'bold',
  },
  cuisine: {
    margin: '0 0 4px 0',
    fontSize: '14px', // Adjusted font size
    color: '#ccc',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: '3', // Show only 3 lines
  },
  h5: {
    margin: '0 0 4px 0',
    fontSize: '14px', // Adjusted font size
    color: '#ccc',
  },
  infoContainer: {
    display: 'flex',
    flexWrap: 'wrap', // Allow items to wrap
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '8px',
    fontSize: '14px', // Adjust font size for better fit
  },
  h4: {
    margin: '0 4px', // Reduced margin for better spacing
    fontSize: '14px', // Adjusted for better fit
  },
};

export default RestaurantCard;
