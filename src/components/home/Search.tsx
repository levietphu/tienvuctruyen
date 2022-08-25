import { useState } from "react";
import image1 from "../../assets/quy-bi-chi-chu.jpeg";
import { useOutSide } from "../../hookCustom/useOutSide";

const Search = () => {
  const [check, setCheck] = useState(false);
  const [keyword, setKeyword] = useState("");
  const Ref = useOutSide(() => setCheck(false));

  return (
    <div className="search" ref={Ref}>
      <div
        className={`search__container ${
          check ? "search__container--active" : ""
        }`}
      >
        <div className="search__icon">
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ color: `${check ? "black" : ""}` }}
          ></i>
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Tìm kiếm truyện..."
          value={keyword}
          onChange={(e: any) => setKeyword(e.target.value)}
          onClick={() => setCheck(!check)}
        />
        {keyword && (
          <div
            className="close__icon"
            onClick={() => {
              setKeyword("");
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        )}
      </div>
      {check && (
        <div className="search__menu screen-85">
          {!keyword ? (
            <span>
              <i> Nhập từ khóa bất kỳ để tìm kiếm truyện</i>
            </span>
          ) : (
            <>
              <a href="#" className="search__menu--item">
                <div className="menu__item--image">
                  <img src={image1} alt="" />
                </div>
                <div className="name__cate">
                  <p>Quỷ bí chi chủ (Dịch)</p>
                  <div className="menu__item--cate">
                    <button className="btn">Full</button>
                    <button className="btn btn__cate">Dị giới</button>
                    <button className="btn btn__cate">Đô thị</button>
                    <button className="btn btn__cate">Huyền huyễn</button>
                  </div>
                </div>
              </a>
              <a href="#" className="search__menu--item">
                <div className="menu__item--image">
                  <img src={image1} alt="" />
                </div>
                <div className="name__cate">
                  <p>Quỷ bí chi chủ (Dịch)</p>
                  <div className="menu__item--cate">
                    <button className="btn">Full</button>
                    <button className="btn btn__cate">Dị giới</button>
                    <button className="btn btn__cate">Đô thị</button>
                    <button className="btn btn__cate">Huyền huyễn</button>
                  </div>
                </div>
              </a>
              <a href="#" className="search__menu--item">
                <div className="menu__item--image">
                  <img src={image1} alt="" />
                </div>
                <div className="name__cate">
                  <p>Quỷ bí chi chủ (Dịch)</p>
                  <div className="menu__item--cate">
                    <button className="btn">Full</button>
                    <button className="btn btn__cate">Dị giới</button>
                    <button className="btn btn__cate">Đô thị</button>
                    <button className="btn btn__cate">Huyền huyễn</button>
                  </div>
                </div>
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
