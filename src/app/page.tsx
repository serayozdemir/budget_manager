'use client'
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import "./style.scss"

const Home = () => {
  return (
    <BrowserRouter>
      <div className="container_out">
        <Routes>
          <Route path="" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>  
    </BrowserRouter>
  );
};

export default Home