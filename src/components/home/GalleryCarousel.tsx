import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const GalleryCarousel = ({ banners, loaderHome }: any) => {
  const [countSlider, setCountSlider] = useState(1);
  const [posChange, setPosChange] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [countNotification, setCountNotification] = useState(1);

  const Ref = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // let posX1: any;
  // let posX2: any;
  // let posInitial: any;
  // let posFinal: any;

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

  useEffect(() => {
    if (banners && carouselRef?.current) {
      setPosChange(-carouselRef.current.offsetWidth);
      setPosition(-carouselRef.current.offsetWidth);
    }
  }, [banners, carouselRef]);

  // Xử lý slider
  const checkIndex = () => {
    Ref.current?.classList.remove("active");
    if (!carouselRef?.current) return;
    if (countSlider <= 0) {
      setPosChange(4 * -carouselRef.current.offsetWidth);
      setCountSlider(4);
      setPosition(4 * -carouselRef.current.offsetWidth);
    }
    if (countSlider >= 5) {
      setPosChange(-carouselRef.current.offsetWidth);
      setPosition(-carouselRef.current.offsetWidth);
      setCountSlider(1);
    }
  };

  const handlerClick = (arg: string) => {
    Ref.current?.classList.add("active");
    if (!carouselRef?.current) return;
    if (arg === "Next") {
      setPosChange((countSlider + 1) * -carouselRef.current.offsetWidth);
      setPosition((countSlider + 1) * -carouselRef.current.offsetWidth);
      setCountSlider(countSlider + 1);
    } else {
      setPosChange((countSlider - 1) * -carouselRef.current.offsetWidth);
      setPosition((countSlider - 1) * -carouselRef.current.offsetWidth);
      setCountSlider(countSlider - 1);
    }
  };

  // const dragStart = (e: any) => {
  //   e.preventDefault();
  //   posX1 = e.clientX;
  //   posInitial = Ref.current?.offsetWidth;
  //   document.onmouseup = dragEnd;
  //   document.onmousemove = dragMove;
  // };

  // const dragMove = (e: any) => {
  //   posX2 = posX1 - e.clientX;
  //   posX1 = e.clientX;
  //   let posCurrent: any = Ref.current?.offsetWidth;
  //   setPosChange(posCurrent - posX2);
  // };

  // const dragEnd = () => {
  //   posFinal = Ref.current?.offsetWidth;
  //   if (posFinal - position < -500) {
  //     handlerClick("Next");
  //   } else if (posFinal - position > 500) {
  //     handlerClick("Prev");
  //   } else {
  //     setPosChange(position);
  //   }
  //   document.onmousemove = null;
  //   document.onmouseup = null;
  // };

  // Xử lý phần notification
  const handlerNotification = (params: string) => {
    notificationRef.current?.classList.add("active");
    if ((params = "Next")) {
      setCountNotification(countNotification + 1);
    }
  };

  const checkNotification = () => {
    notificationRef.current?.classList.remove("active");
    if (countNotification >= 5) {
      setCountNotification(1);
    }
    if (countNotification <= 0) {
      setCountNotification(4);
    }
  };

  return (
    <>
      <div className="carousel mb-20">
        {loaderHome ? (
          <div
            className={`carousel__annimation`}
            style={{
              transform: `translateX(-1780px)`,
            }}
            ref={Ref}
            // onMouseDown={dragStart}
          >
            <div className="carousel-item" ref={carouselRef}>
              <Link to={`/${banners?.[3]?.slugtruyen}`}>
                <img
                  src={
                    banners &&
                    `${process.env.REACT_APP_UPLOADS}${banners[3]?.image}`
                  }
                  alt=""
                />
              </Link>
            </div>
            {banners.map((value: any) => {
              return (
                <div className="carousel-item" key={value.id}>
                  <Link to={`/${value.slugtruyen}`}>
                    <img
                      src={`${process.env.REACT_APP_UPLOADS}${value?.image}`}
                      alt=""
                    />
                  </Link>
                </div>
              );
            })}
            <div className="carousel-item">
              <Link to={`/${banners?.[0]?.slugtruyen}`}>
                <img
                  src={`${process.env.REACT_APP_UPLOADS}${banners[0]?.image}`}
                  alt=""
                />
              </Link>
            </div>
          </div>
        ) : (
          <div className="box2" style={{ width: "100%" }}>
            <div className="gallery">
              <div className="skeleton4"></div>
            </div>
          </div>
        )}
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
