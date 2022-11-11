import { Outlet, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import MainLayout from "../../layouts/MainLayout";
import "./personal.scss";
import { useContext } from "react";

const PersonalPage = () => {
  const { pathname } = useLocation();
  const { user }: any = useContext(AuthContext);

  return (
    <MainLayout>
      {user && (
        <div className="personal">
          <div className="personal__left">
            <div className="name__person">
              <h3>{user.user.name}</h3>
              <p style={{ marginTop: "10px" }}>
                <span className="coin">$</span>
                <span>{user.user.coin} xu</span>
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
      )}
    </MainLayout>
  );
};

export default PersonalPage;
