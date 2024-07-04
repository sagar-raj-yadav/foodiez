import { useState } from 'react';



const RestaurantCard = ({
  name,
  cuisines,
  areaName,
  sla,
  costForTwo,
  avgRatingString,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
  
    <div
      style={{ ...styles.card, ...(isHovered ? styles.cardHover : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        style={{ ...styles.img, ...(isHovered ? styles.imgHover : {}) }}
        src="logo.png"
        alt={name}
      />
      <div
        style={{ ...styles.textOverlay, ...(isHovered ? styles.textOverlayHover : {}) }}
      >
        <h3 style={styles.h3}>{name}</h3>
        <h5 style={styles.h5}>{cuisines.join(', ')}</h5>
        <h5 style={styles.h5}>{areaName}</h5>
        <span style={styles.span}>
          <h4
            style={
              avgRatingString < 4
                ? { ...styles.h4, backgroundColor: 'var(--light-red)' }
                : avgRatingString === '--'
                ? { ...styles.h4, backgroundColor: 'white', color: 'black' }
                : { ...styles.h4, color: 'white' }
            }
          >
           
          </h4>
          <h4 style={styles.h4}>•</h4>
          <h4 style={styles.h4}>{sla?.lastMileTravelString ?? '2.0 km'}</h4>
          <h4 style={styles.h4}>•</h4>
          <h4 style={styles.h4}>{costForTwo ?? '₹200 for two'}</h4>
        </span>
      </div>
    </div>

  );
};

const styles = {
  card: {
    position: 'relative',
    width: '300px',
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
  },
  textOverlayHover: {
    background: 'rgba(0, 0, 0, 0.7)',
  },
  h3: {
    margin: '0 0 8px 0',
    fontSize: '20px',
  },
  h5: {
    margin: '0',
    fontSize: '16px',
    color: '#ccc',
  },
  span: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '8px',
  },
  h4: {
    margin: '0 8px',
    fontSize: '16px',
  },
  starIcon: {
    marginRight: '4px',
  },
};

export default RestaurantCard;
