import React from 'react';
import './shimmer.css';

const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {/* Create shimmer placeholders for categories */}
      <div className="shimmer-category"></div>
      <hr />
      
      <div className="shimmer-row">
        {/* Create multiple shimmer cards */}
        {Array(4).fill(0).map((_, index) => (
          <div key={index} className="shimmer-card">
            <div className="shimmer-img"></div>
            <div className="shimmer-text"></div>
            <div className="shimmer-text short"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shimmer;
