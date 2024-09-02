import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import AddNote from '../../../blogwriting/Addnote'
const Header = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();

  const handlePopupToggle = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <>
      <header className='home-header'>

        <div>
          <h2 className='writing1'>Inc. This Morning</h2>
          <h1 className='writing2'>
            <span>“</span> Blog <span>”</span>
          </h1>
          <p className='writing3'>
            Awesome place to make oneself <br /> productive and entertained through
            daily updates.
          </p>
        </div>


        <div className="write-blog-section" onClick={handlePopupToggle}>
         
          <img src="/assets/images/writing.png" alt="Writing"/>
         <p className='writing4'>Write Your Blog</p>
        </div>

      </header>
      
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={handlePopupToggle}>X</button>
            <h2 ><AddNote handlePopupToggle={handlePopupToggle} isPopupVisible={isPopupVisible}/></h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
