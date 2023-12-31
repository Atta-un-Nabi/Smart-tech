import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import video1 from "../Pics/vid2.mp4";
import "./login.css";

function Login() {
  const [userData, setUserData] = useState({ password: "", email: "" });
  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://smart-tech-tawny.vercel.app/api/login", {
        method: "POST",
        headers: {
          'X-Content-Type-Options': 'nosniff',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
      }

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("authToken", json.authToken);
        console.log('Successfully logged in. See console.', json.authToken);
        navigate('/');
      } else {
        alert(json.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert(`Incorrect login credentials. See console for details: ${error}`);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://smart-tech-tawny.vercel.app/api/ForgetPass", {
        method: "POST",
        headers: {
          'X-Content-Type-Options': 'nosniff',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
      }

      const json = await response.json();

      if (json.success) {
        alert("Password reset email sent successfully. Check your inbox.");
      } else {
        alert(json.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert(`Error sending password reset email. See console for details: ${error}`);
    }
  };

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="Login_full">
      <div>

        {/* Background Video */}
        <video autoPlay muted loop id="myVideo">
          <source src={video1} type="video/mp4" />
        </video>
        <div className="login-box">

          <button className="back-button" onClick={goBack}>
            Back
          </button>

          <h2>Login</h2>
          <form>

            {/* email */}
            <div className="user-box">
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
              <label>Email</label>
            </div>

            {/* password */}
            <div className="user-box">
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required
              />
              <label>Password</label>
            </div>

            {/* Submit Button */}
            <button className="formbutton" id="submit-button" type="submit" onClick={submitForm}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>

            {/* New user Button */}
            <button className="formbutton" style={{ float: 'right', overflow: 'hidden' }}>
              <Link to="./signup" style={{ color: '#3fd9e1', textDecoration: 'none' }} >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                New User
              </Link>
            </button>

            {/* Forget Password */}
            <button className="fpbutton" onClick={handleForgot}>Forgot Password</button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

