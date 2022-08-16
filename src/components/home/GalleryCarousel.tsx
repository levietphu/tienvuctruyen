import React from "react";
import home1 from "../../assets/1.jpg";
import home2 from "../../assets/2.png";
import home3 from "../../assets/3.jpg";
import home4 from "../../assets/4.jpg";

const GalleryCarousel = () => {
  return (
    <div className="carousel">
      <div className="carousel-item">
        <a href="">
          <img src={home1} alt="" />
        </a>
      </div>
      <div className="carousel-item">
        <a href="">
          <img src={home2} alt="" />
        </a>
      </div>
      <div className="carousel-item">
        <a href="">
          <img src={home3} alt="" />
        </a>
      </div>
      <div className="carousel-item">
        <a href="">
          <img src={home4} alt="" />
        </a>
      </div>
    </div>
  );
};

export default GalleryCarousel;
