import { useState, useRef, useEffect } from "react";
import "./story.scss";
import MainLayout from "../../layouts/MainLayout";
import image1 from "../../assets/dtl-hoang-de.jpeg";
import Pagination from "../../components/cate/Pagination";
import chicken from "../../assets/chicken.png";
import { Link } from "react-router-dom";

const Story = () => {
  const [position, setPosition] = useState(0);
  const [checkInput, setCheckInput] = useState(false);
  const [checkComment, setCheckComment] = useState(false);
  const [checkReply, setCheckReply] = useState(false);
  const [saveRef, setSaveRef]: any = useState();

  const Ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (Ref.current) {
      setSaveRef(Ref.current);
    }
    const change = () => setPosition(-saveRef?.clientWidth);
    window.addEventListener("resize", change);
    return () => window.removeEventListener("resize", change);
  });

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
              <span className="person">
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
      <div className="main__story">
        <div className="chapter__donate">
          <div className="list__chapter__donate">
            <div
              className={`main__story--chapter center ${
                position === 0 ? "active__chapter__donate" : ""
              }`}
              onClick={() => setPosition(0)}
            >
              Ds Chương <span>975</span>
            </div>
            <div
              className={`main__story--donate center ${
                position === -saveRef?.clientWidth
                  ? "active__chapter__donate"
                  : ""
              }`}
              onClick={() => setPosition(-saveRef?.clientWidth)}
            >
              Ủng hộ
            </div>
          </div>
          <div
            className="center__chapter"
            style={{
              transform: `translateX(${position}px)`,
              maxHeight: `${
                position === -saveRef?.clientWidth ? "360px" : "100%"
              }`,
            }}
          >
            <div className="center__chapter--left">
              <div className="sort__search">
                <button>
                  <i className="fa-solid fa-arrow-up-9-1"></i>
                </button>
                <div className="search">
                  <div
                    className={`search__container ${
                      checkInput ? "search__container--active" : ""
                    }`}
                  >
                    <div className="search__icon">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input
                      className="search-input"
                      type="text"
                      placeholder="Tìm theo số chương, tên chương..."
                      onClick={() => setCheckInput(!checkInput)}
                      onBlur={() => setCheckInput(false)}
                    />
                  </div>
                </div>
              </div>
              <div className="center__chapter--list" ref={Ref}>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
                <Link
                  to="/dieu-thap-lam-hoang-de/chuong-1"
                  className="center__chapter--item"
                >
                  <p>
                    <span className="number__chapter">chương 1.</span>
                    <span className="name__chapter">
                      {" "}
                      Thế giới này có gì đó sai sai
                    </span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>1 tháng trước</span>
                  </i>
                </Link>
              </div>
              <Pagination />
            </div>
            <div className="center__chapter--right">
              <h2>Danh sách ủng hộ</h2>
              <div className="donate__story center">
                <div>
                  <div className="image__donate">
                    <img src={chicken} alt="" />
                  </div>
                  <p>
                    Hãy bấm vào nút Ủng hộ truyện ở trên để ủng hộ dịch giả nhé!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="story__comment">
          <div className="head__story__comment">
            <p>Bình luận</p>
          </div>
          <div className="comment__text">
            {/* <textarea
              name=""
              className={checkComment ? "comment__text--active" : ""}
              rows={5}
              placeholder="Hãy để lại bình luận của bạn"
              onClick={() => setCheckComment(!checkComment)}
              onBlur={() => setCheckComment(false)}
            ></textarea>
            <div className="click__comment">
              <button className="active__comment__button">Bình luận</button>
            </div> */}
            <div className="login__here">
              Hãy <a href="">Đăng nhập</a> và để lại bình luận của bạn
            </div>
          </div>
          <div className="story__comment--list">
            <div className="story__comment--item">
              <div className="comment--item">
                <p>
                  <span className="account__name">catdan05</span> •
                  <span className="time__update"> 3 tuần trước</span>
                </p>
                <p className="comment">free sao tính tuền thế ad</p>
                <a>0 trả lời</a>
              </div>
              <div className="recomment--item">
                <p>
                  <span className="account__name">catdan05</span> •
                  <span className="time__update"> 3 tuần trước</span>
                </p>
                <p className="comment">free sao tính tuền thế ad</p>
              </div>
              <div className="reply">
                <input
                  type="text"
                  className={checkReply ? "comment__text--active" : ""}
                  onClick={() => setCheckReply(!checkReply)}
                  onBlur={() => setCheckReply(false)}
                />
                <i
                  className="fa-solid fa-paper-plane"
                  style={{ opacity: "1" }}
                ></i>
                <a>trả lời</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Story;
