import React, { useState, useMemo } from 'react';

import { useProducts } from './ProductContext';  // Assuming you have ProductContext in a file

import './services.css';
import Card from './CardShow';
import image2 from '../../Pics/Internal.gif';
import image7 from '../../Pics/lucy-computer.gif';
import image8 from '../../Pics/skeleton-typing.gif';
import image9 from '../../Pics/explode.gif';

const Services = () => {
  const { products, setProducts } = useProducts();  // Use products from the context
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const filteredProducts = useMemo(() => {
    return (products || []).filter((product) => product.Category === activeCategory);
  }, [products, activeCategory]);

  const handleService = async (e, category) => {
    e.preventDefault();

    // If the clicked category is already active, hide the cards
    if (activeCategory === category) {
      setActiveCategory(null);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://smart-tech-rho.vercel.app/LoadData", {
        method: "POST",
        headers: {
          'X-Content-Type-Options': 'nosniff',
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data.Product);  // Update products in the context
      setActiveCategory(category);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderCards = () => {
    return (
      <div
        style={{
          paddingBottom: "5px",
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap"
        }}
      >
        {filteredProducts.map((product) => (
          <div className="container" key={product._id}>
            <div className="row">
              <div className="col-4">
                <Card key={product._id} product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="services-container">
        <h1 className="services">Our Services</h1>

        {/* Advanced Electronic Projects */}
        <div className="service-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="service-left">
            <img src={image7} alt="Service" className="service-image" />
          </div>
          <div className="service-right">
            <h2 className="service-title" >
              <button
                type="button"
                className="btn btn-outline-info fs-3 fw-bold"
                style={{ color: 'white' }}
                onClick={(e) => handleService(e, "Advance")}
              >
                  Advanced Electronic Projects
              </button>
            </h2>
            <p className="service-description">
              We specialize in taking on advanced level electronic projects, including those involving AI codes and technologies. Our team of experts can assist students in developing and implementing their ambitious electronic projects, providing guidance and support along the way.
            </p>
          </div>
        </div>
        {activeCategory === "Advance" && renderCards()}

        {/* Electronic Repairing */}
        <div className="service-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="service-left">
            <img src={image2} alt="Service" className="service-image" />
          </div>
          <div className="service-right">
            <h2 className="service-title">
              <button
                type="button"
                className="btn btn-outline-info fs-3 fw-bold"
                style={{ color: 'white' }}
                onClick={(e) => handleService(e, "Repairing")}
              >
                Electronic Repairing
              </button>
            </h2>
            <p className="service-description">
              We provide professional electronic repairing services for a wide range of devices. Our experienced technicians can diagnose and fix various electronic issues, ensuring your devices are up and running smoothly.
            </p>
          </div>
        </div>
        {activeCategory === "Repairing" && renderCards()}

        {/* Household Electronics for Sale */}
        <div className="service-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="service-left">
            <img src={image8} alt="Service" className="service-image" />
          </div>
          <div className="service-right">
            <h2 className="service-title">
              <button
                type="button"
                className="btn btn-outline-info fs-3 fw-bold"
                style={{ color: 'white' }}
                onClick={(e) => handleService(e, "Household")}
              >
                Household Electronics for Sale
              </button>
            </h2>
            <p className="service-description">
              Explore our collection of high-quality household electronics available for sale. From appliances to entertainment systems, we offer a wide range of products that are reliable, durable, and designed to enhance your home experience.
            </p>
          </div>
        </div>
        {activeCategory === "Household" && renderCards()}

        {/* Scientific Electronics projects */}
        <div className="service-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="service-left">
            <img src={image9} alt="Service" className="service-image" />
          </div>
          <div className="service-right">
            <h2 className="service-title">
              <button
                type="button"
                className="btn btn-outline-info fs-3 fw-bold"
                style={{ color: 'white' }}
                onClick={(e) => handleService(e, "Project")}
              >
                Scientific Electronics projects
              </button>
            </h2>
            <p className="service-description">
              Discover our selection of scientific electronics tailored for workers and students. Whether you need equipment for research, experiments, or educational purposes, we have a range of advanced tools and devices to meet your needs.
            </p>
          </div>
        </div>
        {activeCategory === "Project" && renderCards()}
      </div>

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Error state */}
      {error && <p>Error: {error}</p>}
    </>
  );
};

export default Services;
