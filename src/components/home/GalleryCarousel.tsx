import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper";

const GalleryCarousel = ({ banners, loaderHome }: any) => {
  const [countNotification, setCountNotification] = useState(1);

  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let a: any;
    a = setTimeout(() => {
      handlerNotification("Next");
    }, 3000);
    notificationRef.current?.addEventListener(
      "transitionend",
      checkNotification
    );
    return () => {
      notificationRef.current?.removeEventListener(
        "transitionend",
        checkNotification
      );
      clearTimeout(a);
    };
  }, [countNotification]);
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
          <>
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Autoplay, Pagination]}
              className="mySwiper carousel__annimation"
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
            >
              {banners.map((value: any) => {
                return (
                  <SwiperSlide className="carousel-item" key={value.id}>
                    <Link to={`/${value.slugtruyen}`} target="_">
                      <img
                        src={`${process.env.REACT_APP_UPLOADS}${value?.image}`}
                        alt=""
                      />
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </>
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
