import React, { useEffect, useState } from "react";
import Card from "./Home/Card";
import { useNavigate } from "react-router-dom";
import NewCard from "./NewCard";
import './Admin.css'
// ... (other imports)

const AdminPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewCard, setShowNewCard] = useState(false);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setShowNewCard(false);
      const response = await fetch("https://smart-tech-tawny.vercel.app/api/LoadData", {
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
      setCategories(data.Cat);
      setProducts(data.Product);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setShowNewCard(false);
    loadData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleChange = async () => {
    await loadData();
    navigate("/admin");
  };

  const handleCreate = async () => {
    setShowNewCard(true);
  };

  return (
    <div className="Admin">
      {/* <div className="d-grid gap-2 col-5 mx-auto"> */}
        <button className="btn btn-outline-primary AdminCCButton"
          type="button" onClick={handleCreate}>
          Create Card
        </button>
      {/* </div> */}

      {showNewCard && <NewCard changeInterface={handleChange} />}

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        categories.map((category, index) => (
          <div key={category._id} style={{ width: "100%" }}>
             
            <h2> {category.Name} </h2>

            {products
              .filter((product) => product.Category === category.Name)
              .map((product) => (

                // Cards in admin
                <div className="AdminContainer"
                  style={{  }} key={product._id} >
                    <div className="col-4" style={{width:'100%'}}>
                      <Card
                        key={product._id}
                        product={product}
                        changeInterface={handleChange}
                      />
                    </div>
                </div>
              ))}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;
