import { Outlet, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContextProvider";
import MainLayout from "../../layout/view/MainLayout";
import "../styles/personal.scss";
import { useContext, useEffect } from "react";
import coinImage from "../../../../assets/coin.svg";
import PopupPayment from "../components/popup/PopupPayment";

const PersonalPage = () => {
  const { pathname } = useLocation();
  const { user, getUser, loaderUser, setCheckLogin, popupPayment }: any =
    useContext(AuthContext);

  useEffect(() => {
    if (loaderUser === "user") {
      getUser();
    }
    setCheckLogin(true);
    document.title = "Truyện dịch online - Đọc truyện dịch mới nhất | Tiên Vực";
  }, []);

  return (
    <>
      <MainLayout>
        {user && (
          <div className="personal">
            <div className="personal__left">
              <div className="name__person">
                <h3>{user.user.name}</h3>
                <div style={{ marginTop: "10px" }}>
                  <div className="image__coin">
                    <div>
                      <img src={coinImage} alt="webtruyen" />
                    </div>
                    <span>{user.user.coin} xu</span>
                  </div>
                </div>
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
      {popupPayment && <PopupPayment />}
    </>
  );
};

export default PersonalPage;
