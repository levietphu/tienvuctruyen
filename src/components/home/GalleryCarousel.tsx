import React, { useEffect, useState, useRef } from "react";
import home1 from "../../assets/1.jpg";
import home2 from "../../assets/2.png";
import home3 from "../../assets/3.jpg";
import home4 from "../../assets/4.jpg";

const GalleryCarousel = () => {
  const [countSlider, setCountSlider] = useState(1);
  const [posChange, setPosChange] = useState(-1147);
  const [position, setPosition] = useState(-1147);
  const [countNotification, setCountNotification] = useState(1);

  const Ref = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  let posX1: any;
  let posX2: any;
  let posInitial: any;
  let posFinal: any;

  useEffect(() => {
    let a: any;
    if (Ref) {
      a = setTimeout(() => {
        handlerClick("Next");
        handlerNotification("Next");
      }, 3000);
      Ref.current?.addEventListener("transitionend", checkIndex);
      notificationRef.current?.addEventListener(
        "transitionend",
        checkNotification
      );
      return () => {
        Ref.current?.removeEventListener("transitionend", checkIndex);
        notificationRef.current?.removeEventListener(
          "transitionend",
          checkNotification
        );
        clearTimeout(a);
      };
    }
  }, [countSlider]);

  // Xử lý slider
  const checkIndex = () => {
    Ref.current?.classList.remove("active");
    if (countSlider === 0) {
      setPosChange(4 * -1147);
      setCountSlider(4);
      setPosition(4 * -1147);
    }
    if (countSlider === 5) {
      setPosChange(-1147);
      setPosition(-1147);
      setCountSlider(1);
    }
  };

  const handlerClick = (arg: string) => {
    Ref.current?.classList.add("active");
    if (arg === "Next") {
      setPosChange((countSlider + 1) * -1147);
      setPosition((countSlider + 1) * -1147);
      setCountSlider(countSlider + 1);
    } else {
      setPosChange((countSlider - 1) * -1147);
      setPosition((countSlider - 1) * -1147);
      setCountSlider(countSlider - 1);
    }
  };

  const dragStart = (e: any) => {
    e.preventDefault();
    posX1 = e.clientX;
    posInitial = Ref.current?.offsetLeft;
    document.onmouseup = dragEnd;
    document.onmousemove = dragMove;
  };

  const dragMove = (e: any) => {
    posX2 = posX1 - e.clientX;
    posX1 = e.clientX;
    let posCurrent: any = Ref.current?.offsetLeft;
    setPosChange(posCurrent - posX2);
  };

  const dragEnd = () => {
    posFinal = Ref.current?.offsetLeft;
    if (posFinal - position < -500) {
      handlerClick("Next");
    } else if (posFinal - position > 500) {
      handlerClick("Prev");
    } else {
      setPosChange(position);
    }
    document.onmousemove = null;
    document.onmouseup = null;
  };

  // Xử lý phần notification
  const handlerNotification = (params: string) => {
    notificationRef.current?.classList.add("active");
    if ((params = "Next")) {
      setCountNotification(countNotification + 1);
    }
  };

  const checkNotification = () => {
    notificationRef.current?.classList.remove("active");
    if (countNotification === 5) {
      setCountNotification(1);
    }
    if (countNotification === 0) {
      setCountNotification(4);
    }
  };
  return (
    <>
      <div className="carousel mb-20">
        <div
          className={`carousel__annimation`}
          style={{ left: `${posChange}px` }}
          ref={Ref}
          onMouseDown={dragStart}
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
      <div className="notification mb-20">
        <div className="notification__bell">
          <i className="fa-solid fa-bell"></i>
        </div>
        <div
          className="notification__animation"
          style={{ left: `${countNotification * -3881.16}px` }}
          ref={notificationRef}
        >
          <div className="notification__item">
            <span>
              <b>tvvinh</b> đã ủng hộ <b>100 xu</b> cho truyện{" "}
              <b>Người Đọc Sách Đại Ngụy</b>
            </span>
          </div>
          <div className="notification__item">
            <span>
              <b>tiểu nam phong</b> đã ủng hộ <b>1000 xu</b> cho truyện{" "}
              <b>Ta thiên mệnh đại phản phái nhân vật (Dịch)</b>
            </span>
          </div>
          <div className="notification__item">
            <span>
              <b>thanhhuynh132</b> đã bình luận trong truyện{" "}
              <b>Siêu Cấp Thần Cơ Nhân (Bản Dịch)</b>
            </span>
          </div>
          <div className="notification__item">
            <span>
              <b>butter1</b> đã bình luận trong truyện
              <b>Trùng Sinh Chi Kiêu Hùng Quật Khởi (Dịch)</b>
            </span>
          </div>
          <div className="notification__item">
            <span>
              <b>tvvinh</b> đã ủng hộ <b>100 xu</b> cho truyện{" "}
              <b>Người Đọc Sách Đại Ngụy</b>
            </span>
          </div>
          <div className="notification__item">
            <span>
              <b>tiểu nam phong</b> đã ủng hộ <b>1000 xu</b> cho truyện{" "}
              <b>Ta thiên mệnh đại phản phái nhân vật (Dịch)</b>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryCarousel;
