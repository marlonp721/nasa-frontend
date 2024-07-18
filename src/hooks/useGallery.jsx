import { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const useGallery = () => {
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get('/images', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setImages(data);
      checkFavorites(data.map(image => image.id));
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const checkFavorites = async (asteroidIds) => {
    try {
      const checks = asteroidIds.map(id =>
        axios.post('/find_favorite', {
          favorite: {
            favoritable_type: 'Image',
            favoritable_id: id
          }
        }, {
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
    } catch (error) {
      console.error('Error checking favorites:', error);
    }
  };

  const handleFavorite = async (id) => {
    const isFavorite = favorites.has(id);
    const method = isFavorite ? 'delete' : 'post';
    const url = isFavorite ? '/remove_favorite' : '/favorites';

    try {
      await axios({
        method,
        url,
        data: {
          favorite: {
            favoritable_type: 'Image',
            favoritable_id: id
          }
        },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setFavorites(current => {
        const newFavorites = new Set(current);
        if (newFavorites.has(id)) {
          newFavorites.delete(id);
        } else {
          newFavorites.add(id);
        }
        return newFavorites;
      });
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  return { images, favorites, handleFavorite };
};

export default useGallery;
