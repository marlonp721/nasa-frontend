import { useState, useEffect } from 'react';
import axios from 'axios';

const useAsteroids = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    totalCount: 0,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
    perPage: 10
  });

  useEffect(() => {
    fetchAsteroids();
  }, [currentPage, itemsPerPage]);

  const fetchAsteroids = async () => {
    const response = await axios.get(`/asteroids?page=${currentPage}&per_page=${itemsPerPage}`, {
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

  const checkFavorites = async (asteroidIds) => {
    const checks = asteroidIds.map(id => 
      axios.post('/find_favorite', {
        favorite: {
          favoritable_type: 'Asteroid',
          favoritable_id: id
        },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
    );

    const results = await Promise.all(checks);
    const newFavorites = new Set();
    results.forEach((result, index) => {
      if (result.data.exists) {
        newFavorites.add(asteroidIds[index]);
      }
    });
    setFavorites(newFavorites);
  };

  const handleFavorite = async (asteroidId) => {
    const isFavorite = favorites.has(asteroidId);
    const method = isFavorite ? 'delete' : 'post';
    const url = isFavorite ? `/remove_favorite` : `/favorites`;

    await axios({
      method,
      url,
      data: {
        favorite: {
          favoritable_type: 'Asteroid',
          favoritable_id: asteroidId
        },
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
  };

  return {
    asteroids,
    favorites,
    pageInfo,
    setCurrentPage,
    handleFavorite
  };
};

export default useAsteroids;
