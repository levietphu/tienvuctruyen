import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useOutSide } from "../../../../hookCustom/useOutSide";
import axios from "axios";
import SearchLoader from "./SearchLoader";

const Search = () => {
  const [dataSearch, setDataSearch] = useState<any[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [check, setCheck] = useState(false);
  const [loaderSearch, setLoaderSearch] = useState(true);

  const Ref = useOutSide(() => setCheck(false));

  const search = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}search?keyword=${keyword}`)
      .then((res) => {
        setDataSearch(res.data.data.items);
        setLoaderSearch(false);
      });
  };

  useEffect(() => {
    if (keyword) {
      setLoaderSearch(true);
      let id = setTimeout(() => {
        search();
      }, 600);
      return () => clearTimeout(id);
    } else {
      setDataSearch([]);
    }
  }, [keyword]);

  return (
    <div className="search" ref={Ref}>
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
        <div
          className={`search__menu screen-85 ${
            dataSearch && dataSearch.length > 2 && "scroll-search"
          }`}
        >
          {!keyword ? (
            <span>
              <i> Nhập từ khóa bất kỳ để tìm kiếm truyện</i>
            </span>
          ) : (
            <>
              {!loaderSearch ? (
                dataSearch.length > 0 ? (
                  dataSearch.map((item: any, index: any) => {
                    return (
                      <Link
                        to={`/${item.slug}`}
                        className="search__menu--item"
                        key={index}
                      >
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
                            {item.theloais.map((value: any, index: any) => {
                              return (
                                <button className="btn btn__cate" key={index}>
                                  {value.name}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <span>
                    <i> Không tìm thấy truyện với từ khóa này</i>
                  </span>
                )
              ) : (
                <SearchLoader />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
