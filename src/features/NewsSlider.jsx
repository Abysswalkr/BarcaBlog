import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const NewsSlider = () => {
  // Configuración del slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  const images = [
    { id: 1, url: 'https://th.bing.com/th/id/OIP.ymiFb7o9DL6qcBUOJEypKAHaEK?rs=1&pid=ImgDetMain' },
    { id: 2, url: 'https://www.lapreferente.com/imagenes/equipos/20222023/6164.jpg?f=1657795316' },
    { id: 3, url: 'https://th.bing.com/th/id/R.b715f5c0e839b5cd7053aab5e19c6494?rik=Zdo%2fJ450Pb1cFQ&pid=ImgRaw&r=0' }
  ];

  return (
    <div className="container mx-auto">
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.url} alt={`Slide ${image.id}`} style={{ width: "100%", height: "auto" }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsSlider;
