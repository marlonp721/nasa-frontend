import React from 'react';
import useAsteroids from '../hooks/useAsteroids';

const Asteroids = () => {
  const { asteroids, favorites, pageInfo, setCurrentPage, handleFavorite } = useAsteroids();

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">Nombre de Asteroide</th>
            <th scope="col" className="py-3 px-6">Fecha de Aproximación</th>
            <th scope="col" className="py-3 px-6">Tamaño de Asteroide (km)</th>
            <th scope="col" className="py-3 px-6">Favoritos</th>
          </tr>
        </thead>
        <tbody>
          {asteroids.map(asteroid => (
            <tr key={asteroid.id} className="bg-white border-b">
              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{asteroid.name}</td>
              <td className="py-4 px-6">{asteroid.approach_date}</td>
              <td className="py-4 px-6">{asteroid.size}</td>
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
      <div className="pagination-controls flex justify-center mt-4">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={pageInfo.currentPage === 1 || !pageInfo.prevPage}>Anterior</button>
        <span className="mx-4">Página {pageInfo.currentPage} de {pageInfo.totalPages}</span>
        <button onClick={() => pageInfo.currentPage < pageInfo.totalPages && setCurrentPage(pageInfo.nextPage)} disabled={!pageInfo.nextPage}>Siguiente</button>
      </div>
    </div>
  );
};

export default Asteroids;
