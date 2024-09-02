import React from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
import './Home.css'; // Assuming you're using an external CSS file

const Home = () => {
  const cardsData = [
    {
      image: "/assets/images/restro9.jpg",
      title: "Cozy Corner Cafes",
      placesCount: 7,
    },
    {
      image: "/assets/images/restro1.jpg",
      title: "Exquisite Fine Dining",
      placesCount: 12,
    },
    {
      image: "/assets/images/restro2.jpg",
      title: "Top Nightlife Spots",
      placesCount: 15,
    },
    {
      image: "/assets/images/restro3.jpg",
      title: "Chic Rooftop Restaurants",
      placesCount: 8,
    },
    {
      image: "/assets/images/restro4.jpeg",
      title: "Trendy Vegan Cafes",
      placesCount: 5,
    },
    {
      image: "/assets/images/restro5.jpg",
      title: "Seafood Delicacies",
      placesCount: 10,
    },
    {
      image: "/assets/images/restro10.jpg",
      title: "Prime Steakhouses",
      placesCount: 9,
    },
    {
      image: "/assets/images/restro7.jpg",
      title: "Best Brunch Spots",
      placesCount: 11,
    },
    {
      image: "/assets/images/restro8.jpg",
      title: "Top Food Trucks",
      placesCount: 6,
    },
    {
      image: "/assets/images/restro6.jpg",
      title: "Pizza Parlor Picks",
      placesCount: 13,
    },
    {
      image: "/assets/images/restro11.jpg",
      title: "The Grand Monarch",
      placesCount: 6,
    },
    {
      image: "/assets/images/restro12.jpg",
      title: "Elysian Palace Hotel",
      placesCount: 13,
    },
  ];

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 12px',
  };

  const headingStyle = {
    color: '#333',
    width: '100%',
    maxWidth: '1200px',
  };

  const lineStyle = {
    width: '100%',
    height: '1px',
    backgroundColor: '#ccc',
    margin: '10px 0',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  const subheadingTextStyle = {
    fontSize: '12px',
    color: '#666',
  };

  return (
    <div style={containerStyle}>
      <div style={headingStyle}>
        <h1 style={{ fontSize: "120%" }}>Restaurants</h1>
        <span style={subheadingTextStyle}>Find the best spots to eat and drink</span>
      </div>
      <div style={lineStyle}></div>

      <Link to="/restaurant" style={linkStyle}>
        <div className="cardsContainer">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
              placesCount={card.placesCount}
              className={index >= cardsData.length - 6 ? "card-hide" : ""}
            />
          ))}
        </div>
      </Link>
    </div>
  );
};

export default Home;
