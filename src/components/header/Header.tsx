import { useState } from "react";
import "./header.scss";
import logo from "../../assets/android-chrome-192x192.png";
import { useOutSide } from "../../hookCustom/useOutSide";
import { Link } from "react-router-dom";

const Header = () => {
  const [toogleMenuCate, setToogleMenuCate] = useState(false);
  const [toogleMenuList, setToogleMenuList] = useState(false);
  const [toogleMenuMobile, setToogleMenuMobile] = useState(false);
  const [colorChange, setColorChange] = useState(true);
  const [toogleMenuMobileCate, setToogleMenuMobileCate] = useState(false);
  const [toogleMenuMobileList, setToogleMenuMobileList] = useState(false);
  const [tooglePersonalLogout, setTooglePersonalLogout] = useState(false);
  const [tooglePersonalLogoutMoblie, setTooglePersonalLogoutMolie] =
    useState(false);

  const cateRef = useOutSide(() => setToogleMenuCate(false));
  const listRef = useOutSide(() => setToogleMenuList(false));
  const cateRefMobile = useOutSide(() => setToogleMenuMobileCate(false));
  const listRefMobile = useOutSide(() => setToogleMenuMobileList(false));
  const menuRefPerLog = useOutSide(() => setTooglePersonalLogout(false));
  const PersonRef = useOutSide(() => setTooglePersonalLogoutMolie(false));
  return (
    <>
      <div className="screen-85 header">
        <div className="header__left">
          <div className="center">
            <Link className="header__left--logo" to="/">
              <img src={logo} alt="" />
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
            {toogleMenuCate && (
              <ul className="menu__cate">
                <li>
                  <Link to="/the-loai/tien-hiep">tiên hiệp</Link>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
                <li>
                  <a href="">tiên hiệp</a>
                </li>
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
                <li>
                  <a href="">bảng xếp hạng</a>
                </li>
                <li>
                  <a href="">truyện miễn phí</a>
                </li>
                <li>
                  <a href="">truyện đã hoàn</a>
                </li>
                <li>
                  <a href="">truyện mới cập nhật</a>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="header__right" ref={menuRefPerLog}>
          {/* <a href="/register" className="btn btn__user--register">đăng ký</a>
          <a href=/login" className="btn btn__user--login">Đăng nhập</a> */}
          <p onClick={() => setTooglePersonalLogout(!tooglePersonalLogout)}>
            Hi,<strong>Tên account</strong>{" "}
            <i className="fa-solid fa-angle-down"></i>
          </p>
          {tooglePersonalLogout && (
            <div className="personal__logout">
              <Link to="/account" className="person">
                <i className="fa-solid fa-user"></i>
                <span>Trang cá nhân</span>
              </Link>
              <Link to="/logout" className="logout">
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Đăng xuất</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <a
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
      </a>
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
                  <li>
                    <Link to="/the-loai/tien-hiep">tiên hiệp</Link>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
                  <li>
                    <a href="">tiên hiệp</a>
                  </li>
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
                    <a href="">bảng xếp hạng</a>
                  </li>
                  <li>
                    <a href="">truyện miễn phí</a>
                  </li>
                  <li>
                    <a href="">truyện đã hoàn</a>
                  </li>
                  <li>
                    <a href="">truyện mới cập nhật</a>
                  </li>
                </ul>
              )}
            </div>
            <div className="person__page" ref={PersonRef}>
              <div
                className="header__right--list"
                onClick={() =>
                  setTooglePersonalLogoutMolie(!tooglePersonalLogoutMoblie)
                }
              >
                <span
                  style={{
                    color: `${tooglePersonalLogoutMoblie ? "#357376" : ""}`,
                  }}
                >
                  Hi, <strong>tieu_nam_phong</strong>
                </span>
                <i className="fa-solid fa-angle-down"></i>
              </div>
              {tooglePersonalLogoutMoblie && (
                <div className="personal__logout">
                  <Link to="/account" className="person">
                    <i className="fa-solid fa-user"></i>
                    <span>Trang cá nhân</span>
                  </Link>
                  <Link to="/logout" className="logout">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Đăng xuất</span>
                  </Link>
                </div>
              )}
            </div>

            {/* <div className="mt-20 mb-20">
              <a href="" className="btn btn__user--register">
                đăng ký
              </a>
              <a href="" className="btn btn__user--login">
                Đăng nhập
              </a>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
