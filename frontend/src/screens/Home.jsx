

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from '../components/Carousel';
import Shimmer from "../restaurant/Components/Shimmer"; // Assuming Shimmer component is in the same folder

// import Items from '../components/Items';

const apiUrl = import.meta.env.VITE_API_URL;

const Home = () => {
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/data`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data[0], data[1]);
      setFoodItems(data[0]);
      setFoodCategory(data[1]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div style={styles.container}><Navbar /></div>
      <div style={styles.container}><Carousel searchQuery={searchQuery} setSearchQuery={setSearchQuery} /></div>
    {/* <div style={styles.container}><Items /></div> */}

    {isLoading ? (
        <Shimmer />
      ) : (
      <div style={styles.container}>
        {foodCategory.map((category) => (
          <div key={category.id}>
            <div style={styles.categoryTitle}>{category.CategoryName}</div>
            <hr />
            <div style={styles.row}>
              {foodItems
                .filter(item => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((filteredItem) => (
                  <div key={filteredItem.id} style={{ flex: "0 0 calc(25% - 20px)" }}>
                    <Card
                      id={filteredItem.id}
                      name={filteredItem.name}
                      options={filteredItem.options[0]}
                      description={filteredItem.description}
                      imgsrc={filteredItem.img}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    )}
      <div style={styles.container}><Footer /></div>
    </>
  );
};

const styles = {
  container: {
  margin: "0 auto",
  padding: "10px",
  maxWidth: "100%",
},
  categoryTitle: {
  fontSize: "35px",
  fontWeight: "bold",
  margin: "20px 0",
  '@media (max-width: 768px)': {
    fontSize: "28px",
  },
},

  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
};

export default Home;
