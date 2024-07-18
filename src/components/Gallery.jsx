import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useGallery from '../hooks/useGallery';

const Gallery = () => {
  const { images, favorites, handleFavorite } = useGallery();

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
                onClick={() => handle_favorite(image.id)}
                className={`bottom-2 right-2 p-2 rounded-lg shadow-md transition duration-300 ease-in-out mt-3
                ${favorites.has(image.id) ? 'bg-red-500 hover:bg-red-700 text-white' : 'bg-blue-200 hover:bg-blue-400 text-blue-800'}`}
              >
                {favorites.has(image.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Gallery;
