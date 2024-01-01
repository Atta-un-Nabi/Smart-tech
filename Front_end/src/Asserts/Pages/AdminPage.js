import React, { useEffect, useState } from "react";
import Card from "./Home/Card";
import { useNavigate } from "react-router-dom";
import NewCard from "./NewCard";

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
      const response = await fetch("https://smart-tech-l4lqlqntn-atta-un-nabis-projects.vercel.app/LoadData", {
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
    setShowNewCard(true); // Hide NewCard
      };

  return (
    <div>
      <div className="d-grid gap-2 col-6 mx-auto">
        <button className="btn btn-primary" type="button" onClick={handleCreate}>
          Create Card
        </button>
      </div>

      {showNewCard && <NewCard changeInterface={handleChange} />}

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        categories.map((category, index) => (
          <div key={category._id} style={{ width: "100%" }}>
            <h2
              style={{
                borderBottom: "2px solid #ccc",
                paddingBottom: "5px",
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                animation: "fillWidth 7s forwards",
              }}
            >
              {category.Name}
            </h2>
            {products
              .filter((product) => product.Category === category.Name)
              .map((product) => (
                <div className="container" key={product._id}>
                  <div className="row">
                    <div className="col-4">
                      <Card
                        key={product._id}
                        product={product}
                        changeInterface={handleChange}
                      />
                    </div>
                  </div>
                </div>
              ))}
            {index < categories.length - 1 && <hr style={{ margin: "20px 0" }} />}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;
