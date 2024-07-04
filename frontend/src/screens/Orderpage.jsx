// OrderPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { moveToOrders } from '../redux/cartSlice';
import Navbar from '../components/Navbar';

const OrderPage = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { name, phone, address } = location.state || {};

 // const totalPrice = items.reduce((total, item) => total + item.quantity * item.price, 0);

  
  const totalPrice = items.reduce((total, item) => {
    // Ensure item price and quantity are valid numbers
    const price = isNaN(item.price) || item.price <= 0 ? 1 : item.price;
    const quantity = isNaN(item.quantity) || item.quantity <= 0 ? 1 : item.quantity;
    
    // Calculate item total price
    const itemTotal = price * quantity < 1000 ? price * quantity : price * quantity / 100;
    return total + itemTotal;
  }, 0);


  const handleContinueToPayment = () => {
    dispatch(moveToOrders()); // Move items to orders  (ye line likhne se item myorders me jata h)
    navigate('/payment');
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2>Order Summary</h2>
        <div style={styles.deliveryDetails}>
          <h3>Delivery Details</h3>
          <p>Name: {name}</p>
          <p>Phone: {phone}</p>
          <p>Address: {address}</p>
        </div>
        <h2>List of items</h2>
        <ul style={{ border: "2px solid grey" }}>
      <li style={{ ...styles.listItem, fontWeight: 'bold',textDecoration:"underline",    fontSize:"20px"
 }}>
        <h5>ID</h5>
        <h5>Item</h5>
        <h5 style={{paddingLeft:"70px"}}>Price</h5>
        <h5>Quantity</h5>
        <h5>Size</h5>
      </li>
      {items.map((item, index) => (
        <li key={index} style={styles.listItem}>
          <h5>{index + 1}</h5>
          <h5>{item.name}</h5>
          <p>
            ${isNaN(item.quantity * item.price) || item.quantity * item.price <= 0
              ? 1
              : item.quantity * item.price}
          </p>
          <p >{item.quantity}</p>
          <p>{item.size}</p>
        </li>
      ))}
    </ul>
        <h3>Total Price: ${totalPrice}</h3>
        
        <button style={styles.continueButton} onClick={handleContinueToPayment}>
          Continue to Payment
        </button>
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '70px',
    textAlign: 'center',
  },
  listItem: {
    display:"flex",
    justifyContent:"space-between",
    margin: '20px',

  },
  deliveryDetails: {
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    textAlign: 'left',
  },
  continueButton: {
    padding: '10px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '20px',
  },
};

export default OrderPage;
