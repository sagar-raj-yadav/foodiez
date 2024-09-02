import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import RestroCard from '../components/RestroCard/Home';
import Shimmer from "../simmer/Shimmer";
import foodCategory from './json data/foodCategory.json';
import fooditems from './json data/foodData2.json';
import './Home.css';

const Home = () => {
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Flatten the foodItems structure
    const flattenedItems = Object.keys(fooditems).flatMap(category => 
      fooditems[category].map(item => ({ ...item, CategoryName: category }))
    );
    
    setFoodItems(flattenedItems);
    setFoodCategory(Object.keys(fooditems)); // Now foodCategory is just the keys of fooditems
    setIsLoading(false);
  }, []);

  return (
    <>
      <div style={styles.container}><Navbar /></div>
      
      <div style={styles.downcontainer}><RestroCard /></div>

      {isLoading ? (
        <Shimmer />
      ) : (
        <div style={styles.downcontainer}>
          {foodCategory.map((categoryName) => (
            <div key={categoryName}>
              <div style={styles.categoryTitle}>{categoryName}</div>
              <hr />
              <div className="row">
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
  icon: {
    height: '70px',
    width: 'auto',
    maxWidth: '80%',
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
