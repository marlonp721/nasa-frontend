import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Asteroids = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    totalCount: 0,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
    perPage: 10
  });

  useEffect(() => {
    const fetchAsteroids = async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/asteroids?page=${currentPage}&per_page=${itemsPerPage}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAsteroids(response.data.asteroids);
      checkFavorites(response.data.asteroids.map(asteroid => asteroid.id));
      setPageInfo({
        totalPages: response.data.meta.total_pages,
        totalCount: response.data.meta.total_count,
        currentPage: response.data.meta.current_page,
        nextPage: response.data.meta.next_page,
        prevPage: response.data.meta.prev_page,
        perPage: response.data.meta.per_page
      });
    };

    fetchAsteroids();
  }, [currentPage, itemsPerPage]);

  const checkFavorites = async (imageIds) => {
    const checks = imageIds.map(id => 
        axios.post('http://localhost:3000/api/v1/find_favorite', {
          favorite: {
            favoritable_type: 'Asteroid',
            favoritable_id: id
          }
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      );

    
    try {
      const results = await Promise.all(checks);
      const newFavorites = new Set();
      results.forEach((result, index) => {
        if (result.data.exists) {
          newFavorites.add(imageIds[index]);
        }
      });
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Failed to check favorites:', error);
    }
  };

  const handleFavorite = async (asteroidId) => {
    const isFavorite = favorites.has(asteroidId);
    const method = isFavorite ? 'delete' : 'post';
    const url = isFavorite ? `http://localhost:3000/api/v1/remove_favorite` : `http://localhost:3000/api/v1/favorites`;

    try {
      await axios({
        method,
        url,
        data: {
          favorite: {
            favoritable_type: 'Asteroid',
            favoritable_id: asteroidId
          }
        },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setFavorites(current => {
        const newFavorites = new Set(current);
        if (isFavorite) {
          newFavorites.delete(asteroidId);
        } else {
          newFavorites.add(asteroidId);
        }
        return newFavorites;
      });
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">
              Nombre de Asteroide
            </th>
            <th scope="col" className="py-3 px-6">
              Fecha de Aproximación
            </th>
            <th scope="col" className="py-3 px-6">
              Tamaño de Asteroide (km)
            </th>
            <th scope="col" className="py-3 px-6">
              Favoritos
            </th>
          </tr>
        </thead>
        <tbody>
          {asteroids.map(asteroid => (
            <tr key={asteroid.id} className="bg-white border-b">
              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                {asteroid.name}
              </td>
              <td className="py-4 px-6">
                {asteroid.approach_date}
              </td>
              <td className="py-4 px-6">
                {asteroid.size}
              </td>
              <td className="py-4 px-6">
                <button
                  onClick={() => handleFavorite(asteroid.id)}
                  className={`p-2 rounded-lg text-white ${favorites.has(asteroid.id) ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'}`}
                >
                  {favorites.has(asteroid.id) ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls flex justify-center">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="mx-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
                disabled={currentPage === 1 || !pageInfo.prevPage}>
          Anterior
        </button>
        <span className="text-gray-700 py-2">
          Página {currentPage} de {pageInfo.totalPages}
        </span>
        <button onClick={() => currentPage < pageInfo.totalPages && setCurrentPage(pageInfo.nextPage)}
                className="mx-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
                disabled={!pageInfo.nextPage}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Asteroids;
