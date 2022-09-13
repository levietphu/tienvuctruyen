import { useState } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import "./personal.scss";

const PersonalPage = () => {
  const { pathname } = useLocation();

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
            <NavLink
              className={
                pathname === "/account"
                  ? "personal__item active__personal"
                  : "personal__item"
              }
              to="/account"
            >
              <i className="fa-regular fa-bookmark"></i>
              <span>tủ sách</span>
            </NavLink>
            <NavLink
              className={
                pathname === "/account/vipbuy"
                  ? "personal__item active__personal"
                  : "personal__item"
              }
              to="/account/vipbuy"
            >
              <i className="fa-sharp fa-solid fa-money-bill"></i>
              <span>truyện vip đã mua</span>
            </NavLink>
            <NavLink
              className={
                pathname === "/account/coin"
                  ? "personal__item active__personal"
                  : "personal__item"
              }
              to="/account/coin"
            >
              <i className="fa-solid fa-coins"></i>
              <span>nạp xu</span>
            </NavLink>
          </div>
        </div>
        <div className="personal__right">
          <div className="bookcase">
            <h1>
              {pathname === "/account"
                ? "Tủ sách của bạn"
                : pathname === "/account/vipbuy"
                ? "Truyện vip đã mua"
                : "Nạp xu"}
            </h1>
          </div>
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
};

export default PersonalPage;
