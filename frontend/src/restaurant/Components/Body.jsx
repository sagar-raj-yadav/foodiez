import RestaurantCard from "./RestaurantCard";
import { useState } from "react"; /* This is named export */
import Shimmer from "./Shimmer"; /* This is default export */
import { swiggy_api_URL } from "../constants";
import { Link } from "react-router-dom";
import { filterData } from "../Utils/Helper"; // For reusability or readability filterData function is added in Helper.js file of Utils folder
import useResData from "../Hooks/useResData"; // imported custom hook useResData which gives All Restaurant and  Filtered Restaurant data from swigy api
import NavBar from '../../components/Navbar';
import Footer from '../../components/Footer';

const styles = {
  container: {
    margin: "0 auto",
    padding: "10px",
    width: "1200px",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  searchInput: {
    padding: "12px",
    fontSize: "18px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    width: "60%",
    marginRight: "10px",
  },
  searchBtn: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    background: "#28a745",
    color: "white",
    cursor: "pointer",
  },
  errorContainer: {
    color: "red",
    textAlign: "center",
    marginBottom: "20px",
  },
  restaurantList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
};

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [allRestaurants, FilterRes] = useResData(swiggy_api_URL);
  const [filteredRestaurants, setFilteredRestaurants] = useState(null);

  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const filteredData = filterData(searchText, restaurants);
      setFilteredRestaurants(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage(
          `Sorry, we couldn't find any results for "${searchText}"`
        );
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };

  if (!allRestaurants) return null;

  return (
    <>
    <NavBar/>
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          style={styles.searchInput}
          placeholder="Search a restaurant you want..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            searchData(e.target.value, allRestaurants);
          }}
        />
        <button
          style={styles.searchBtn}
          onClick={() => searchData(searchText, allRestaurants)}
        >
          Search
        </button>
      </div>
      {errorMessage && <div style={styles.errorContainer}>{errorMessage}</div>}
      {allRestaurants?.length === 0 && FilterRes?.length === 0 ? (
        <Shimmer />
      ) : (
        <div style={styles.restaurantList}>
          {(filteredRestaurants === null ? FilterRes : filteredRestaurants).map(
            (restaurant) => (
              <Link
                to={"/restaurant/" + restaurant?.info?.id}
                key={restaurant?.info?.id}
              >
                <RestaurantCard {...restaurant?.info} />
              </Link>
            )
          )}
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Body;
