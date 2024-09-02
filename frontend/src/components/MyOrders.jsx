// frontend/components/MyOrders.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

const MyOrders = () => {
  const [allOrders, setAllOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAllOrders(data);
      } else {
        console.error("Error fetching orders:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrder = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/deleteorders/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });

      if (res.ok) {
        setAllOrders(prevOrders => prevOrders.filter(order => order._id !== id));
        alert("Order deleted successfully");
      } else {
        console.error("Error deleting order:", res.statusText);
        alert("Failed to delete the order.");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("An error occurred while deleting the order.");
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2>My Orders</h2>
        {allOrders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          <ul style={styles.orderList}>
            {allOrders.map((order) => (
              <li key={order._id} style={styles.listItem}>
                <img 
                  loading="lazy" 
                  src="food.png" 
                  alt="Order item" 
                  style={styles.image} 
                />
                <div style={styles.orderDetails}>
                  <p style={styles.orderName}><b>{order.name}</b></p>
                  <p style={styles.orderInfo}>Quantity: {order.quantity}</p>
                  <p style={styles.orderInfo}>Price: ${order.price}</p>
                </div>
                <img 
                  style={styles.deleteIcon} 
                  src="delete.png" 
                  alt="Delete order" 
                  onClick={() => deleteOrder(order._id)} 
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};


const styles = {
  container: {
    maxWidth: '600px',
    margin: '10px auto',
    padding: '20px',
  },
  orderList: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    marginRight: '10px',
  },
  orderDetails: {
    flex: 1,
    marginLeft: '10px',
  },
  orderName: {
    fontSize: '1.2rem',
    margin: 0,
  },
  orderInfo: {
    margin: '5px 0',
  },
  deleteIcon: {
    height: '30px',
    cursor: 'pointer',
  },
};

export default MyOrders;
