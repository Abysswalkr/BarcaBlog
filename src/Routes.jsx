import React, { Fragment, useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm/>} />
        
       
        
        
        
      </Routes>
    </Router>
  );
}

export default AppRoutes;