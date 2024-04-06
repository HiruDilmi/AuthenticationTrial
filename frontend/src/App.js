import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './dashboard';
import Login from './login';
import ForgotPassword from './ForgotPassword';
import VerifyOTP from './VerifyOTP';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verifyOTP/:username" element={<VerifyOTP />} />
      </Routes>
    </BrowserRouter>
  );
}; 


export default App;
