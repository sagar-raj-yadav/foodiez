import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity } from '../../redux/cartSlice'; // Adjust path as needed
import { swiggy_menu_api_URL, IMG_CDN_URL, ITEM_IMG_CDN_URL, MENU_ITEM_TYPE_KEY, RESTAURANT_TYPE_KEY } from "../constants";
import { MenuShimmer } from "./Shimmer";
import useResMenuData from "../Hooks/useResMenuData";
import NavBar from '../../components/Navbar';

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [restaurant, menuItems] = useResMenuData(
    swiggy_menu_api_URL,
    resId,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY
  );
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items); // Get cart items from Redux store
  
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [addedToCart, setAddedToCart] = useState({}); // Track added items
  const [hoveredItemId, setHoveredItemId] = useState(null); // Track hovered item

  const handleAddToCart = (item) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      imgsrc: ITEM_IMG_CDN_URL + item.imageId,
      quantity: Number(quantity),
      size,
      price: item.price,
    };

    // Check if the item is already in the cart
    const existingItem = items.find(cartItem => cartItem.id === item.id && cartItem.size === size);

    if (existingItem) {
      // If the item is already in the cart, dispatch an action to increment the quantity
      dispatch(incrementQuantity({ name: item.name, size: size }));
    } else {
      // If it's not in the cart, add it
      dispatch(addToCart(cartItem));
    }
    
    setAddedToCart(prev => ({ ...prev, [item.id]: true }));
    setQuantity(1);
    setSize("");
  };

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return !restaurant ? (
    <MenuShimmer />
  ) : (
    <>
    <NavBar />
    <div style={styles.restaurantMenu}>
      <div style={styles.restaurantSummary}>
        <div style={styles.restaurantSummaryDetails}>
          <h2 style={styles.restaurantTitle}>{restaurant?.name}</h2>
          <p style={styles.restaurantTags}>{restaurant?.cuisines?.join(", ")}</p>
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
            </div>
            <div>{restaurant?.sla?.slaString}</div>
            <div style={styles.restaurantRatingSlash}>|</div>
            <div>{restaurant?.costForTwoMessage}</div>
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
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>
                  <p style={styles.itemDesc}>{item?.description}</p>
                </div>
                <div style={styles.menuImgWrapper}>
                  {item?.imageId && (
                    <p style={styles.menuItemImg}>{item?.name}</p>
                    /* <img
                      style={styles.menuItemImg}
                      src='https://images.unsplash.com/photo-1481671703460-040cb8a2d909?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                      alt={item?.name}
                    />  */
                  )}
                  {addedToCart[item?.id] ? (
                    <div style={styles.increase}>
                      <p style={styles.quantity} onClick={handleDecrement}>-</p>
                      <p style={styles.quantity}> {quantity} </p>
                      <p style={styles.quantity} onClick={handleIncrement}>+</p>
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
  restaurantImg: {
    width: "200px",
    height: "200px",
    borderRadius: "10px",
    objectFit: "cover",
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
  menuItemImg: {
    width: "80px",
    height: "80px",
    borderRadius: "5px",
    objectFit: "cover",
    marginRight: "10px",
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
