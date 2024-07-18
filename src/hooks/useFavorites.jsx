import { useState, useEffect } from 'react';
import axios from 'axios';

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const { data } = await axios.get('/favorites', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const favoritesWithDetails = await Promise.all(data.map(async (fav) => {
        if (fav.favoritable_type === "Image") {
          const imageData = await axios.get(`/images/${fav.favoritable_id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          fav.details = imageData.data.title;
        } else if (fav.favoritable_type === "Asteroid") {
          const asteroidData = await axios.get(`/asteroids/${fav.favoritable_id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          fav.details = asteroidData.data.name;
        }
        return fav;
      }));
      setFavorites(favoritesWithDetails);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const removeFavorite = async (favoriteId) => {
    try {
      await axios.delete(`/favorites/${favoriteId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFavorites(current => current.filter(fav => fav.id !== favoriteId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const filteredFavorites = favorites.filter(fav => fav.details.toLowerCase().includes(filter.toLowerCase()));

  return {
    favorites: filteredFavorites,
    setFilter,
    removeFavorite
  };
};

export default useFavorites;
