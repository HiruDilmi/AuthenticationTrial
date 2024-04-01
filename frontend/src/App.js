import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './dashboard';
import Login from './login';
import ResetPassword from './ResetPassword';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}; 


export default App;
