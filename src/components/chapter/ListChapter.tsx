import { useContext, useState, useEffect } from "react";
import { SettingContext } from "../../context/SettingContextProvider";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";

const ListChapter = () => {
  const { togglePopup }: any = useContext(SettingContext);
  const [checkSearchChapter, setCheckSearchChapter] = useState(false);
  const [dataChapter, setDataChapter] = useState<any>();
  const [loader, setLoader] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>("");
  const [orderby, setOrderby] = useState<string>("asc");

  const params = useParams();

  const callApi = async (id_user: string, page: number) => {
    await axios
      .get(
        `${process.env.REACT_APP_API}view_chapter?slug_story=${params.slugstory}&slug=${params.slugchapter}&id_user=${id_user}&page=${page}&keyword=${keyword}&orderby=${orderby}`
      )
      .then((res) => {
        setDataChapter(res.data.data.items);
        setLoader(false);
      });
  };

  useEffect(() => {
    callApi("", 1);
    setLoader(true);
  }, [params.slugchapter, params.slugstory]);

  useEffect(() => {
    callApi("", 1);
  }, [keyword]);

  useEffect(() => {
    callApi("", 1);
  }, [orderby]);

  const changePageChapter = (word: string) => {
    if (word === "next") {
      callApi("", dataChapter.allChapter.current_page + 1);
    } else {
      callApi("", dataChapter.allChapter.current_page - 1);
    }
  };

  return (
    <>
      {!loader && (
        <div
          className="popup__list__container"
          style={{
            left: `${togglePopup ? "0" : "-500"}px`,
          }}
        >
          <div className="header__list">
            <div className="list">
              <span>Danh sách chương</span>
            </div>
            <div className="sort__search">
              {orderby === "asc" ? (
                <button onClick={() => setOrderby("desc")}>
                  <i className="fa-solid fa-arrow-up-9-1"></i>
                </button>
              ) : (
                <button onClick={() => setOrderby("asc")}>
                  <i className="fa-solid fa-arrow-down-1-9"></i>
                </button>
              )}
              <div className="search">
                <div
                  className={`search__container ${
                    checkSearchChapter ? "search__chapter--active" : ""
                  }`}
                >
                  <div className="search__icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Tìm theo số chương, tên chương..."
                    onClick={() => setCheckSearchChapter(!checkSearchChapter)}
                    onBlur={() => setCheckSearchChapter(false)}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="main__list">
            {dataChapter.allChapter.data.map((item: any) => {
              return (
                <Link
                  to={`/${params.slugstory}/${item.slug}`}
                  className={`main__item ${
                    params.slugchapter === item.slug ? "active" : ""
                  }`}
                  key={item.id}
                >
                  <div className="item__name__number">
                    <span className="number">{item.chapter_number}.</span>
                    <span>
                      {" "}
                      {item.name_chapter.length > 17
                        ? item.name_chapter.slice(0, 17) + "..."
                        : item.name_chapter}
                    </span>
                  </div>
                  <i>
                    <span>Cập nhật: </span>
                    <span>
                      <Moment fromNow locale="vi">
                        {item.created_at}
                      </Moment>
                    </span>
                  </i>
                  <div className="money">5 xu</div>
                </Link>
              );
            })}
          </div>
          <div className="footer__list">
            <div className="next__prev">
              <button
                className={`footer__list--prev ${
                  dataChapter.allChapter.current_page === 1 ? "forbidden" : ""
                }`}
                onClick={() =>
                  dataChapter.allChapter.current_page > 1 &&
                  changePageChapter("prev")
                }
              >
                Trang trước
              </button>
              <button
                className={`footer__list--next ${
                  dataChapter.allChapter.current_page ===
                  dataChapter.allChapter.last_page
                    ? "forbidden"
                    : ""
                }`}
                onClick={() =>
                  dataChapter.allChapter.current_page !==
                    dataChapter.allChapter.last_page &&
                  changePageChapter("next")
                }
              >
                Trang sau
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListChapter;
