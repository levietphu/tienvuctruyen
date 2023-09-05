import { useState, useContext, memo, useEffect } from "react";
import "../styles/header.scss";
import { useOutSide } from "../../../../hookCustom/useOutSide";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContextProvider";
import setToken from "../../../../ultis/setToken";
import { BellFilled } from "@ant-design/icons";
import { Popover, Badge } from "antd";
import PopoverNoti from "./PopoverNoti";
import axios from "axios";

const Header = ({
  cates,
  logo,
  notifications,
  noti_count,
  getNotification,
}: any) => {
  const [toogleMenuCate, setToogleMenuCate] = useState(false);
  const [toogleMenuList, setToogleMenuList] = useState(false);
  const [toogleMenuMobile, setToogleMenuMobile] = useState(false);
  const [colorChange, setColorChange] = useState(true);
  const [toogleMenuMobileCate, setToogleMenuMobileCate] = useState(false);
  const [toogleMenuMobileList, setToogleMenuMobileList] = useState(false);
  const [tooglePersonalLogout, setTooglePersonalLogout] = useState(false);
  const [tooglePersonalLogoutMoblie, setTooglePersonalLogoutMolie] =
    useState(false);
  const [showNoti, setShowNoti] = useState(false);

  const cateRef = useOutSide(() => setToogleMenuCate(false));
  const listRef = useOutSide(() => setToogleMenuList(false));
  const cateRefMobile = useOutSide(() => setToogleMenuMobileCate(false));
  const listRefMobile = useOutSide(() => setToogleMenuMobileList(false));
  const menuRefPerLog = useOutSide(() => setTooglePersonalLogout(false));
  const PersonRef = useOutSide(() => setTooglePersonalLogoutMolie(false));

  const { user, loaderUser, setLoaderUser, setUser }: any =
    useContext(AuthContext);

  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.includes("/dashboard")) {
      setShowNoti(true);
    } else {
      setShowNoti(false);
    }
  }, [pathname]);

  const changeIsView = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}change_is_view`, {
        id_user: user.user.id,
      })
      .then((res) => getNotification());
  };

  const logout = () => {
    setToken("");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setTooglePersonalLogoutMolie(false);
    setLoaderUser("login");
    setUser(undefined);
  };

  return (
    <>
      <div className="screen-85 header">
        <div className="header__left">
          <div className="center">
            <Link className="header__left--logo" to="/">
              <img
                src={`${process.env.REACT_APP_UPLOADS}Config${logo?.value}`}
                alt="webtruyen"
              />
              <span>tiên vực</span>
            </Link>
          </div>
          <div ref={cateRef}>
            <div
              className="header__left--cate"
              onClick={() => setToogleMenuCate(!toogleMenuCate)}
            >
              <span>Thể loại</span>
              {!toogleMenuCate ? (
                <i className="fa-solid fa-angle-down"></i>
              ) : (
                <i className="fa-solid fa-angle-up"></i>
              )}
            </div>
            {toogleMenuCate && cates && (
              <ul className="menu__cate">
                {cates.map((value: any) => {
                  return (
                    <li
                      key={value?.id}
                      onClick={() => setToogleMenuCate(false)}
                    >
                      <Link to={`/the-loai/${value?.slug}`}>{value?.name}</Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div ref={listRef}>
            <div
              className="header__left--list"
              onClick={() => setToogleMenuList(!toogleMenuList)}
            >
              <span>Danh sách</span>
              {!toogleMenuList ? (
                <i className="fa-solid fa-angle-down"></i>
              ) : (
                <i className="fa-solid fa-angle-up"></i>
              )}
            </div>
            {toogleMenuList && (
              <ul className="menu__list">
                <li onClick={() => setToogleMenuList(false)}>
                  <Link to="/danh-sach/truyen-vip">bảng xếp hạng</Link>
                </li>
                <li onClick={() => setToogleMenuList(false)}>
                  <Link to="/danh-sach/truyen-mien-phi">truyện miễn phí</Link>
                </li>
                <li onClick={() => setToogleMenuList(false)}>
                  <Link to="/danh-sach/truyen-full">truyện đã hoàn</Link>
                </li>
                <li onClick={() => setToogleMenuList(false)}>
                  <Link to="/danh-sach/truyen-moi">truyện mới cập nhật</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="header__right" ref={menuRefPerLog}>
          {showNoti && (
            <div className="bell">
              <Popover
                content={
                  <PopoverNoti
                    notifications={notifications}
                    getNotification={getNotification}
                  />
                }
                trigger="click"
              >
                <Badge
                  count={notifications && noti_count}
                  overflowCount={999}
                  style={{ display: `${noti_count === 0 ? "none" : ""}` }}
                >
                  <BellFilled
                    rev={undefined}
                    style={{ fontSize: "20px", cursor: "pointer" }}
                    onClick={() => noti_count > 0 && changeIsView()}
                  />
                </Badge>
              </Popover>
            </div>
          )}
          {loaderUser === "loader" ? (
            <div className="box2" style={{ width: "100%" }}>
              <div className="gallery" style={{ height: "30px" }}>
                <div className="skeleton4" style={{ width: "200px" }}></div>
              </div>
            </div>
          ) : loaderUser === "login" ? (
            <>
              {" "}
              <Link to="/register" className="btn btn__user--register">
                đăng ký
              </Link>
              <Link to="/login" className="btn btn__user--login">
                Đăng nhập
              </Link>
            </>
          ) : (
            loaderUser === "user" && (
              <>
                <p
                  onClick={() => setTooglePersonalLogout(!tooglePersonalLogout)}
                >
                  Hi,<strong>{user.user.name}</strong>{" "}
                  <i
                    className="fa-solid fa-angle-down"
                    style={{ fontSize: "1rem" }}
                  ></i>
                </p>
                {tooglePersonalLogout && (
                  <div className="personal__logout">
                    <Link to="/account" className="person">
                      <i className="fa-solid fa-user"></i>
                      <span>Trang cá nhân</span>
                    </Link>
                    <p className="person" onClick={logout}>
                      <i className="fa-solid fa-right-from-bracket"></i>
                      <span>Đăng xuất</span>
                    </p>
                  </div>
                )}
              </>
            )
          )}
        </div>
      </div>
      <button
        className="header__right--mobile center"
        onClick={() => {
          setToogleMenuMobile(!toogleMenuMobile);
          setColorChange(true);
        }}
        style={{ background: `${colorChange ? "#e7e3e3" : "#fdfbfb"}` }}
        tabIndex={0}
        onBlur={() => setColorChange(false)}
      >
        {!toogleMenuMobile ? (
          <i className="fa-solid fa-list"></i>
        ) : (
          <i className="fa fa-times" aria-hidden="true"></i>
        )}
      </button>
      {toogleMenuMobile && (
        <div className="header__right--menu">
          <div className="screen-85">
            <div ref={cateRefMobile}>
              <div
                className="header__right--cate"
                onClick={() => setToogleMenuMobileCate(!toogleMenuMobileCate)}
              >
                <span
                  style={{ color: `${toogleMenuMobileCate ? "#357376" : ""}` }}
                >
                  thể loại
                </span>
                <i className="fa-solid fa-angle-down"></i>
              </div>
              {toogleMenuMobileCate && (
                <ul className="header__right--menucate">
                  {cates.map((value: any) => {
                    return (
                      <li key={value?.id}>
                        <Link to={`/the-loai/${value?.slug}`}>
                          {value?.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div ref={listRefMobile}>
              <div
                className="header__right--list"
                onClick={() => setToogleMenuMobileList(!toogleMenuMobileList)}
              >
                <span
                  style={{ color: `${toogleMenuMobileList ? "#357376" : ""}` }}
                >
                  danh sách
                </span>
                <i className="fa-solid fa-angle-down"></i>
              </div>
              {toogleMenuMobileList && (
                <ul className="header__right--menulist">
                  <li>
                    <Link to="/danh-sach/truyen-vip">bảng xếp hạng</Link>
                  </li>
                  <li>
                    <Link to="/danh-sach/truyen-mien-phi">truyện miễn phí</Link>
                  </li>
                  <li>
                    <Link to="/danh-sach/truyen-full">truyện đã hoàn</Link>
                  </li>
                  <li>
                    <Link to="/danh-sach/truyen-moi">truyện mới cập nhật</Link>
                  </li>
                </ul>
              )}
            </div>
            <div className="person__page" ref={PersonRef}>
              <div
                className="header__right--list"
                style={{
                  background: `${tooglePersonalLogoutMoblie ? "#eeeeee" : ""}`,
                }}
                onClick={() =>
                  setTooglePersonalLogoutMolie(!tooglePersonalLogoutMoblie)
                }
              >
                {loaderUser === "loader" ? (
                  <div className="box2" style={{ width: "100%" }}>
                    <div className="gallery" style={{ height: "30px" }}>
                      <div
                        className="skeleton4"
                        style={{ width: "200px" }}
                      ></div>
                    </div>
                  </div>
                ) : loaderUser === "login" ? (
                  <div className="mt-20 mb-20">
                    <Link to="/register" className="btn btn__user--register">
                      đăng ký
                    </Link>
                    <Link to="/login" className="btn btn__user--login">
                      Đăng nhập
                    </Link>
                  </div>
                ) : (
                  loaderUser === "user" && (
                    <>
                      <span
                        style={{
                          color: `${
                            tooglePersonalLogoutMoblie ? "#357376" : ""
                          }`,
                          textTransform: "unset",
                        }}
                      >
                        Hi, <strong>{user.user.name}</strong>
                      </span>
                      <i
                        className="fa-solid fa-angle-down"
                        style={{ fontSize: "1rem" }}
                      ></i>
                    </>
                  )
                )}
              </div>

              {tooglePersonalLogoutMoblie && (
                <div className="personal__logout">
                  <Link to="/account" className="person">
                    <i className="fa-solid fa-user"></i>
                    <span>Trang cá nhân</span>
                  </Link>
                  <div className="logout" onClick={logout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Đăng xuất</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Header);
