import React from 'react';
import useLogin from '../hooks/useLogin';
import { Link } from 'react-router-dom';

const Login = () => {
  const { handleChange, handleSubmit, credentials, error } = useLogin();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
              <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-6">Influgo</h2>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email*</label>
              <input
                type="email"
                name="email"
                id="email"
                value={credentials.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
              />
          </div>
          <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password*</label>
              <input
                type="password"
                name="password"
                id="password"
                value={credentials.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="******************"
              />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
          </div>
            <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 flex justify-center mt-2">
                ¿No tienes cuenta? Regístrate
            </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
