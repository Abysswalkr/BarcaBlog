import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import ClubHistory from './features/ClubHistory';
import NewsSlider from './features/NewsSlider';
import Admin from './admin/Admin';
import News from './features/News';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/history" element={<ClubHistory />} />
        <Route path="/NewsSlider" element={<NewsSlider />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
