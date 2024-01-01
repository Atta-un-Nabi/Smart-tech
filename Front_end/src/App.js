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
          <Admin /></>}
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


