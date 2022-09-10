import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import "./personal.scss";

const PersonalPage = () => {
  const [isActive, setIsActive] = useState("bookcase");

  return (
    <MainLayout>
      <div className="personal">
        <div className="personal__left">
          <div className="name__person">
            <h3>tieu_nam_phong</h3>
            <p>
              <span className="coin">$</span>
              <span>0 xu</span>
            </p>
          </div>
          <div className="personal__left--list">
            <Link
              className={
                isActive === "bookcase"
                  ? "personal__item active__personal"
                  : "personal__item"
              }
              to="/account"
              onClick={() => setIsActive("bookcase")}
            >
              <i className="fa-regular fa-bookmark"></i>
              <span>tủ sách</span>
            </Link>
            <Link
              className={
                isActive === "vipbuy"
                  ? "personal__item active__personal"
                  : "personal__item"
              }
              to="/account/vipbuy"
              onClick={() => setIsActive("vipbuy")}
            >
              <i className="fa-sharp fa-solid fa-money-bill"></i>
              <span>truyện vip đã mua</span>
            </Link>
            <Link
              className="personal__item"
              to=""
              onClick={() => setIsActive("coin")}
            >
              <i className="fa-solid fa-coins"></i>
              <span>nạp xu</span>
            </Link>
          </div>
        </div>
        <div className="personal__right">
          <div className="bookcase">
            <h1>Tủ sách của bạn</h1>
          </div>
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
};

export default PersonalPage;
