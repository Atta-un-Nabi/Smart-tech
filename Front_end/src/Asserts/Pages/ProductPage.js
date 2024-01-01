import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from './Home/ProductContext'; // Assuming you have ProductContext in a file
import './ProductPage.css';

const ProductPage = () => {
  const { products } = useProducts();
  const { category, id } = useParams();
  const [totalItems, setTotalItems] = useState(1);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [thumbnailProducts, setThumbnailProducts] = useState([]);

  useEffect(() => {
    // Find the clicked product
    const clickedProduct = products.find((product) => product._id === id);

    // Filter products by category
    const categoryProducts = products.filter((product) => product.Category === category);

    // Set the state
    setCurrentProduct(clickedProduct);
    setThumbnailProducts(categoryProducts.slice(0, 4));
  }, [category, id, products]);

  const handleIncrement = () => {
    setTotalItems(totalItems + 1);
  };

  const handleDecrement = () => {
    setTotalItems((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setTotalItems(value > 0 ? value : 1);
  };

  return (
    <div className="product-page">
      {currentProduct && (
        <>
          <div className="product-images">
            <img className='img1' src={process.env.PUBLIC_URL + currentProduct.image} alt={currentProduct.Name} />
          </div>
          <div className="image-thumbnails">
            {thumbnailProducts.map((product) => (
              <img
                key={product._id}
                src={process.env.PUBLIC_URL + product.image}
                alt={product.Name}
                className={`thumbnail-image${currentProduct._id === product._id ? ' active-thumbnail' : ''}`}
                style={{ width: '80px', height: '80px', marginRight: '5px' }}
                onClick={() => setCurrentProduct(product)}
              />
            ))}
          </div>
          <div className="product-details">
            <h2 className="product-title">{currentProduct.Name}</h2>
            <p className="product-price">${currentProduct.price}</p>
            <h3 className="product-title">Description:</h3>
            <p className="product-description">{currentProduct.Discription}</p>
            <div className="quantity-controls">
              <div className="increment">
                <button onClick={handleDecrement}>-</button>
                <input
                  type="number"
                  name="totalItems"
                  id="totalItems"
                  value={totalItems}
                  onChange={handleChange}
                />
                <button onClick={handleIncrement}>+</button>
              </div>
            </div>
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
