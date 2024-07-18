import React from 'react';
import useRegister from '../hooks/useRegister';

const Register = () => {
  const {
    credentials,
    handleChange,
    handleRegister,
    error,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility
  } = useRegister();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-xs">
        <form onSubmit={handleRegister} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" autoComplete="off">
          <div className="mb-4">
            <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-6">Registrar</h2>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={credentials.email} onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email" />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input type={showPassword ? "text" : "password"} name="password" id="password" value={credentials.password} onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="******************" />
            <button type="button" onClick={togglePasswordVisibility} className="absolute top-4 inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password_confirmation">Confirmar Password</label>
            <input type={showConfirmPassword ? "text" : "password"} name="password_confirmation" id="password_confirmation" value={credentials.password_confirmation} onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="******************" />
            <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute top-4 inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
