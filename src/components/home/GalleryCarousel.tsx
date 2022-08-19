import React, { useEffect, useRef, useState } from "react";
import home1 from "../../assets/1.jpg";
import home2 from "../../assets/2.png";
import home3 from "../../assets/3.jpg";
import home4 from "../../assets/4.jpg";

const GalleryCarousel = () => {
  const [countSlider, setCountSlider] = useState(0);

  useEffect(() => {
    let a: any;
    if (countSlider === 4) {
      a = setTimeout(() => {
        setCountSlider(0);
      }, 1000);
    } else {
      a = setTimeout(() => {
        setCountSlider(countSlider + 1);
      }, 3000);
    }
  }, [countSlider]);

  const hanlderMouse = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {};

  return (
    <div className="carousel" onMouseDown={hanlderMouse}>
      <div
        className={countSlider === 0 ? "" : "carousel__annimation"}
        style={{ transform: `translate3d(${countSlider * -1147}px,0px,0px)` }}
      >
        <div className="carousel-item">
          <a href="">
            <img
              className={countSlider === 0 ? "img__active" : ""}
              src={home1}
              alt=""
            />
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
            <img src={home4} alt="" style={{ width: "1148px" }} />
          </a>
        </div>
        <div className="carousel-item">
          <a href="">
            <img
              src={home1}
              alt=""
              style={{ width: "100%", height: "382px" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GalleryCarousel;
