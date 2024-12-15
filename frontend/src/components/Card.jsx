import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const Card = ({ id, name, description, imgsrc, options }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(Object.keys(options)[0]);
  const [addedToCart, setAddedToCart] = useState(false); // New state
  const dispatch = useDispatch();

            {addedToCart ? (
              <div style={styles.increase}>
              
                <span style={styles.quantity} onClick={handleDecrement}>-</span>
                <span style={styles.quantity}> {quantity} </span>
                <span style={styles.quantity} onClick={handleIncrement}>+</span>
              </div>
            ) : (
              <button style={styles.addButton} onClick={handleAddToCart}>Add to cart</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  width: '10rem',
  maxHeight: '370px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '1rem',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor:'pointer',
};

const cardHoverStyle = {
  transform: 'translateY(-10px) scale(1.05)',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
};


const styles = {
  card: {
    
    width: '10rem',
    maxHeight: ' 370px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease' 
    },

  cardImg: {
    height: '100px',
    width: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  select: {
    margin: '0.3rem',
    height: '40px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '0.01rem',
    backgroundColor: '#f8f9fa',
    fontSize: "14px"
  },
  totalPrice: {
    display: 'inline',
    fontSize: '14px',
    color: 'green',
  },
  addButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    marginTop: "8px",
    padding: '0.4rem 0.7rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: "15px"
  },
  increase:{
    backgroundColor:"green",
    width:"15%",
    padding:"2px 20px",
    display:"flex",
    alignItems:"center",
    marginTop:"10px"
  },
  quantity:{
    padding:"2px",
    fontSize:"18px",
    cursor:"pointer",
    color:"white",
  }
};


export default Card;
