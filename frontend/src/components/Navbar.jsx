import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const navigate = useNavigate(); 
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [hoveredLink, setHoveredLink] = useState(null);

  const handleMouseEnter = (link) => setHoveredLink(link);
  const handleMouseLeave = () => setHoveredLink(null);

  return (
    <nav style={styles.navbar}>
      <div style={{ display: "flex", gap: "50px", alignItems: "center", marginLeft: "100px" }}>
        <p style={styles.logo} onClick={() => navigate("/")}>
          Foodiez
          <p style={styles.down}>eat and repeat</p>
        </p>
        <Link
          style={hoveredLink === 'home' ? styles.link2Hover : styles.link2}
          onMouseEnter={() => handleMouseEnter('home')}
          onMouseLeave={handleMouseLeave}
          to="/"
        >
          Home
        </Link>
        <Link
  style={{ ...(hoveredLink === 'restaurant' ? styles.link2Hover : styles.link2), marginTop: "22px" }}
  onMouseEnter={() => handleMouseEnter('restaurant')}
          onMouseLeave={handleMouseLeave}
          to="/restaurant"
        >
          Restaurants <p style={styles.down2}>Tasty Table</p>
        </Link>
      </div>
      
      <div style={styles.navLinks}>
        {isAuthenticated ? (
          <>
            <Link
              style={hoveredLink === 'orders' ? styles.link2Hover : styles.link2}
              onMouseEnter={() => handleMouseEnter('orders')}
              onMouseLeave={handleMouseLeave}
              to="/my-orders"
            >
              <span style={{fontSize:"18px",marginLeft:"20px"}}>My</span><br/> Orders
            </Link>
            <Link style={styles.cart} to="/cart">
              <FaShoppingCart fontSize="16px" /> <span style={{ color: "orange", fontSize: "14px" }}>({totalItems})</span> Cart
            </Link>
            <button
              style={hoveredLink === 'cart' ? styles.logoutHover : styles.logoutButton}
              onMouseEnter={() => handleMouseEnter('cart')}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                localStorage.removeItem('authToken');
                navigate("/");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <div style={styles.authButtons}>
            <Link style={styles.link} to="/login">Login</Link>
            <Link style={styles.link} to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  logo: {
    marginTop: "20px",
    fontSize: "45px",
    cursor: "pointer"
  },
  down: {
    fontSize: "15px",
    margin: "0 0 0 15px",
    color: "blue",
    fontFamily: "cursive"
  },
  down2: {
    fontSize: "12px",
    margin: "0 0 0 15px",
    color: "green",
    fontFamily: "cursive"
  },
  navbar: {
   
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: "100px",
   
  },
  navLinks: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "10px",
  },
  link: {
    textDecoration: "none",
    backgroundColor: 'green',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: "20px",
    marginRight: "10px",
  },
  link2: {
    color: 'grey',
    textDecoration: 'none',
    fontSize: '25px',
    fontWeight: 'bold',
    padding: '5px 10px',
    borderRadius: '4px',
  },
  link2Hover: {
    color: 'red',
    textDecoration: 'none',
    fontSize: '25px',
    fontWeight: 'bold',
    padding: '5px 10px',
    borderRadius: '4px',
  },
  cart: {
    textDecoration: "none",
    backgroundColor: 'green',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginRight: "10px",
    width: "45px",
    height: "40px",
    fontSize: "18px"
  },
  logoutButton: {
    padding: "10px 20px",
    border: "none",
    color: "black",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "8px"
  },
  logoutHover:{
    padding: "10px 20px",
    border: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "8px",
    backgroundColor: "red",
  },
  authButtons: {
    display: "flex",
    gap: "10px",
  },
  
 
};



export default Navbar;
