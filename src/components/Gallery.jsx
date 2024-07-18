import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await axios.get('http://localhost:3000/api/v1/images', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setImages(data);
      checkFavorites(data.map(image => image.id));
    };

    fetchImages();
  }, []);

  const checkFavorites = async (imageIds) => {
    const checks = imageIds.map(id => 
        axios.post('http://localhost:3000/api/v1/find_favorite', {
          favorite: {
            favoritable_type: 'Image',
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

  const handleFavorite = async (id) => {
    const isFavorite = favorites.has(id);
    const method = isFavorite ? 'delete' : 'post';
    const url = isFavorite ? 'http://localhost:3000/api/v1/remove_favorite' : 'http://localhost:3000/api/v1/favorites';

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <Slider {...settings}>
      {images.map(image => (
        <div key={image.id} className="flex justify-center items-center h-full w-full">
          <div className="flex flex-col items-center justify-center h-full w-full p-4">
            <img src={image.url} alt={image.title} className="max-h-[45vh] w-auto object-contain"/>
            <div className="text-center mt-2">
              <h3 className="text-lg font-bold">{image.title}</h3>
              <p className="text-sm">{image.description}</p>
            <button
              onClick={() => handleFavorite(image.id)}
              className={`bottom-2 right-2 p-2 rounded-lg shadow-md transition duration-300 ease-in-out mt-3
              ${favorites.has(image.id) ? 'bg-red-500 hover:bg-red-700 text-white' : 'bg-blue-200 hover:bg-blue-400 text-blue-800'}`}
            >
              {favorites.has(image.id) ? 'Quitar de favoritos' : 'Añadir a favoritos' }
            </button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Gallery;