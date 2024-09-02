import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import { Link } from 'react-router-dom';
import './Body.css'; // Assuming you're using an external CSS file
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import restaurantData from './RestaurantData/RestaurantName.json'; // Importing the local JSON file

const location = [
  'Old City', 'New Market', 'Shivaji Nagar', 'Bharat Bhavan', 'Upper Lake (Bada Talab)',
  'Lower Lake (Chhota Talab)', 'Lal Parade Ground', 'Van Vihar National Park', 'MP Nagar',
  'Bairagarh', 'Hoshangabad Road', 'Arera Colony', 'Jawahar Chowk', 'Habibganj', 'Saket Nagar',
  'Chhola Road', 'Bag Sewania', 'Malviya Nagar', 'Govindpura', 'Bairagarh Kalan', 'Bairagarh Chichli'
];
const getRandomCost = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min; // Fixed to include max value
};


const Body = () => {
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    const updatedRestaurants = restaurantData.map(restaurant => ({
      ...restaurant,
      costForTwo: `₹${getRandomCost(200, 1000)} for two`
    }));
    setFilteredRestaurants(updatedRestaurants);
  }, []);

  const searchData = (searchText) => {
    if (searchText.trim() !== '') {
      const filteredData = restaurantData.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchText.toLowerCase())
      ).map(restaurant => ({
        ...restaurant,
        costForTwo: `₹${getRandomCost(200, 1000)} for two`
      }));
      setFilteredRestaurants(filteredData);
      if (filteredData.length === 0) {
        setErrorMessage(`Sorry, we couldn't find any results for "${searchText}"`);
      } else {
        setErrorMessage('');
      }
    } else {
      setErrorMessage('');
      const updatedRestaurants = restaurantData.map(restaurant => ({
        ...restaurant,
        costForTwo: `₹${getRandomCost(200, 1000)} for two`
      }));
      setFilteredRestaurants(updatedRestaurants);
    }
  };

  const avgRatingString = Math.floor(Math.random() * 4 + 1);
  
  return (
    <>
    <div className="container">
      <Navbar />
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search a restaurant you want..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            searchData(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => searchData(searchText)}
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="error-container">{errorMessage}</div>}
      {filteredRestaurants.length === 0 ? (
        <div>No restaurants found.</div>
      ) : (
        <div className="restaurant-list">
          {filteredRestaurants.map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant.id}`}
              key={restaurant.id}
            >
              <RestaurantCard
                name={restaurant.name}
                cuisine={restaurant.cuisine}
                location={restaurant.location} // Fixed location prop
                distance={restaurant.distance}
                time={restaurant.time}
                costForTwo={restaurant.costForTwo}
                avgRatingString={avgRatingString}
                image={restaurant.image}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Body;
