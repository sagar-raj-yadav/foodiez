import React from 'react';

const Shimmer = () => {
  return (
    <div style={styles.container}>
      <div style={styles.restaurantSummary}>
        <div style={styles.shimmerImage}></div>
        <div style={styles.shimmerDetails}>
          <div style={styles.shimmerTitle}></div>
          <div style={styles.shimmerTags}></div>
          <div style={styles.shimmerDetailsRow}>
            <div style={styles.shimmerRating}></div>
            <div style={styles.shimmerTime}></div>
            <div style={styles.shimmerCost}></div>
          </div>
        </div>
      </div>
      <div style={styles.menuItemsContainer}>
        <div style={styles.shimmerMenuItem}>
          <div style={styles.shimmerItemDetails}>
            <div style={styles.shimmerItemTitle}></div>
            <div style={styles.shimmerItemCost}></div>
            <div style={styles.shimmerItemDesc}></div>
          </div>
          <div style={styles.shimmerItemImgWrapper}></div>
        </div>
        {/* Repeat shimmer item structure as needed */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  restaurantSummary: {
    display: 'flex',
    marginBottom: '20px',
  },
  shimmerImage: {
    width: '200px',
    height: '200px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    animation: 'shimmer 1.5s infinite',
  },
  shimmerDetails: {
    marginLeft: '20px',
    flex: 1,
  },
  shimmerTitle: {
    height: '24px',
    width: '150px',
    backgroundColor: '#f0f0f0',
    marginBottom: '10px',
    animation: 'shimmer 1.5s infinite',
  },
  shimmerTags: {
    height: '16px',
    width: '100px',
    backgroundColor: '#f0f0f0',
    marginBottom: '10px',
    animation: 'shimmer 1.5s infinite',
  },
  shimmerDetailsRow: {
    display: 'flex',
    alignItems: 'center',
  },
  shimmerRating: {
    height: '20px',
    width: '40px',
    backgroundColor: '#f0f0f0',
    marginRight: '10px',
    animation: 'shimmer 1.5s infinite',
  },
  shimmerTime: {
    height: '20px',
    width: '80px',
    backgroundColor: '#f0f0f0',
    marginRight: '10px',
    animation: 'shimmer 1.5s infinite',
  },
  shimmerCost: {
    height: '20px',
    width: '60px',
    backgroundColor: '#f0f0f0',
    animation: 'shimmer 1.5s infinite',
  },
  menuItemsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  shimmerMenuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #e0e0e0',
  },
  shimmerItemDetails: {
    flex: '1',
  },
  shimmerItemTitle: {
    height: '18px',
    width: '150px',
    backgroundColor: '#f0f0f0',
    marginBottom: '5px',
    animation: 'shimmer 1.5s infinite',
  },
  shimmerItemCost: {
    height: '16px',
    width: '80px',
    backgroundColor: '#f0f0f0',
    marginBottom: '5px',
    animation: 'shimmer 1.5s infinite',
  },
  shimmerItemDesc: {
    height: '14px',
    width: '200px',
    backgroundColor: '#f0f0f0',
    animation: 'shimmer 1.5s infinite',
  },
  shimmerItemImgWrapper: {
    width: '80px',
    height: '80px',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    animation: 'shimmer 1.5s infinite',
  },
};

export default Shimmer;
