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
      const response = await fetch("https://smart-tech-rho.vercel.app/api/login", {
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
      const response = await fetch("https://smart-tech-rho.vercel.app/ForgetPass", {
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

  return (
    <div>
      <div>
        <video autoPlay muted loop id="myVideo">
          <source src={video1} type="video/mp4" />
        </video>
        <div className="login-box">
          <h2>Login</h2>
          <form>
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

            <button onClick={handleForgot}>Forgot Password</button>

            <button id="submit-button" type="submit" onClick={submitForm}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
            <button style={{ float: 'right' }}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <Link to="/signup">New User</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
