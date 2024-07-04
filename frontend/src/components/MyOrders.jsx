import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

const MyOrders = () => {
  const orders = useSelector(state => state.cart.orders);


  return (
    <>
    <Navbar/>
    <div style={styles.container}>
    
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index} style={styles.listItem}>
              <img loading='lazy' src={order.imgsrc} alt="..." style={styles.image} />
              <div>
                <h5>{order.name}</h5>
                <p>{order.description}</p>
                <p>Size: {order.size}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Price: ${order.price}</p>
              </div>
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
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
  },
  listItem: {
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    marginRight: "10px",
  },
};

export default MyOrders;
