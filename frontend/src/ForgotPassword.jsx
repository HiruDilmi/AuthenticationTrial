import React, { useState } from 'react';
import { useNavigate, useHistory } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const history = useHistory();

  const handleClear = () => {
    setUsername('');
    setError('');
  }; 

  const handleResetPassword = async (e) => {
    e.preventDefault();
    history.push(`/verifyOtp?username=${username}`);

    if (!username) {
      setError('Please enter your username.');
      return;
    }

    try {
      // Make a request to your backend to initiate the password reset process
      const response = await axios.post('http://localhost:8080/reset-password-request', { username });

      if (response.status !== 200) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      // Display success message to the user
      alert('An OTP has been sent to your email address. Please check your inbox.');
      // Redirect the user to enter the OTP
      navigate(`/verifyOTP/${username}`);
    } catch (error) {
      setError('Error: ' + error.message);  
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Reset Password</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="button" onClick={handleClear}>Clear</button>
            <button type="submit">Reset Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
