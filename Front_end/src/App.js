import { useEffect, useState } from "react";
import Navbar from "./Asserts/Pages/Navbar";
import Categories from "./Asserts/Pages/Home/Categories";
import HeroSection from "./Asserts/Pages/Home/HeroSection";
import Services from "./Asserts/Pages/Home/Services";
import AboutUs from './Asserts/Pages/AboutUs';
import SignUpPage from './Asserts/Pages/SignUpPage';
import Admin from './Asserts/Pages/AdminPage';
import Login from './Asserts/Pages/Login';
import MYFooter from './Asserts/Pages/MYFooter';
import { Route, Routes } from "react-router-dom";
import ProductPage from "./Asserts/Pages/ProductPage";
import { ProductsProvider } from "./Asserts/Pages/Home/ProductContext";
import Reset from "./Asserts/Pages/ResetPassword";

function App() {
  const [authenticated, setAuthenticated] = useState(false)
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
          console.error("this is Running")
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setAuthenticated(false);
      }
    };

    checkAuth();

  }, []);

  return (
    <>

      <Routes>
        <Route exact path="/" element={<ProductsProvider>
          <Navbar />
          <Categories />
          <HeroSection />
          <Services />
        </ProductsProvider>}
        />
        <Route exact path="/about" element={<>
          <Navbar />
          <AboutUs />
        </>}
        />
        <Route
          exact
          path="/product/:category/:id"
          element={
            <ProductsProvider>
              <Navbar />
              <ProductPage />
            </ProductsProvider>
          }
        />

        <Route exact path="/login" element={<>
          <Login />
        </>}
        />

        <Route exact path="/signup" element={<>
          <Navbar />
          <SignUpPage />
        </>}
        />
        <Route exact path="/admin" element={<>
          <Navbar />
          <HeroSection />
          {authenticated ? (
            <div>
              <Admin />
            </div>) : (
                <>
                  <h3 style={{color:'red'}}>Something Went Wrong Please try again</h3>  
                </>
          )}
        </>}

        />
        <Route
          exact
          path="/reset/:token"
          element={
            <div>
              <Navbar />
              <Reset />
            </div>
          }
        />

      </Routes>
      <MYFooter />
    </>

  );
}

export default App;


