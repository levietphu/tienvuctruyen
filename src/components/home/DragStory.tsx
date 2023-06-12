import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

const DragStory = ({ data }: any) => {
  const params = useParams();

  return (
    <div className="drag__story">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
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
        {data &&
          data.map((item: any) => {
            return (
              <SwiperSlide className="story__slider--item" key={item.id}>
                {item.vip === 1 && <span className="btn__vip">vip</span>}
                {item.full === 1 && <span className="btn__full">full</span>}

                <Link to={`/${item.slug}`}>
                  <div className="image__story">
                    <img
                      src={`${process.env.REACT_APP_UPLOADS}${item.image}`}
                      alt={item.name}
                    />
                  </div>
                  <div className="hover__story">
                    <p className="hover__story--name ml-10 mr-15">
                      {item.name.length > 35
                        ? item.name.slice(0, 35) + "...."
                        : item.name}
                    </p>
                    <span className="ml-10 mr-15">
                      {item.nameTheloai ? item.nameTheloai : item.theloais.name}
                    </span>
                    <p className="border-top"></p>
                    <p
                      className="ml-10 mr-15 discount__story"
                      dangerouslySetInnerHTML={{
                        __html: item.discount
                          ? item.discount
                          : "Truyện chưa có giảm giá",
                      }}
                    ></p>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default DragStory;
