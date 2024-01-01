import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const secret = process.env.Admin_Secret;
function Navbar() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch("https://smart-tech-l4lqlqntn-atta-un-nabis-projects.vercel.app/api/authCheck", {
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
      const authToken = localStorage.getItem('authToken');
      const response = await fetch("https://smart-tech-l4lqlqntn-atta-un-nabis-projects.vercel.app/api/authCheck", {
        method: "POST",
        headers: {
          'X-Content-Type-Options': 'nosniff',
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (data.user && data.user.username === secret) {
          navigate('/admin');
        } else {
          alert('Access Denied. Try logging in with the admin account');
          navigate('/login');
        }
      } else {
        alert("Incorrect credentials of admin"); // Handle unsuccessful authentication or other errors
        navigate('/login');
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
      <nav className="navbar fixed-top" style={{ backgroundColor: '#032F40', color: 'whitesmoke', borderBottom: '1px solid white', Bottom: '10%' }}>
        <div className="container-fluid" style={{ backgroundColor: '#032F40 ', borderBlockColor: '#032F40', height: '70px' }}>
          <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <p className="navbar-brand" style={{ color: 'wheat', alignContent: 'center', fontSize: '25px' }} href="/">
              THE SMART TECH
            </p>

            <ul style={{ display: 'flex', paddingTop: '20px', marginLeft: '0%', fontSize: '18px', color: 'white', listStyle: 'none' }}>
              <li className="nav-item">
                <Link to={"/"} className="nav-link active" aria-current="page" style={{ color: 'wheat' }}>Home</Link>
              </li>

              <li className="nav-item">
                <Link to={'/about'} className="nav-link" style={{ color: 'wheat' }}>About</Link>
              </li>

              <li className="nav-item">
                <Link to={'/product'} className="nav-link" style={{ color: 'wheat' }}>Product</Link>
              </li>
            </ul>

          </div>

          <button
            className="navbar-toggler"
            type="button"
            style={{ backgroundColor: 'wheat' }}
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="offcanvas offcanvas-end " tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header" style={{ backgroundColor: '#032F40' }}>
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel" style={{ color: 'wheat' }}>Smart Tech</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body" style={{ backgroundColor: '#074445' }}>
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item dropdown">
                  <Link to={"/"} className="nav-link dropdown-toggle" style={{ color: 'wheat' }} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    User profiles
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-dark" style={{ backgroundColor: '#fffff', opacity: 0.5 }}>
                    {!authenticated ? (
                      <>
                        <li>
                          <Link to="/login" className="dropdown-item" style={{ color: 'wheat' }}>
                            Log in
                          </Link>
                        </li>
                        <hr className="dropdown-divider" />
                        <li>
                          <Link to={'/signup'} className="dropdown-item" style={{ color: 'wheat' }} >
                            Sign Up
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li>
                        <Link to="/" className="dropdown-item" style={{ color: 'wheat' }} onClick={handleLogout}>
                          Log out
                          </Link>
                          <li>
                          <hr className="dropdown-divider" />
                          <Link to="/admin" className="dropdown-item" style={{ color: 'wheat' }} onClick={handleAdmin}>
                            Admin
                          </Link>
                        </li>
                      </li>
                    )}
                  </ul>
                </li>
              </ul>
            </div>

            <form className="d-flex mt-3" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
