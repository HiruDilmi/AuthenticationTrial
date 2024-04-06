import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForgotPwd.css';

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
    const [passwordError, setPasswordError] = useState('');
   const [requirementsMet, setRequirementsMet] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    numberOrSpecialChar: false
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
       // Password validation logic
      if (!validatePassword(newPassword)) {
        alert('Password must have at least 6 characters, one uppercase letter, one lowercase letter, and one number or special character.');
        return;
      }
      if (newPassword !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

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

 const validatePassword = (password) => {
    // Password must have at least 6 characters, one uppercase letter, one lowercase letter, and one number or special character
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z!@#$%^&*()_+]).{6}$/;
    return passwordRegex.test(password);
  };

 const handlePasswordChange = (e) => {
    const { value } = e.target;
    setNewPassword(value);

    // Password requirements validation
    setRequirementsMet({
      length: value.length >= 6,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      numberOrSpecialChar: /[\d!@#$%^&*()_+]/.test(value)
    });
    setPasswordError('');
  };
const clearFieldsUsername = () => {
    setUsername('');
  };

const clearFieldsOTP = () => {
    setOtp('');
  };

   const clearFieldsPwd = () => {
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setPasswordError('');
    setRequirementsMet({
      length: false,
      uppercase: false,
      lowercase: false,
      numberOrSpecialChar: false
    });
    setShowNewPassword(false);
    setShowConfirmPassword(false);
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
          <button type="button" onClick={clearFieldsUsername}>Clear</button>
          <button type="submit">Submit</button>
        </form>
      )}
      {showOtpForm && !showPasswordForm && (
        <form onSubmit={handleSubmitOtp}>
          <label>
            OTP:
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          </label>
          <button type="button" onClick={clearFieldsOTP}>Clear</button>
          <button type="submit">Submit</button>
        </form>
      )}
      {showPasswordForm && (
        <form onSubmit={handleSubmitPassword}>
          <label>
            New Password:
           <input type={showNewPassword ? 'text' : 'Password'} value={newPassword} onChange={handlePasswordChange} />
       </label>
        {newPassword && (
          <ul>
            <li className={requirementsMet.length ? 'success' : ''}>Password must have at least 6 characters</li>
            <li className={requirementsMet.uppercase ? 'success' : ''}>Password must contain at least one uppercase letter</li>
            <li className={requirementsMet.lowercase ? 'success' : ''}>Password must contain at least one lowercase letter</li>
            <li className={requirementsMet.numberOrSpecialChar ? 'success' : ''}>Password must contain at least one number or special character</li>
          </ul>
        )}
        {passwordError && <div className="error">{passwordError}</div>}
        <label>
          Confirm Password:
           <input type={showConfirmPassword ? 'text' : 'Password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
    </label>
    <div>
      <input type="checkbox" id="showPassword" checked={showNewPassword} onChange={() => setShowNewPassword(!showNewPassword)} />
      <label htmlFor="showNewPassword">Show New Password</label>
    </div>
    <div>
      <input type="checkbox" id="showConfirmPassword" checked={showConfirmPassword} onChange={() => setShowConfirmPassword(!showConfirmPassword)} />
      <label htmlFor="showConfirmPassword">Show Confirm Password</label>
    </div>
         <button type="button" onClick={clearFieldsPwd}>Clear</button>
        <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );

  function allRequirementsMet() {
    return Object.values(requirementsMet).every((requirement) => requirement);
  }

}

export default ForgotPassword;
