import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
        <div className="flex items-center">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link to="/gallery" className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Gallery</Link>
            <Link to="/asteroids" className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Asteroids</Link>
            <Link to="/favorites" className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Favorites</Link>
            </div>
        </div>
        <div className="flex items-center">
            <button
            onClick={handleLogout}
            className="text-gray-900 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
            >
            Logout
            </button>
        </div>
        </div>
    </div>
    </nav>
  );
};

export default Navbar;
