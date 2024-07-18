import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/favorites', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      await Promise.all(data.map(async (fav) => {
        if (fav.favoritable_type === "Image") {
          const imageData = await axios.get(`http://localhost:3000/api/v1/images/${fav.favoritable_id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          fav.details = imageData.data.title;
        } else if (fav.favoritable_type === "Asteroid") {
          const asteroidData = await axios.get(`http://localhost:3000/api/v1/asteroids/${fav.favoritable_id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          fav.details = asteroidData.data.name;
        }
        return fav;
      })).then(setFavorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const removeFavorite = async (favoriteId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/favorites/${favoriteId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFavorites(currentFavorites => currentFavorites.filter(fav => fav.id !== favoriteId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className='flex items-center'>
      <p className='font-bold mx-2 mb-2'>Busqueda por nombre de favorito</p>  
      <input
        type="text"
        placeholder="Filtrar por detalle..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 mt-2 p-2 border rounded"
      />
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">
              Id de Favorito
            </th>
            <th scope="col" className="py-3 px-6">
              Tipo de Favorito
            </th>
            <th scope="col" className="py-3 px-6">
              Detalle del Favorito
            </th>
            <th scope="col" className="py-3 px-6">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {favorites.filter(fav => fav.details.toLowerCase().includes(filter.toLowerCase())).map(fav => (
            <tr key={fav.id} className="bg-white border-b">
              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                {fav.id}
              </td>
              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                {fav.favoritable_type}
              </td>
              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                {fav.details}
              </td>
              <td className="py-4 px-6">
                <button
                  onClick={() => removeFavorite(fav.id)}
                  className="bottom-2 p-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out
                  bg-red-500 hover:bg-red-700 text-white"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Favorites;

