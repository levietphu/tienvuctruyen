import React, { useEffect, useState, useRef } from "react";
import home1 from "../../assets/1.jpg";
import home2 from "../../assets/2.png";
import home3 from "../../assets/3.jpg";
import home4 from "../../assets/4.jpg";

const GalleryCarousel = () => {
  const [countSlider, setCountSlider] = useState(1);

  // const checkIndex = () => {
  //   Ref.current?.classList.remove("active");
  //   if (countSlider === 0) {
  //     setCountSlider(4);
  //   }
  //   if (countSlider === 5) {
  //     setCountSlider(1);
  //   }
  // }

  // useEffect(() => {
  //   let a: any;

  //   if (Ref) {
  //     Ref.current?.addEventListener("transitionend", checkIndex);
  //     a = setTimeout(() => {
  //       Ref.current?.classList.add("active");
  //       setCountSlider(countSlider + 1);
  //     }, 3000);
  //     return () => {
  //       Ref.current?.removeEventListener("transitionend", checkIndex);
  //       clearTimeout(a);
  //     };
  //   }
  // }, [countSlider]);

  const Ref = useRef<HTMLDivElement>(null);
  return (
    <div className="carousel">
      <div
        className={`carousel__annimation`}
        style={{ transform: `translate3d(${countSlider * -1147}px,0px,0px)` }}
        ref={Ref}
      >
        <div className="carousel-item">
          <a href="">
            <img src={home4} alt="" style={{ width: "1148px" }} />
          </a>
        </div>
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
              style={{ width: "100%", height: "383px" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GalleryCarousel;
