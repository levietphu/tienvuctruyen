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
  //   let a= setTimeout(() => {
  //     countSlider === 3 ? setCountSlider(0) : setCountSlider(countSlider + 1);
  //   }, 3000);
  // return () => clearTimeout(a)
  // }, [countSlider]);

  const hanlderMouse = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {};

  return (
    <div className="carousel" onMouseDown={hanlderMouse}>
      <div
        className="carousel__annimation"
        style={{ transform: `translate3d(${countSlider * check}px,0px,0px)` }}
      >
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
        <div className="carousel-item">
          <a href="">
            <img src={home1} alt="" />
          </a>
        </div>
      </div>
      <div
        style={{ position: "absolute", top: "180px", right: "43px" }}
        onClick={() => {
          countSlider === 3
            ? setCountSlider(0)
            : setCountSlider((prev) => prev + 1);
        }}
      >
        <h1>Next</h1>
      </div>
      <div
        style={{ position: "absolute", top: "180px", left: "43px" }}
        onClick={() => {
          countSlider === 0
            ? setCountSlider(3)
            : setCountSlider((prev) => prev - 1);
        }}
      >
        <h1>Prev</h1>
      </div>
    </div>
  );
};

export default GalleryCarousel;
