import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { moveToOrders } from '../redux/cartSlice';

const OrderPage = () => {
  const items = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { name, phone, address } = location.state || {};

  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = items.reduce((total, item) => {
    const price = isNaN(item.price) || item.price <= 0 ? 1 : item.price;
    const quantity = isNaN(item.quantity) || item.quantity <= 0 ? 1 : item.quantity;
    return total + price * quantity;
  }, 0);

  

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        console.error(response.error);
        setIsProcessing(false);
      });
      rzp1.open();
    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
    }
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
        <ul style={{ border: '2px solid grey' }}>
          <li style={{ ...styles.listItem, fontWeight: 'bold', textDecoration: 'underline', fontSize: '20px' }}>
            <h5>ID</h5>
            <h5>Item</h5>
            <h5 style={{ paddingLeft: '70px' }}>Price</h5>
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
              <p>{item.quantity}</p>
              <p>{item.size}</p>
            </li>
          ))}
        </ul>
        <h3>Total Price: ${totalPrice}</h3>
        <button 
          style={styles.continueButton} 
          onClick={makePayment} 
          disabled={isProcessing} // Disable button if payment is processing
        >
          {isProcessing ? 'Processing...' : 'Continue to Payment'}
        </button>
        {totalPrice === 0 && (
          <p style={styles.warningMessage}>Add some items to your cart before proceeding!</p>
        )}
        <div style={styles.cardInfoContainer}>
          <p><u>for sample use only:</u></p>
          <p style={styles.cardInfo}>Email: ram@gmail.com</p>
          <p style={styles.cardInfo}>Card Number: 4242 4242 4242 4242</p>
          <p style={styles.cardInfo}>Expiry Date: 12/26</p>
          <p style={styles.cardInfo}>CVV: 123</p>
          <p style={styles.cardInfo}>Card Holder Name: Ram</p>
          <p style={styles.cardInfo}>Country: India</p>
        </div>
      </div>
    </>
  );
};

const styles = {
  cardInfoContainer: {
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '15px auto',
    fontFamily: "'Poppins', sans-serif",
  },
  cardInfo: {
    fontSize: '0.8em',
    color: '#333',
    marginBottom: '10px',
    lineHeight: '1.5',
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '70px',
    textAlign: 'center',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
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
  warningMessage: {
    color: 'red',
    marginTop: '10px',
    fontSize: '16px',
  },
};

export default OrderPage;
