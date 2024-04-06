import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');


//Getting username
  const handleSubmitUsername = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/reset-password-request', { username });
      setEmail(response.data.email); // Assuming the response contains email
      alert("OTP sent to your email address. Please check your email.");
      setShowOtpForm(true);
    } catch (error) {
      setError('Error:', error);
    }
  };

//Getting OTP
  const handleSubmitOtp = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8080/verify-otp', { 
      username,
      otp 
    });
    if (response.data.includes("verified successfully")) {
      setShowPasswordForm(true);
    } else {
      alert('Invalid OTP, please try again.');
    }
  } catch (error) {
    alert('Error:', error);
  }
};



//Getting new password
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/reset-password', {
        username,
        newPassword,
        confirmPassword
        });
console.log('Response data:', response.data); // Log the response data to the console
    if (response.data.includes("Password reset successful")) {
      alert('Password reset successful!');
      navigate('/login');
    } else {
      alert('Password reset failed. Please try again.');
    }
  } catch (error) {
    alert('Error:', error);
  }
};

  return (
    <div>
      <h1>Forgot Password</h1>
      {!showOtpForm && !showPasswordForm && (
        <form onSubmit={handleSubmitUsername}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
      {showOtpForm && !showPasswordForm && (
        <form onSubmit={handleSubmitOtp}>
          <label>
            OTP:
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
      {showPasswordForm && (
        <form onSubmit={handleSubmitPassword}>
          <label>
            New Password:
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </label>
          <label>
            Confirm Password:
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
