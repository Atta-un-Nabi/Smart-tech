import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardShow.css'

const CardShow = ({ product }) => {
  const history = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    // Redirect to the product page with category and id
    history(`/product/${product.Category}/${product._id}`);
  };

  return (
    <div className="Ccard" onClick={handleClick}>
      <img src={product.image} className="CSimg" alt="..."  />
      <div className="CBody">
        <div className="CSText">
          <span className="CSTextspan">{product.Category}</span>
          <p className='CSText'>{product.Name}</p>
          <p className='CSText'>{product.price} $</p>
          {/* <p className='CSText'>{product.Discription}</p> */}
        </div>

        {/* <button type="button" className="CSbtn" onClick={handleClick}>
          Details
        </button> */}

      </div>
    </div>
  );
};

export default CardShow;
