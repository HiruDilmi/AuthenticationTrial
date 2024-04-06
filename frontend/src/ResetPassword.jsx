import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [newPassword, setNewPwd] = useState('');
  const [confirmPassword, setConPwd] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleClear = () => {
    setNewPwd('');
    setConPwd('');
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError('Fill all the fields.');
      return;
    }
    if(newPassword != confirmPassword){
        setError("Passwords do not match");
        return;
    }

    try {
      const response = await axios.post('http://localhost:8080/reset-password', {newPassword, confirmPassword });

      if (response.status !== 200) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      alert("your password is this: "+newPassword+" please login with this password.");
      navigate('/login');
    } catch (error) {
      setError('Error: ' + error);  
    }
  };

return (
  <div className="container">
    <div className="form-container">
      <h2>Reset Password</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}> 
        <div className="form-group">
          <label htmlFor="newPwd">New Password</label>
          <input
            type="text"
            id="newPwd"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPwd(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="conPwd">Confirm Password</label>
          <input
            type="text"
            id="conPwd"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConPwd(e.target.value)}
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

export default ResetPassword;
