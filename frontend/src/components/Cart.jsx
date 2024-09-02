import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCouponPopup, setShowCouponPopup] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);

  // Address form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleRemoveFromCart = (id, size) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this item?');
    if (confirmDelete) {
      dispatch(removeFromCart({ id, size }));
    }
  };

  const handleCheckout = () => {
    navigate('/orderpage', { state: { name, phone, address } });
  };

  const handleIncrementQuantity = (name, size) => {
    dispatch(incrementQuantity({ name, size }));
  };

  const handleDecrementQuantity = (name, size) => {
    dispatch(decrementQuantity({ name, size }));
  };

  const handleApplyCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setDiscount(coupon.discount);
    setShowCouponPopup(false);
  };

  const coupons = [
    { code: 'DISCOUNT10', discount: 10 },
    { code: 'DISCOUNT20', discount: 20 },
    { code: 'DISCOUNT30', discount: 30 },
    { code: 'DISCOUNT40', discount: 40 },
  ];

  // Calculate total items in the cart
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price before GST
  const totalPriceBeforeGST = items.reduce((total, item) => {
    const price = isNaN(item.price) || item.price <= 0 ? 1 : item.price;
    const quantity = isNaN(item.quantity) || item.quantity <= 0 ? 1 : item.quantity;
    const itemTotal = price * quantity < 1000 ? price * quantity : price * quantity / 100;
    return total + itemTotal;
  }, 0);

  // Calculate GST (18%)
  const gst = totalPriceBeforeGST * 0.18;

  // Calculate total price including GST
  const totalPriceWithGST = totalPriceBeforeGST + gst;

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2><u>Your Cart</u></h2>
        <h3 style={{ margin: "20px" }}>Total Items in Cart: {totalItems}</h3>

        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div style={styles.content}>
            <ul style={styles.items}>
              {items.map((item, index) => (
                <li key={index} style={styles.listItem}>
                  <img src={item.imgsrc ? item.imgsrc : '/logo.png'}  alt={item.name} style={styles.image} />
                  <div>
                    <h5>{item.name}</h5>
                    {/* <p>{item.description}</p> */}
                    <p>Size: {item.size}</p>
                    <p>
                      <button style={styles.quantity} onClick={() => handleDecrementQuantity(item.name, item.size)}>-</button>
                      Quantity: {item.quantity}
                      <button style={styles.quantity} onClick={() => handleIncrementQuantity(item.name, item.size)}>+</button>
                    </p>
                    <p>Price: ${
                      isNaN(item.quantity * item.price) || item.quantity * item.price <= 0
                        ? 1
                        : item.quantity * item.price >= 1000
                        ? item.quantity * item.price / 100
                        : item.quantity * item.price
                    }</p>
                  </div>
                  <button style={styles.removebutton} onClick={() => handleRemoveFromCart(item.id, item.size)}>Remove</button>
                </li>
              ))}
            </ul>

            <div style={styles.rightside}>
              <div style={styles.addressForm}>
                <h3>Delivery Address</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                />
                <br />
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={styles.input}
                />
                <br />
                <textarea
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ ...styles.input, height: '80px' }}
                />
              </div>

              <div style={styles.bill}>
                <h3><u>Your Bill</u></h3>
                <p>Total Price (before GST): ${totalPriceBeforeGST.toFixed(2)}</p>
                <p>GST (18%): ${gst.toFixed(2)}</p>
                <p>Delivery charge: ${(totalPriceBeforeGST.toFixed(2) * 5) / 100}</p>
                <p>Coupon Discount: -${((totalPriceBeforeGST * discount) / 100).toFixed(2)}</p>
                <p>Total Amount (including GST and discount): ${(totalPriceWithGST - (totalPriceBeforeGST * discount) / 100).toFixed(2)}</p>
                <p>Estimated Time for Delivery: {Math.floor(Math.random() * 10)} km</p>
                <p style={{ color: "green", fontSize: "20px", cursor: "pointer" }} onClick={() => setShowCouponPopup(true)}>Apply Coupon</p>
              </div>

              <button style={styles.checkoutButton} onClick={handleCheckout}>Pay(${(totalPriceWithGST - (totalPriceBeforeGST * discount) / 100).toFixed(2)})</button>

              {showCouponPopup && <CouponPopup coupons={coupons} onApply={handleApplyCoupon} onClose={() => setShowCouponPopup(false)} />}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const CouponPopup = ({ coupons, onApply, onClose }) => {
  return (
    <div style={styles.popup}>
      <h3>Select a Coupon</h3>
      <ul>
        {coupons.map((coupon, index) => (
          <li key={index}>
            <button style={styles.couponButton} onClick={() => onApply(coupon)}>
              {coupon.code} - {coupon.discount}% off
            </button>
          </li>
        ))}
      </ul>
      <button style={styles.closeButton} onClick={onClose}>Close</button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  items: {
    flex: "1 1 300px",
    marginRight: "20px",
  },
  listItem: {
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  image: {
    width: "100%",
    height: "100px",
    objectFit: "cover",
    marginRight: "10px",
  },
  removebutton: {
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  checkoutButton: {
    backgroundColor: "blue",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "20px 0 50px 0",
    width: "90%",
    textAlign: "center",
  },
  bill: {
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "20px",
    width:"90%"
  },
  quantity: {
    padding: "4px",
    margin: "4px",
    fontSize: "15px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    borderRadius: "5px",
    zIndex: 1000,
  },
  couponButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  closeButton: {
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  addressForm: {
    border: "1px solid grey",
    borderRadius: "8px",
    margin: "20px 0",
    padding: "20px",
    width: "80%",
  },
  input: {
    margin: "5px",
    padding: "10px",
    width: "90%",
  },
  rightside: {
    flex: "1 1 300px",
    marginTop: "20px",
  },
};

// Add media query styles
const mediaQueryStyles = {
  '@media (max-width: 768px)': {
    container: {
      padding: "20px",
    },
    content: {
      flexDirection: "column",
      alignItems: "center",
    },
    items: {
      marginRight: "0",
      marginBottom: "20px",
    },
    rightside: {
      marginTop: "20px",
    },
  },
};

export default Cart;
