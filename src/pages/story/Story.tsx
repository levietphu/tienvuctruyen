import React from "react";
import "./story.scss";
import MainLayout from "../../layouts/MainLayout";
import image1 from "../../assets/dtl-hoang-de.jpeg";

const Story = () => {
  return (
    <MainLayout>
      <div className="header__story">
        <div className="header__story--left">
          <div className="header__story--image">
            <img src={image1} alt="" />
          </div>
        </div>
        <div className="header__story--right">
          <div className="cate__story header__story--cate">
            <a className="cate__story" href="">
              hài hước
            </a>
            <a className="cate__story" href="">
              lịch sử
            </a>
            <a className="cate__story" href="">
              quân sự
            </a>
            <a className="cate__story" href="">
              tiên hiệp
            </a>
          </div>

          <h1 className="header__story--name">điệu thấp làm hoàng đế</h1>
          <p className="header__story--author">
            <span>tác giả: </span> <span>Tùy ngộ giả</span>
          </p>
          <p className="header__story--translator">
            <span>dịch giả: </span>{" "}
            <a href="">
              <span>
                <i className="fa-solid fa-person"></i>
              </span>{" "}
              <span>mrtriman555</span>
            </a>
          </p>
          <div className="header__story--view">
            <span className="boder-right">Lượt xem</span>
            <span className="bg-blue boder-left">26368</span>
          </div>
          <p className="header__story--tag">
            <span>#HàiHước </span>
            <span>#VôSỉ </span>
            <span>#VươngTriềuTranhBá</span>
          </p>
          <div className="header__story--discount">
            <div>
              <p>Mua 300c trở lên giảm giá 15% </p>
              <p>Mua 600c trở lên giảm giá 20%</p>
            </div>
          </div>
          <div className="header__story--introduce">
            Giới thiệu đến các bạn một bộ truyện xuất sắc của Tùy Ngộ Giả, free
            99c đầu, mn đọc trải nghiệm nhé! Văn án: Tam hoàng tử Lý Chính là
            người tiếp thụ qua chủ nghĩa xã hội giáo dục, cảm thấy có làm hoàng
            đế hay không cũng không đáng kể. Nhưng hoàng phi chưa về nhà chồng
            của hắn tựa hồ muốn làm Nữ Đế! Chờ một chút, nàng muốn làm phản… Một
            ngày nào đó, khi Tần Lâm Quân muốn làm phản thành công, Lý Chính
            mang theo Vương Tiễn, Lữ Bố, Lý Quảng, Lý Tư, Quách Gia, Từ Thế
            Tích... Xuất hiện ở trước mặt nàng nói ra: "Hoàng phi, cớ gì mưu
            phản!"
          </div>
          <div className="header__stoty--read">
            <button className="bg-primary">Đọc từ đầu</button>
            <button className="bg-blue">
              Ủng hộ truyện
              <i className="fa-solid fa-circle-dollar-to-slot"></i>
            </button>
            <button className="bg-vip">Mua chương vip</button>
          </div>
        </div>
      </div>
      <div className="main__story"></div>
    </MainLayout>
  );
};

export default Story;
