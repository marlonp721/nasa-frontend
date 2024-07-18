import { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!credentials.email || !credentials.password) {
      setError('Por favor, complete ambos campos.');
      return;
    }

    try {
      const response = await axios.post('/users/sign_in', { user: credentials });
      localStorage.setItem('token', response.data.token);
      navigate('/gallery');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Correo y/o contraseña incorrectos.');
      } else {
        setError('Error al intentar conectar con el servidor.');
      }
    }
  };

  return {
    handleChange,
    handleSubmit,
    credentials,
    error
  };
};

export default useLogin;
