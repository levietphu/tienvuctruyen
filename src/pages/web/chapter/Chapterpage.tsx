import { useState, useContext, useEffect } from "react";
import MainLayout from "../../../layouts/MainLayout";
import "./chapter.scss";
import { SettingContext } from "../../../context/SettingContextProvider";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import ChapterVip from "../../../components/chapter/ChapterVip";
import Loader from "../../../components/chapter/Loader";
import { AuthContext } from "../../../context/AuthContextProvider";
import ListChapter from "../../../components/chapter/ListChapter";
import Popup from "./Popup";

const Chapterpage = () => {
  const [toggleSetting, setToggleSetting] = useState<boolean>(true);
  const [bookMark, setBookMark] = useState<boolean>(false);
  const [dataChapter, setDataChapter] = useState<any>();
  const [loader, setLoader] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [orderby, setOrderby] = useState<string>("asc");
  const [checkKeywordOrderby, setCheckKeywordOrderby] =
    useState<boolean>(false);

  const { setTogglePopup, setTheme, theme, size, setSize, togglePopup }: any =
    useContext(SettingContext);
  const { user, loaderUser }: any = useContext(AuthContext);

  const params = useParams();
  const navigate = useNavigate();

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
    if (user) {
      callApi(user.user.id, 1);
      window.scrollTo(0, 0);
    } else {
      if (loaderUser !== "loader") {
        callApi("", 1);
        window.scrollTo(0, 0);
      }
    }
    setLoader(true);
    setTogglePopup(false);
    window.scrollTo(0, 0);
  }, [params.slugchapter, params.slugstory, loaderUser]);

  const changeChapter = (word: string) => {
    if (word === "prev") {
      navigate(`/${params.slugstory}/${dataChapter.slug_prev}`);
    } else {
      navigate(`/${params.slugstory}/${dataChapter.slug_next}`);
    }
  };

  useEffect(() => {
    if (error) {
      let id = setTimeout(() => {
        setError(false);
      }, 2000);

      return () => clearTimeout(id);
    }
  }, [error]);

  useEffect(() => {
    if (!loader && params.slugchapter && params.slugstory) {
      document.title =
        dataChapter.chuong.chapter_number +
        ". " +
        dataChapter.chuong.name_chapter +
        " - " +
        dataChapter.truyen.name;
    }
  }, [loader]);

  return (
    <>
      <MainLayout>
        {!loader ? (
          <>
            <span
              className="error_chapter"
              style={{ top: `${error ? "70px" : "0"}` }}
            >
              Xu của bạn không đủ. Vui lòng nạp thêm !
            </span>
            <section className="screen-80">
              <div className="header__chapter">
                <div className="name__story">
                  <Link to={`/${params.slugstory}`}>
                    {dataChapter.truyen.name}
                  </Link>
                </div>
                <div className="info__chapter">
                  <span className="number__chapter">
                    {dataChapter.chuong.chapter_number}.
                  </span>
                  <span className="name__chapter">
                    {dataChapter.chuong.name_chapter}
                  </span>
                </div>
                <div className="next__prev--chapter">
                  <span
                    className={`next__chapter ${
                      !dataChapter.slug_prev ? "forbidden__chapter" : ""
                    }`}
                    onClick={() =>
                      dataChapter.slug_prev && changeChapter("prev")
                    }
                  >
                    Chương trước
                  </span>
                  <span
                    className={`prev__chapter ${
                      !dataChapter.slug_next ? "forbidden__chapter" : ""
                    }`}
                    onClick={() =>
                      dataChapter.slug_next && changeChapter("next")
                    }
                  >
                    Chương sau
                  </span>
                </div>
              </div>
              <div className="content__chapter">
                {!dataChapter.vip ? (
                  <div
                    className="main__content"
                    style={{
                      fontSize: `${size}rem`,
                      lineHeight: `${(size * 100) / 75}rem`,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: dataChapter.chuong.content,
                    }}
                  ></div>
                ) : (
                  <ChapterVip
                    coin={dataChapter.chuong.coin}
                    setError={setError}
                    callApi={callApi}
                  />
                )}
              </div>
              <div className="next__prev--chapter">
                <span
                  className={`next__chapter ${
                    !dataChapter.slug_prev ? "forbidden__chapter" : ""
                  }`}
                  onClick={() => dataChapter.slug_prev && changeChapter("prev")}
                >
                  Chương trước
                </span>
                <span
                  className={`prev__chapter ${
                    !dataChapter.slug_next ? "forbidden__chapter" : ""
                  }`}
                  onClick={() => dataChapter.slug_next && changeChapter("next")}
                >
                  Chương sau
                </span>
              </div>
            </section>
            {toggleSetting ? (
              <div className="setting__chapter">
                <div
                  className="setting"
                  onClick={() => setToggleSetting(false)}
                >
                  <i className="fa-solid fa-gear"></i>
                </div>
                <div
                  className="change__story"
                  onClick={() => navigate(`/${params.slugstory}`)}
                >
                  <i className="fa-solid fa-book"></i>
                </div>
                <div
                  className="list__chapter"
                  onClick={() => {
                    setTogglePopup(true);
                  }}
                >
                  <i className="fa-solid fa-list"></i>
                </div>
                <div
                  className="tick__chapter"
                  onClick={() => setBookMark(!bookMark)}
                >
                  {bookMark ? (
                    <i className="fa-solid fa-bookmark"></i>
                  ) : (
                    <i className="fa-regular fa-bookmark"></i>
                  )}
                </div>
                <div
                  className={`prev__chapter ${
                    !dataChapter.slug_prev && "forbidden"
                  }`}
                  onClick={() => dataChapter.slug_prev && changeChapter("prev")}
                >
                  <i className="fa-sharp fa-solid fa-arrow-left"></i>
                </div>
                <div
                  className={`next__chapter ${
                    !dataChapter.slug_next && "forbidden"
                  }`}
                  onClick={() => dataChapter.slug_next && changeChapter("next")}
                >
                  <i className="fa-sharp fa-solid fa-arrow-right"></i>
                </div>
              </div>
            ) : (
              <div className="main__setting">
                <div className="setting__close">
                  <i
                    className="fa-solid fa-xmark"
                    onClick={() => setToggleSetting(true)}
                  ></i>
                  <p className="center">Cài đặt</p>
                </div>
                <div className="interfce">
                  <p className="name">Giao diện</p>
                  <div>
                    <i
                      className={`fa-solid fa-lightbulb light ${
                        theme === "light" ? "active__theme" : ""
                      }`}
                      onClick={() => setTheme("light")}
                      style={{ color: `${theme === "dark" ? "black" : ""}` }}
                    ></i>
                    <i
                      className={`fa-solid fa-moon ${
                        theme === "dark" ? "active__theme" : ""
                      }`}
                      onClick={() => setTheme("dark")}
                    ></i>
                    <i
                      className={`fa-solid fa-book-open ${
                        theme === "book" ? "active__theme" : ""
                      }`}
                      onClick={() => setTheme("book")}
                    ></i>
                  </div>
                </div>
                <div className="fontsize-container">
                  <p>Cỡ chữ</p>
                  <div>
                    <div
                      className="fontsize__up"
                      onClick={() => setSize(size + 0.1)}
                    >
                      <i className="fa-solid fa-a"></i>
                      <i className="fa-solid fa-arrow-up"></i>
                    </div>
                    <div
                      className="fontsize__down"
                      onClick={() => setSize(size - 0.1)}
                    >
                      <i className="fa-solid fa-a"></i>
                      <i className="fa-solid fa-arrow-down"></i>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <Loader />
        )}
      </MainLayout>
      <ListChapter
        dataChapter={dataChapter}
        keyword={keyword}
        setKeyword={setKeyword}
        orderby={orderby}
        setOrderby={setOrderby}
        callApi={callApi}
        loader={loader}
        setCheckKeywordOrderby={setCheckKeywordOrderby}
        checkKeywordOrderby={checkKeywordOrderby}
      />

      {togglePopup && <Popup />}
    </>
  );
};

export default Chapterpage;
