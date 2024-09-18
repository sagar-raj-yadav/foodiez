import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import RestroCard from '../components/RestroCard/Home';
import Shimmer from "../simmer/Shimmer";
import './Home.css';

const Home = () => {
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {                                                  
        // Fetch food categories and items using axios
        const categoryResponse = await axios.get('https://food-api-git4.onrender.com/api/category');
        const foodDataResponse = await axios.get('https://food-api-git4.onrender.com/api/foodData');

        const categoryData = categoryResponse.data;
        const foodData = foodDataResponse.data;

        // Flatten the foodItems structure
        const flattenedItems = Object.keys(foodData).flatMap(category =>
          foodData[category].map(item => ({ ...item, CategoryName: category }))
        );

        setFoodItems(flattenedItems);
        setFoodCategory(Object.keys(foodData));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={styles.container}><Navbar /></div>
      
      <div style={styles.downcontainer}><RestroCard /></div>

      {isLoading ? (
        <Shimmer />
      ) : (
        <div style={styles.downcontainer}>
          {foodCategory.map((categoryName,index) => (
            <div key={index}>
              <div style={styles.categoryTitle}>{categoryName}</div>
              <hr />
              <div className="row" key={index} >
                {foodItems
                  .filter(item => item.CategoryName === categoryName && item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((filteredItem) => (
                    <div key={filteredItem.id}>
                      <Card
                        id={filteredItem.id}
                        name={filteredItem.name}
                        options={filteredItem.options}
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
      
      <div style={styles.fixedImageContainer}>
        <img src="technical-support.png" alt="technical-support" title="customer support" style={styles.fixedImage} />
      </div>

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
  downcontainer: {
    margin: "0 auto",
    padding: "10px",
    maxWidth: "100%",
    backgroundColor:"#fefefa",
  },
  categoryTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "15px 0",
  },
  fixedImageContainer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    overflow: 'hidden',
    zIndex: 1000,
  },
  fixedImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    cursor: "pointer",
  },
};

export default Home;
