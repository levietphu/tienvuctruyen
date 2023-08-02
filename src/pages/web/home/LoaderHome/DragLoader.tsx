import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

const DragLoader = () => {
  return (
    <div className="drag__story">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          dynamicBullets: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3.5,
            spaceBetween: 50,
          },
          1024: {
            slidesPerView: 5.3,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination]}
        className="mySwiper drag__story--slider"
      >
        <SwiperSlide className="story__slider--item">
          <div className="box2" style={{ width: "100%" }}>
            <div className="gallery-drag">
              <div className="skeleton4"></div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="story__slider--item">
          <div className="box2" style={{ width: "100%" }}>
            <div className="gallery-drag">
              <div className="skeleton4"></div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="story__slider--item">
          <div className="box2" style={{ width: "100%" }}>
            <div className="gallery-drag">
              <div className="skeleton4"></div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="story__slider--item">
          <div className="box2" style={{ width: "100%" }}>
            <div className="gallery-drag">
              <div className="skeleton4"></div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="story__slider--item">
          <div className="box2" style={{ width: "100%" }}>
            <div className="gallery-drag">
              <div className="skeleton4"></div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="story__slider--item">
          <div className="box2" style={{ width: "100%" }}>
            <div className="gallery-drag">
              <div className="skeleton4"></div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default DragLoader;
