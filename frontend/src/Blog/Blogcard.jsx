import React from 'react';
import Card from './Card';
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
      
      ];
      

  return (
    <div className="cards-container">
      {cardsData.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          placesCount={card.placesCount}
        />
      ))}
    </div>
  );
};

export default Home;
