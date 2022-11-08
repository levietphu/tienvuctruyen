import { useState, useContext } from "react";
import { HomeContext } from "../../context/HomeContextProvider";

const Search = () => {
  const [check, setCheck] = useState(false);
  const { keyword, setKeyword, dataSearch }: any = useContext(HomeContext);

  return (
    <div className="search">
      <div
        className={`search__container ${
          check ? "search__container--active" : ""
        }`}
      >
        <div className="search__icon" onClick={() => setCheck(!check)}>
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
          onBlur={() => setCheck(false)}
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
              {dataSearch &&
                dataSearch.map((item: any) => {
                  return (
                    <a href="#" className="search__menu--item" key={item.id}>
                      <div className="menu__item--image">
                        <img
                          src={`${process.env.REACT_APP_UPLOADS}${item.image}`}
                          alt={item.name}
                        />
                      </div>
                      <div className="name__cate">
                        <p>{item.name}</p>
                        <div className="menu__item--cate">
                          {item.full === 1 && (
                            <button className="btn">Full</button>
                          )}
                          {item.theloais.map((value: any) => {
                            return (
                              <button className="btn btn__cate">
                                {value.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </a>
                  );
                })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
