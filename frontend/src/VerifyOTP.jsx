import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const location = useLocation();

  const handleClear = () => {
    setOtp('');
    setError('');
  }; 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/verify-otp', { otp});

      if (response.status !== 200) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

    } catch (error) {
      setError('Error: ' + error);  
    }
  };

   useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const usernameParam = searchParams.get('username');
    if (usernameParam) {
      setUsername(usernameParam);
    }
  }, [location.search]);
  

return (
  <div className="container">
    <div className="form-container">
      <h2>Reset Password</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}> 
        <div className="form-group">
          <label htmlFor="otp">OTP</label>
          <input
            type="text"
            id="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="button" onClick={handleClear}>Clear</button>
          <button type="submit">Veify OTP</button>
        </div>
      </form>
    </div>
  </div>
);

}

export default VerifyOTP;
