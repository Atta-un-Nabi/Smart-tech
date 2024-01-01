import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardShow = ({ product }) => {
  const history = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    // Redirect to the product page with category and id
    history(`/product/${product.Category}/${product._id}`);
  };

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={product.image} className="card-img-top" alt="..." />
      <div className="card-body" style={{ margin: '2px', width: '100%', justifyContent: 'left' }}>
        <div className="input-group" style={{ marginBottom: '4px' }}>
          <span className="input-group-text">{product.Category}</span>
          <p style={{ width: '100%', marginBottom: '4px' }}>{product.Name}</p>
          <p style={{ width: '100%', marginBottom: '4px' }}>{product.Discription}</p>
        </div>
        <div className="input-group" style={{ width: '100%', marginBottom: '4px' }}>
          <p style={{ width: '100%', marginBottom: '4px' }}>{product.price}</p>
        </div>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={handleClick}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default CardShow;
