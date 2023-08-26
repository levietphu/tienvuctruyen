import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper";

const GalleryCarousel = ({ banners, loaderHome }: any) => {
  return (
    <>
      <div className="carousel mb-20">
        {!loaderHome ? (
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
                        alt="webtruyen"
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
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          className="mySwiper notification__slider"
        >
          <SwiperSlide className="notification__item">
            <p>
              <b>tvvinh</b> đã ủng hộ <b>100 xu</b> cho truyện{" "}
              <b>Người Đọc Sách Đại Ngụy</b>
            </p>
          </SwiperSlide>
          <SwiperSlide className="notification__item">
            <p>
              <b>tiểu nam phong</b> đã ủng hộ <b>1000 xu</b> cho truyện{" "}
              <b>Ta thiên mệnh đại phản phái nhân vật (Dịch)</b>
            </p>
          </SwiperSlide>
          <SwiperSlide className="notification__item">
            <p>
              <b>thanhhuynh132</b> đã bình luận trong truyện{" "}
              <b>Siêu Cấp Thần Cơ Nhân (Bản Dịch)</b>
            </p>
          </SwiperSlide>
          <SwiperSlide className="notification__item">
            <p>
              <b>butter1</b> đã bình luận trong truyện
              <b>Trùng Sinh Chi Kiêu Hùng Quật Khởi (Dịch)</b>
            </p>
          </SwiperSlide>
          <SwiperSlide className="notification__item">
            <p>
              <b>tvvinh</b> đã ủng hộ <b>100 xu</b> cho truyện{" "}
              <b>Người Đọc Sách Đại Ngụy</b>
            </p>
          </SwiperSlide>
          <SwiperSlide className="notification__item">
            <p>
              <b>tiểu nam phong</b> đã ủng hộ <b>1000 xu</b> cho truyện{" "}
              <b>Ta thiên mệnh đại phản phái nhân vật (Dịch)</b>
            </p>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default GalleryCarousel;
