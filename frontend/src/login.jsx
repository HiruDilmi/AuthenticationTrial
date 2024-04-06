import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleClear = () => {
    setUsername('');
    setPassword('');
    setError('');
  }; 

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/login', { username, password });

      if (response.status !== 200) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      // Assuming there's only one user role
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password: ' + error);
    }
  };

  return (
    <div className="container">
      <div className="logo">
        {/* <img src={logo} alt="logo" /> */}
      </div>
      <div className="form-container">
        <h2>Sign In</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
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
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="checkbox"
              id="showPassword"
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <div className="form-group">
            <button type="button" onClick={handleClear}>Clear</button>
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <Link to='/forgot-password' className="forgot-pwd"> Forgot Password?</Link>
    </div>
    
  );
}

export default LoginForm;
