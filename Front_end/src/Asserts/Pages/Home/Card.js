import React, { useState, useEffect } from 'react';
import './cards.css'

const Card = ({ product, changeInterface }) => {
  const [formData, setFormData] = useState({
    title: product.Name || '',
    description: product.Discription || '',
    price: product.price || '',
  });

  useEffect(() => {
    setFormData({
      title: product.Name || '',
      description: product.Discription || '',
      price: product.price || '',
    });
  }, [product]);

  const handleDetailsUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://smart-tech-tawny.vercel.app/api/UpdateProduct', {

        method: 'POST',
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: product._id,
          Name: formData.title,
          Discription: formData.description,
          Category: product.Category,
          image: product.image,
          price: formData.price,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      changeInterface();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handelDelete = async () => {
    try {
      let response = await fetch('https://smart-tech-tawny.vercel.app/api/DeleteProduct', {
        method: 'POST',
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: product._id,
          Name: formData.title,
          Discription: formData.description,
          Category: product.Category,
          image: product.Image,
          price: formData.price
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      changeInterface();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="AdminCard">
      <img src={product.image} className="AdminCardImg" alt="..." />
      <div className="adminCardBody" >
        <div className="AdminCardInputGroup" >
          <span className="CardSpan" style={{ color: 'black',}}>{product.Category}</span>
          <input
            type="text"
            name="title"
            aria-label="Title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: '4px' }}
          />

          <textarea
            name="description"
            aria-label="Description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: '4px' }}
          />

          <input
            type="text"
            name="price"
            aria-label="Price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            style={{ width: '100%', marginBottom: '4px' }}
          />
        </div>

        <div className="d-flex justify-content-around">
          <div  className="d-grid gap-2 col-6">
            <button
              className="btn btn-outline-primary AdminCardButton"
              style={{ marginTop: '3px' }}
              onClick={handleDetailsUpdate}
            >
              Update
            </button>
          </div>
          <div className="d-grid gap-2 col-6">
            <button
              className="btn btn-outline-danger AdminCardButton"
              style={{ marginTop: '3px', float:'right' }}
              onClick={handelDelete}
            >
              Delete
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Card;
