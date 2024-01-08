import React from 'react';
import './myfooter.css';
import call from '../Pics/Call Center.gif';
import Loc from '../Pics/map.gif';
const MYFooter = () => {
  return (
    <footer className="footer-container">
      <div className='footer-information'>
        <div className="contact-info" style={{marginBottom:'40px'}}>
            <div style={{ display: 'flex' }}>
              <img src={call} alt="Call-here" className="footer-image" style={{}} />
              <h3 className="footer-heading">Contact Us</h3>
            </div>

          <p className="footer-text">Phone: +92-340-5210941</p>
          <p className="footer-text">Email: info@smarttech.com</p>
        </div>

        <div className="location-info">
            <div style={{ display: 'flex' }}>
              <img src={Loc} alt="location" className="footer-image" />
              <h3 className="footer-heading">Location</h3>
            </div>
          <p className="footer-text">123 Main Street, City, Country</p>
        </div>
      </div>

      <form className="review-form">
        <h3 className="footer-heading">Leave a Review</h3>
        <input type="text" placeholder="Your Name" className="review-input" />
        <textarea placeholder="Your Review" className="review-input"></textarea>
        <button type="submit" className="review-submit">Submit</button>
      </form>
    </footer>
  );
};

export default MYFooter;
