import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useRegister = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', password_confirmation: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!credentials.email || !credentials.password || credentials.password !== credentials.password_confirmation) {
      setError('Por favor, asegúrese de que todos los campos estén completos y que las contraseñas coincidan.');
      return;
    }

    try {
      const response = await axios.post('/users', { user: credentials });
      navigate('/');
    } catch (error) {
      setError('Error al intentar registrar el usuario. Por favor, intente de nuevo.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (name === 'password' || name === 'password_confirmation') {
      if (credentials.password !== credentials.password_confirmation) {
        setError('Las contraseñas no coinciden.');
      } else {
        setError('');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return {
    credentials,
    handleChange,
    handleRegister,
    error,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility
  };
};

export default useRegister;
