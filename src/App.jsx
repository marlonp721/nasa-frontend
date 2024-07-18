import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Gallery from './components/Gallery';
import Asteroids from './components/Asteroids';
import Favorites from './components/Favorites';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
          <Route path="/asteroids" element={<ProtectedRoute><Asteroids /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
