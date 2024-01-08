import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import './RestPassword.css';
const ResetPassword = () => {
  const { token } = useParams(); // Extract reset token from URL
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [passwordMatchError, setPasswordMatchError] = useState('');

  useEffect(() => {
    if (watch('password') === watch('confirmPassword')) {
      setPasswordMatchError('');
    } else {
      setPasswordMatchError('Passwords do not match');
    }
  }, [watch('password'), watch('confirmPassword')]);

  const onSubmit = async (data) => {
    try {
      // Check if passwords match before submitting
      if (passwordMatchError) {
        console.error('Passwords do not match');
        return;
      }

      // Include the reset token and email in the request body
      const requestData = { ...data, token, email: data.email };

      const response = await fetch('https://smart-tech-tawny.vercel.app/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // Password reset was successful
        console.log('Password reset successful');
      } else {
        // Handle errors or display error messages to the user
        console.error('Password reset failed');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
    }
  };

  return (
    <div className="reset-password-container" style={{ width: '100%', height: '500px', marginTop: '100px' }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="reset-password-form">
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>New Password:</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
            })}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          {passwordMatchError && <p>{passwordMatchError}</p>}
        </div>
        <button className='btn btn-outline-info' type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
