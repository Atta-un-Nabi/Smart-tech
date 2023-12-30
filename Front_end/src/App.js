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


// import Display from "./Asserts/Pages/Home/Display";
function App() {
  return (
    <>
      
      <Routes>
        <Route exact path="/" element={<>
          <Navbar/>
          <Categories />
          <HeroSection />
          <Services />
          {/* <ProductPage /> */}
          {/* <Display /> */}
        </>}
        />
        <Route exact path="/about" element={<>
          <Navbar/>
          <AboutUs />
        </>}
        />

        <Route exact path="/product" element={<>
          <Navbar/>
          <ProductPage />
        </>}
        />

        <Route exact path="/admin" element={<>
          <Navbar/>
          <HeroSection />
          <Admin />
        </>}
        />

        <Route exact path="/login" element={<>
          <Login />
        </>}
        />

        <Route exact path="/signup" element={<>
          <Navbar/>
          <SignUpPage />
        </>}
        />
      </Routes>
      <MYFooter />
    </>

  );
}

export default App;


