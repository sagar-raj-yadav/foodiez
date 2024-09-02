import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import company_logo from '../../public/navbarimage/company_logo.png';
import shopping_bag from '../../public/navbarimage/shopping-bag.png';
import grocery from '../../public/navbarimage/grocery.gif';
import profile from '../../public/navbarimage/profile.png';
import blog from '../../public/navbarimage/blog.png';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  return (
    <div style={{ width: "100%" }}>
      <nav style={styles.navbar}>
        <div style={styles.leftSection}>
          <Link to="/">
            <img src={company_logo} alt="Company Logo" style={styles.logoImage} />
          </Link>
        </div>

        <div style={styles.navLinks}>
          {isLoggedIn ? (
            <>
              <Link to="/my-orders" style={styles.order}>
                <img src={shopping_bag} alt="Orders" style={styles.orderImage} />
              </Link>

              <Link to="/cart" style={styles.cart}>
                <img src={grocery} alt="Cart" style={styles.cartImage} />
                {totalItems > 0 && <span style={styles.cartCount}>{totalItems}</span>}
              </Link>

              <Link to="/blog">
                <img src={blog} alt="Blog" style={styles.blog} />
              </Link>

              <div style={styles.profileContainer}>
                <img 
                  src={profile} 
                  alt="Profile" 
                  style={styles.profileIcon} 
                  onClick={toggleDropdown} 
                />
                {isDropdownOpen && (
                  <div style={styles.dropdownMenu}>
                    <p style={styles.dropdownItem} onClick={() => navigate('/profile')}>Profile</p>
                    <p style={styles.dropdownItem} onClick={handleLogout}>Logout</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={styles.authButtons}>
              <Link style={styles.link} to="/login">Login</Link>
              <Link style={styles.link} to="/signup">Signup</Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '1px 5%' ,
    borderBottom: '1px solid #ddd',
    margin: '0 auto',
    flexWrap: 'wrap',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  leftSection: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    flex: '1',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flex: '1',
    justifyContent: 'flex-end',
  },
  orders: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Center content horizontally
    fontFamily: 'Poppins, sans-serif',
    fontSize: "0.9rem",
    fontWeight: "bold",
    borderRadius: "50%",
    backgroundColor:"#837872",
    color:"white",
    border: "2px solid green",
    padding: "6px 10px", // Adjusted padding for better spacing
    cursor: "pointer",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Added box shadow
    transition: "box-shadow 0.3s ease", // Smooth transition for box shadow
  },
  link: {
    textDecoration: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  ordersLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    width: '40px',
    height: '30px'
  },
  cart: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
    width: '50px',
    height: '50px',
  },
  order: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
    width: '40px',
    height: '40px',
  },
  orderImage: {
    height: '40px',
    width: 'auto',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  authButtons: {
    display: 'flex',
    gap: '10px',
  },
  logoImage: {
    height: '65px',
    width: 'auto',
    maxWidth: '100%',
  },
  icon: {
    height: '80px',
    width: 'auto',
    maxWidth: '80%',
  },
  restro: {
    height: '50px',
    width: 'auto',
    maxWidth: '80%',
  },
  profileIcon: {
    height: '40px',
    width: '40px',
    cursor: 'pointer',
    borderRadius: '50%',
  },
  blog: {
    height: '60%',
    width: '40px',
    cursor: 'pointer',
    borderRadius: '50%',
  },
  profileContainer: {
    position: 'relative',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '60px',
    right: '0',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    zIndex: '1000',
    padding: '10px',
  },
  dropdownItem: {
    padding: '10px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid #ddd',
  },
  dropdownItemLast: {
    borderBottom: 'none',
  },
  cartImage: {
    height: '80%',
    width: 'auto',
  },
  cartCount: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: 'red',
    color: '#fff',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '12px',
  },
};

// Media Queries for Responsive Design
const mediaQueries = {
  '@media (max-width: 1024px)': {
    navbar: {
      padding: '10px 15px',
    },
    logoImage: {
      height: '70px',
    },
    icon: {
      height: '35px',
    },
    cartImage: {
      height: '40px',
    },
    profileIcon: {
      height: '40px',
    },
  },
  '@media (max-width: 768px)': {
    navbar: {
      padding: '10px',
    },
    logoImage: {
      height: '60px',
    },
    icon: {
      height: '30px',
    },
    cartImage: {
      height: '30px',
    },
    profileIcon: {
      height: '30px',
    },
  },
  '@media (max-width: 480px)': {
    navbar: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '5px',
    },
    leftSection: {
      flexDirection: 'column',
      gap: '10px',
    },
    navLinks: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '10px',
      marginTop: '10px',
    },
    link: {
      padding: '6px 12px',
      fontSize: '14px',
    },
    icon: {
      height: '5px',
    },
    cartImage: {
      height: '5px',
    },
    profileIcon: {
      height: '5px',
    },
  },
};

export default Navbar;
