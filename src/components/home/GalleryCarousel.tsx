import React, { useEffect, useState } from "react";
import { isBuffer } from "util";
import home1 from "../../assets/1.jpg";
import home2 from "../../assets/2.png";
import home3 from "../../assets/3.jpg";
import home4 from "../../assets/4.jpg";

const GalleryCarousel = () => {
  const [countSlider, setCountSlider] = useState(0);
  const [check, setCheck] = useState(-1200);

  // useEffect(() => {
  //   setTimeout(() => {
  //     countSlider === 3 ? setCountSlider(0) : setCountSlider(countSlider + 1);
  //   }, 3000);
  // }, [countSlider]);

  const hanlderMouse = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (e.key === 1) {
    }
  };

  return (
    <div className="carousel" onMouseDown={hanlderMouse}>
      <div
        className="carousel-item"
        style={{ transform: `translateX(${countSlider * check}px)` }}
      >
        <a href="">
          <img src={home1} alt="" />
        </a>
      </div>
      <div
        className="carousel-item"
        style={{ transform: `translateX(${countSlider * check}px)` }}
      >
        <a href="">
          <img src={home2} alt="" />
        </a>
      </div>
      <div
        className="carousel-item"
        style={{ transform: `translateX(${countSlider * check}px)` }}
      >
        <a href="">
          <img src={home3} alt="" />
        </a>
      </div>
      <div
        className="carousel-item"
        style={{ transform: `translateX(${countSlider * check}px)` }}
      >
        <a href="">
          <img src={home4} alt="" />
        </a>
      </div>
    </div>
  );
};

export default GalleryCarousel;
