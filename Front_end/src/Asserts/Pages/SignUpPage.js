import React, { useState } from 'react';
import './SignUpPage.css';
import image1 from '../Pics/Internal.gif'
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [UserData, setUserData] = useState({ firstname: "", lastname: "", gender: "", password: "", email: "" });
  const [c_password, setc_password] = useState("");
  const navigate = useNavigate();

  // Hangel Signup Function
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch("https://smart-tech-tawny.vercel.app/api/createUser", {
        method: 'POST',
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: UserData.firstname,
          lastName: UserData.lastname,
          email: UserData.email,
          gender: UserData.gender,
          password: UserData.password
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
      }

      const json = await response.json();
      console.log(json);

      if (json.success) {
        alert('Successfully uploaded Data');
        navigate('/login');
      } else {
        alert('Error in uploading data');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to fetch. See console for details.');
    }
  };

  const handleChange = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
  };

  return (
    <div className='signup_full' >
      <div className='image1' >
        <img src={image1} alt='background' />
      </div>

      <div className="signup-container">

        {/* Signup Heading */}
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>

          {/* First Name */}
          <div className="form-group">
            <label htmlFor="first-name" >First Name:</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={UserData.firstname}
              onChange={handleChange}
              required
            />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="last-name">Last Name:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={UserData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>Gender:</label>
            <div className="radio-group">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={UserData.gender === 'male'}
                onChange={handleChange}
                required
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={UserData.gender === 'female'}
                onChange={handleChange}
                required
              />
              <label htmlFor="female">Female</label>
              <input
                type="radio"
                id="other"
                name="gender"
                value="other"
                checked={UserData.gender === 'other'}
                onChange={handleChange}
                required
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={UserData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={UserData.password}
              onChange={handleChange}
              minLength={8}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              required
            />
            <small>Password must be at least 8 characters and include uppercase and lowercase letters.</small>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="c_password"
              name="c_password"
              value={c_password}
              onChange={(e) => { setc_password(e.target.value) }}
              required
            />
          </div>

          {/* Signup Button */}
          <button type="submit">Sign Up</button>

          {/* Register User Button */}
          <button className='Regbtn' type="submit"><Link className='Link' to={'/login'}>Registered User</Link></button>
        </form>
      </div>
    </div>
  );
};
export default SignUpPage;
