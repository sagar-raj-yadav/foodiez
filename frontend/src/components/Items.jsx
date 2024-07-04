import React from 'react';
import axios from 'axios';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    padding: '8px',
  },
  item: {
    position: 'relative',
    width: '180px',
    height:"180px",
    margin: '1px',
    cursor: 'pointer',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    display: 'block'
  },
  overlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0'
  },
  products: {
    fontSize: '14px',
  }
};

const items = [
  { name: 'Rice', products: 5, image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Doughnut', products: 15, image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Breads', products: 52, image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Cakes', products: 100, image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Coffee', products: 10, image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Fast Food', products: 10, image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Healthy Food', products: 10, image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Juice', products: 5, image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const ItemList = () => {
   
    return (
      <div style={styles.container}>
        {items.map(item => (
          <div
            key={item.name}
            style={styles.item}
          >
            <img src={item.image} alt={item.name} style={styles.image} />
            <div
              style={
              styles.overlay              }
            >
              <div style={styles.title}>{item.name}</div>
              <div style={styles.products}>{item.products} Products</div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ItemList;