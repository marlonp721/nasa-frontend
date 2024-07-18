import React from 'react';
import useFavorites from '../hooks/useFavorites'; 

const Favorites = () => {
  const { favorites, setFilter, removeFavorite } = useFavorites();

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className='flex items-center'>
        <p className='font-bold mx-2 mb-2'>Busqueda por nombre de favorito</p>  
        <input
          type="text"
          placeholder="Filtrar por detalle..."
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
          {favorites.map(fav => (
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
                  className="bottom-2 p-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out bg-red-500 hover:bg-red-700 text-white"
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
