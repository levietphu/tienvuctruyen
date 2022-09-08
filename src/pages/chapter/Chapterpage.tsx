import { useState, useContext } from "react";
import MainLayout from "../../layouts/MainLayout";
import "./chapter.scss";
import { SettingContext } from "../../context/SettingContextProvider";

const Chapterpage = () => {
  const [toggleSetting, setToggleSetting] = useState(true);
  const [bookMark, setBookMark] = useState(false);

  const { setTogglePopup }: any = useContext(SettingContext);

  return (
    <MainLayout>
      <section className="screen-80">
        <div className="header__chapter">
          <div className="name__story">
            <a href="">Điệu thấp làm hoàng đế</a>
          </div>
          <div className="info__chapter">
            <span className="number__chapter">Chương 1.</span>
            <span className="name__chapter">
              Tam hoàng tử thường thường không có gì lạ
            </span>
          </div>
          <div className="next__prev--chapter">
            <a className="next__chapter forbidden__chapter" href="">
              Chương trước
            </a>
            <a className="prev__chapter" href="">
              Chương sau
            </a>
          </div>
        </div>
        <div className="content__chapter">
          <div className="main__content">
            Điệu thấp làm hoàng đế giới thiệu vắn tắt: www.uukanshu.com Tam
            hoàng tử Lý Chính là tiếp thụ qua chủ nghĩa xã hội giáo dục người,
            cảm thấy có làm hay không hoàng đế cũng không đáng kể. Nhưng mà hắn
            chưa về nhà chồng hoàng phi tựa hồ muốn làm Nữ Đế! Các loại, nàng
            muốn làm phản! Bỗng dưng một ngày, làm Tần Minh quân muốn mưu phản
            thành công lúc, Lý Chính mang theo Vương Tiễn, Lữ Bố, Lý Quảng, Lý
            Tư, Quách Gia, Từ Thế Tích... Xuất hiện ở trước mặt nàng nói: “Hoàng
            phi, cớ gì mưu phản!” https://www.uukanshu.com Điệu thấp làm hoàng
            đế giới thiệu vắn tắt: www.uukanshu.com Tam hoàng tử Lý Chính là
            tiếp thụ qua chủ nghĩa xã hội giáo dục người, cảm thấy có làm hay
            không hoàng đế cũng không đáng kể. Nhưng mà hắn chưa về nhà chồng
            hoàng phi tựa hồ muốn làm Nữ Đế! Các loại, nàng muốn làm phản! Bỗng
            dưng một ngày, làm Tần Minh quân muốn mưu phản thành công lúc, Lý
            Chính mang theo Vương Tiễn, Lữ Bố, Lý Quảng, Lý Tư, Quách Gia, Từ
            Thế Tích... Xuất hiện ở trước mặt nàng nói: “Hoàng phi, cớ gì mưu
            phản!” https://www.uukanshu.com Điệu thấp làm hoàng đế giới thiệu
            vắn tắt: www.uukanshu.com Tam hoàng tử Lý Chính là tiếp thụ qua chủ
            nghĩa xã hội giáo dục người, cảm thấy có làm hay không hoàng đế cũng
            không đáng kể. Nhưng mà hắn chưa về nhà chồng hoàng phi tựa hồ muốn
            làm Nữ Đế! Các loại, nàng muốn làm phản! Bỗng dưng một ngày, làm Tần
            Minh quân muốn mưu phản thành công lúc, Lý Chính mang theo Vương
            Tiễn, Lữ Bố, Lý Quảng, Lý Tư, Quách Gia, Từ Thế Tích... Xuất hiện ở
            trước mặt nàng nói: “Hoàng phi, cớ gì mưu phản!”
            https://www.uukanshu.com Điệu thấp làm hoàng đế giới thiệu vắn tắt:
            www.uukanshu.com Tam hoàng tử Lý Chính là tiếp thụ qua chủ nghĩa xã
            hội giáo dục người, cảm thấy có làm hay không hoàng đế cũng không
            đáng kể. Nhưng mà hắn chưa về nhà chồng hoàng phi tựa hồ muốn làm Nữ
            Đế! Các loại, nàng muốn làm phản! Bỗng dưng một ngày, làm Tần Minh
            quân muốn mưu phản thành công lúc, Lý Chính mang theo Vương Tiễn, Lữ
            Bố, Lý Quảng, Lý Tư, Quách Gia, Từ Thế Tích... Xuất hiện ở trước mặt
            nàng nói: “Hoàng phi, cớ gì mưu phản!” https://www.uukanshu.com Điệu
            thấp làm hoàng đế giới thiệu vắn tắt: www.uukanshu.com Tam hoàng tử
            Lý Chính là tiếp thụ qua chủ nghĩa xã hội giáo dục người, cảm thấy
            có làm hay không hoàng đế cũng không đáng kể. Nhưng mà hắn chưa về
            nhà chồng hoàng phi tựa hồ muốn làm Nữ Đế! Các loại, nàng muốn làm
            phản! Bỗng dưng một ngày, làm Tần Minh quân muốn mưu phản thành công
            lúc, Lý Chính mang theo Vương Tiễn, Lữ Bố, Lý Quảng, Lý Tư, Quách
            Gia, Từ Thế Tích... Xuất hiện ở trước mặt nàng nói: “Hoàng phi, cớ
            gì mưu phản!” https://www.uukanshu.com
          </div>
        </div>
        <div className="next__prev--chapter">
          <a className="next__chapter" href="">
            Chương trước
          </a>
          <a className="prev__chapter" href="">
            Chương sau
          </a>
        </div>
      </section>
      {toggleSetting ? (
        <div className="setting__chapter">
          <div className="setting" onClick={() => setToggleSetting(false)}>
            <i className="fa-solid fa-gear"></i>
          </div>
          <div className="change__story">
            <i className="fa-solid fa-book"></i>
          </div>
          <div className="list__chapter" onClick={() => setTogglePopup(true)}>
            <i className="fa-solid fa-list"></i>
          </div>
          <div className="tick__chapter" onClick={() => setBookMark(!bookMark)}>
            {bookMark ? (
              <i className="fa-solid fa-bookmark"></i>
            ) : (
              <i className="fa-regular fa-bookmark"></i>
            )}
          </div>
          <div className="prev__chapter forbidden">
            <i className="fa-sharp fa-solid fa-arrow-left"></i>
          </div>
          <div className="next__chapter">
            <i className="fa-sharp fa-solid fa-arrow-right"></i>
          </div>
        </div>
      ) : (
        <div className="main__setting">
          <div className="setting__close">
            <i
              className="fa-solid fa-xmark"
              onClick={() => setToggleSetting(true)}
            ></i>
            <p className="center">Cài đặt</p>
          </div>
          <div className="interfce">
            <p className="name">Giao diện</p>
            <i className="fa-solid fa-lightbulb light active"></i>
            <i className="fa-solid fa-moon"></i>
            <i className="fa-solid fa-book-open"></i>
          </div>
          <div className="fontsize-container">
            <p>Cỡ chữ</p>
            <div className="fontsize__up">
              <i className="fa-solid fa-a"></i>
              <i className="fa-solid fa-arrow-up"></i>
            </div>
            <div className="fontsize__down">
              <i className="fa-solid fa-a"></i>
              <i className="fa-solid fa-arrow-down"></i>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Chapterpage;
