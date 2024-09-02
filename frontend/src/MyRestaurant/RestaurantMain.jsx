import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import restaurantItemsData from './RestaurantData/RestaurantItems.json'; // Adjust path as needed
import { addToCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice'; // Adjust path as needed
import NavBar from '../components/Navbar'

const RestaurantMenu = () => {
  const { resId } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items); // Get cart items from Redux state
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [hoveredItemId, setHoveredItemId] = useState(null);


  useEffect(() => {
    const fetchData = () => {
      const resIdNumber =  parseInt(resId);
      if (!resIdNumber) {
        console.error("Invalid restaurant ID");
        return;
      }
      const resData = restaurantItemsData.find(res => res.id === resIdNumber);
      if (resData) {
        setRestaurant(resData);
        setMenuItems(resData.items || []); // Default to empty array if items is undefined
      } else {
        console.error("Restaurant not found");
      }
    };
    fetchData();
  }, [resId]);
  const handleAddToCart = (item) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      imgsrc: '', // Add image URL if available
      quantity: Number(quantity),
      size,
      price: parseFloat(item.price.replace('₹', '').replace(',', '')), // Convert price to number
    };

    dispatch(addToCart(cartItem));
    setQuantity(1);
    setSize("");
  };

  const handleIncrement = (item) => {
    dispatch(incrementQuantity({ id: item.id, size }));
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity({ id: item.id, size }));
  };

  const isAddedToCart = (item) => {
    return cartItems.some(cartItem => cartItem.id === item.id && cartItem.size === size);
  };

  return (
    <>
      <NavBar />
      <div style={styles.restaurantMenu}>
        <div style={styles.restaurantSummary}>
          <div style={styles.restaurantSummaryDetails}>
            <h2 style={styles.restaurantTitle}>{restaurant?.name}</h2>
            <p style={styles.restaurantTags}>{restaurant?.cuisine}</p>
            <div style={styles.restaurantDetails}>
              <div
                style={{
                  ...styles.restaurantRating,
                  ...(restaurant?.avgRating < 4
                    ? { backgroundColor: "var(--light-red)" }
                    : restaurant?.avgRating === "--"
                    ? { backgroundColor: "white", color: "black" }
                    : { color: "white" }),
                }}
              >
                {restaurant?.avgRating}
              </div>
              <div>{restaurant?.time}</div>
              <div style={styles.restaurantRatingSlash}>|</div>
              <div>{restaurant?.costForTwo}</div>
            </div>
          </div>
        </div>

        <div style={styles.restaurantMenuContent}>
          <div style={styles.menuItemsContainer}>
            <div style={styles.menuTitleWrap}>
              <h3 style={styles.menuTitle}>Recommended</h3>
              <p style={styles.menuCount}>{menuItems.length} ITEMS</p>
            </div>
            <div style={styles.menuItemsList}>
              {menuItems.map((item) => (
                <div
                  style={styles.menuItem}
                  key={item?.id}
                  onMouseEnter={() => setHoveredItemId(item?.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                >
                  <div style={styles.menuItemDetails}>
                    <h3 style={styles.itemTitle}>{item?.name}</h3>
                    <p style={styles.itemCost}>
                      {item?.price || " "}
                    </p>
                    <p style={styles.itemDesc}>{item?.description}</p>
                  </div>
                  <div style={styles.menuImgWrapper}>
                    {isAddedToCart(item) ? (
                      <div style={styles.increase}>
                        <p style={styles.quantity} onClick={() => handleDecrement(item)}>-</p>
                        <p style={styles.quantity}>
                          {cartItems.find(cartItem => cartItem.id === item.id && cartItem.size === size)?.quantity || 0}
                        </p>
                        <p style={styles.quantity} onClick={() => handleIncrement(item)}>+</p>
                      </div>
                    ) : (
                      <button
                        style={{
                          ...styles.addBtn,
                          ...(hoveredItemId === item?.id ? styles.addBtnHover : {}),
                        }}
                        onClick={() => handleAddToCart(item)}
                      >
                        Add +
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  restaurantMenu: {
    padding: "20px",
  },
  restaurantSummary: {
    display: "flex",
    margin: "20px 0 20px 50%",
  },
  restaurantSummaryDetails: {
    marginLeft: "20px",
  },
  restaurantTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0 0 10px 0",
  },
  restaurantTags: {
    margin: "0 0 10px 0",
    color: "#555",
  },
  restaurantDetails: {
    display: "flex",
    alignItems: "center",
    color: "#888",
  },
  restaurantRating: {
    display: "flex",
    alignItems: "center",
    padding: "5px 10px",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  restaurantRatingSlash: {
    margin: "0 20px 0 10px ",
  },
  restaurantMenuContent: {
    paddingTop: "20px",
    borderTop: "1px solid #e0e0e0",
  },
  menuItemsContainer: {
    marginBottom: "20px",
  },
  menuTitleWrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  menuTitle: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  menuCount: {
    color: "#888",
  },
  menuItemsList: {
    display: "flex",
    flexDirection: "column",
  },
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #e0e0e0",
    transition: "background-color 0.3s, box-shadow 0.3s",
  },
  menuItemHover: {
    backgroundColor: "#f8f8f8",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  menuItemDetails: {
    flex: "1",
  },
  itemTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 5px 0",
  },
  itemCost: {
    color: "#555",
    margin: "0 0 5px 0",
  },
  itemDesc: {
    color: "#888",
    margin: "0",
  },
  menuImgWrapper: {
    display: "flex",
    alignItems: "center",
  },
  addBtn: {
    padding: "10px",
    fontSize: "14px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    width: "100px",
    backgroundColor: "#28a745",
    color: "white",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  addBtnHover: {
    backgroundColor: "red",
  },
  increase: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "green",
    width: "90px",
    justifyContent: "space-around",
    padding: "2px",
    borderRadius: "5px",
  },
  quantity: {
    padding: "5px",
    fontSize: "18px",
    cursor: "pointer",
    color: "white",
  },
};

export default RestaurantMenu;
