import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch("https://smart-tech-tawny.vercel.app/api/authCheck", {
          method: "POST",
          headers: {
            'X-Content-Type-Options': 'nosniff',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setAuthenticated(false);
      }
    };

    checkAuth();

  }, []);

  const handleAdmin = async (e) => {
    e.preventDefault();
    try {
      console.log(process.env);
      const authToken = localStorage.getItem('authToken');
      console.log(authToken)
      if (authToken) {
        const response = await fetch("https://smart-tech-tawny.vercel.app/api/authCheck", {
          method: "POST",
          headers: {
            'X-Content-Type-Options': 'nosniff',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          if (data.user && data.user.username === "smartTechAdmmin") {
            navigate('/admin');
          } else {
            alert('Access Denied. Try logging in with the admin account');
            navigate('/');
          }
        } else {
          alert("Incorrect credentials of admin"); // Handle unsuccessful authentication or other errors
          navigate('/login');
        }
      } else {
        console.log("assess Denied")
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
    }

  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthenticated(false);
  };


  return (
    <>
      <nav className="navbar">
        <div style={{
          display: 'flex', justifyContent: 'flex-start',
          '@media (max-width: 426px)': { justifyContent: 'center' }
        }} className="container-fluid">
          <Link to="/" className="navbar-brand">
            THE SMART TECH
          </Link>

          <div className="mobile-links">
            <ul className="horizontal-list">
              <li>
                <Link to={"/"} className="nav-link">Home</Link>
              </li>
              <li>
                <Link to={'/about'} className="nav-link" style={{ width: '20%' }}>About</Link>
              </li>
                {!authenticated ? (
                  <>
                    <li>
                      <Link to="/login" className="nav-link">Log in</Link>
                    </li>
                    <li>
                      <Link to={'/signup'} className="nav-link">Sign Up</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                        <Link to="/" className="nav-link" onClick={handleLogout}>Log out</Link>
                    </li>
                      <li>
                        <Link to="/admin" className="nav-link" onClick={handleAdmin}>Admin</Link>
                      </li>
                  </>
                )}
            </ul>
          </div>

        </div>
      </nav>
    </>
  );
}

export default Navbar;