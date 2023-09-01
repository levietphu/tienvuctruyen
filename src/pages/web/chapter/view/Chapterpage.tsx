import { useState, useContext, useEffect } from "react";
import MainLayout from "../../layout/view/MainLayout";
import "../styles/chapter.scss";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import ChapterVip from "../components/ChapterVip";
import Loader from "../components/Loader";
import { AuthContext } from "../../../../context/AuthContextProvider";
import ListChapter from "../components/ListChapter";
import Popup from "../components/Popup";
import { Alert } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../store/hookStore";
import {
  changeTheme,
  changeSize,
  isTogglePopup,
} from "../../../../store/common/commonSlice";

const Chapterpage = () => {
  const [toggleSetting, setToggleSetting] = useState<boolean>(true);
  const [bookMark, setBookMark] = useState<boolean>(false);
  const [dataChapter, setDataChapter] = useState<any>();
  const [loader, setLoader] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [alertBookMark, setAlertBookMark] = useState<string>("");
  const [checkSuccess, setCheckSuccess] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const { setting } = useAppSelector((state) => state.common);

  const { user, loaderUser }: any = useContext(AuthContext);

  const params = useParams();

  const callApi = async (id_user: string) => {
    await axios
      .get(
        `${process.env.REACT_APP_API}view_chapter?slug_story=${params.slugstory}&slug=${params.slugchapter}&id_user=${id_user}`
      )
      .then((res) => {
        setDataChapter(res.data.data.items);
        setLoader(false);
      });
  };

  const callAddBookMark = async () => {
    await axios
      .post(`${process.env.REACT_APP_API}add_bookmark`, {
        slug_story: params.slugstory,
        slug: params.slugchapter,
        id_user: user ? user.user.id : "",
      })
      .then((res) => {
        setAlertBookMark(res.data.message);
        if (res.data.status === 400) {
          setCheckSuccess(false);
        } else {
          setCheckSuccess(true);
        }
      });
  };

  useEffect(() => {
    if (user) {
      callApi(user.user.id);
    } else {
      if (loaderUser !== "loader") {
        callApi("");
      }
    }
    setLoader(true);
    window.scrollTo(0, 0);
    return () => setBookMark(false);
  }, [params.slugchapter, params.slugstory, loaderUser]);

  useEffect(() => {
    if (error) {
      let id = setTimeout(() => {
        setError("");
      }, 3000);

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

  useEffect(() => {
    if (bookMark) {
      callAddBookMark();
    }
  }, [bookMark]);

  useEffect(() => {
    if (alertBookMark) {
      let id = setTimeout(() => {
        setAlertBookMark("");
      }, 3000);
      return () => clearTimeout(id);
    }
  }, [alertBookMark]);

  return (
    <>
      <MainLayout>
        <Alert
          className="error_chapter"
          message={error}
          type="error"
          showIcon
          style={{
            top: `${error ? "15%" : "-100px"}`,
            transition: `${error ? "0.8s" : "unset"}`,
          }}
        />
        <Alert
          className="error_chapter"
          message={alertBookMark}
          type={checkSuccess ? "success" : "error"}
          style={{
            top: `${alertBookMark ? "15%" : "-100px"}`,
            transition: `${alertBookMark ? "0.8s" : "unset"}`,
          }}
        />
        {!loader ? (
          <>
            <section className="screen-80">
              <div className="header__chapter">
                <div className="name__story">
                  <Link to={`/${params.slugstory}`}>
                    {dataChapter.truyen.name}
                  </Link>
                </div>
                <div className="info__chapter">
                  <span className="number__chapter">
                    {dataChapter.chuong.chapter_number}.{" "}
                  </span>
                  <span className="name__chapter">
                    {dataChapter.chuong.name_chapter}
                  </span>
                </div>
                <div className="next__prev--chapter">
                  {!dataChapter.slug_prev ? (
                    <span className="next__chapter forbidden__chapter">
                      Chương trước
                    </span>
                  ) : (
                    <Link
                      to={`/${params.slugstory}/${dataChapter.slug_prev}`}
                      className={`next__chapter`}
                    >
                      Chương trước
                    </Link>
                  )}

                  {!dataChapter.slug_next ? (
                    <span className="next__chapter forbidden__chapter">
                      Chương sau
                    </span>
                  ) : (
                    <Link
                      to={`/${params.slugstory}/${dataChapter.slug_next}`}
                      className={`next__chapter`}
                    >
                      Chương sau
                    </Link>
                  )}
                </div>
              </div>
              <div className="content__chapter">
                {!dataChapter.vip ? (
                  <div
                    className="main__content"
                    style={{
                      fontSize: `${setting.size}rem`,
                      lineHeight: `${(setting.size * 100) / 75}rem`,
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
                {!dataChapter.slug_prev ? (
                  <span className="next__chapter forbidden__chapter">
                    Chương trước
                  </span>
                ) : (
                  <Link
                    to={`/${params.slugstory}/${dataChapter.slug_prev}`}
                    className={`next__chapter`}
                  >
                    Chương trước
                  </Link>
                )}
                {!dataChapter.slug_next ? (
                  <span className="next__chapter forbidden__chapter">
                    Chương sau
                  </span>
                ) : (
                  <Link
                    to={`/${params.slugstory}/${dataChapter.slug_next}`}
                    className={`next__chapter`}
                  >
                    Chương sau
                  </Link>
                )}
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
                <Link
                  to={`/${params.slugstory}`}
                  className="change__story center"
                  style={{
                    color: `${
                      setting.theme === "light" || setting.theme === "book"
                        ? "black"
                        : "white"
                    }`,
                  }}
                >
                  <i className="fa-solid fa-book"></i>
                </Link>
                <div
                  className="list__chapter"
                  onClick={() => {
                    dispatch(isTogglePopup(true));
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
                {!dataChapter.slug_prev ? (
                  <div className="next__chapter forbidden center">
                    <i className="fa-sharp fa-solid fa-arrow-left"></i>
                  </div>
                ) : (
                  <Link
                    style={{
                      color: `${
                        setting.theme === "light" || setting.theme === "book"
                          ? "black"
                          : "white"
                      }`,
                    }}
                    to={`/${params.slugstory}/${dataChapter.slug_prev}`}
                    className={`prev__chapter center`}
                  >
                    <i className="fa-sharp fa-solid fa-arrow-left"></i>
                  </Link>
                )}
                {!dataChapter.slug_next ? (
                  <div className="next__chapter forbidden center">
                    <i className="fa-sharp fa-solid fa-arrow-right"></i>
                  </div>
                ) : (
                  <Link
                    style={{
                      color: `${
                        setting.theme === "light" || setting.theme === "book"
                          ? "black"
                          : "white"
                      }`,
                    }}
                    to={`/${params.slugstory}/${dataChapter.slug_next}`}
                    className={`next__chapter center`}
                  >
                    <i className="fa-sharp fa-solid fa-arrow-right"></i>
                  </Link>
                )}
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
                        setting.theme === "light" ? "active__theme" : ""
                      }`}
                      onClick={() => dispatch(changeTheme("light"))}
                      style={{
                        color: `${setting.theme === "dark" ? "black" : ""}`,
                      }}
                    ></i>
                    <i
                      className={`fa-solid fa-moon ${
                        setting.theme === "dark" ? "active__theme" : ""
                      }`}
                      onClick={() => dispatch(changeTheme("dark"))}
                    ></i>
                    <i
                      className={`fa-solid fa-book-open ${
                        setting.theme === "book" ? "active__theme" : ""
                      }`}
                      onClick={() => dispatch(changeTheme("book"))}
                    ></i>
                  </div>
                </div>
                <div className="fontsize-container">
                  <p>Cỡ chữ</p>
                  <div>
                    <div
                      className="fontsize__up"
                      onClick={() => dispatch(changeSize(true))}
                    >
                      <i className="fa-solid fa-a"></i>
                      <i className="fa-solid fa-arrow-up"></i>
                    </div>
                    <div
                      className="fontsize__down"
                      onClick={() => dispatch(changeSize(false))}
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
      <ListChapter />

      {setting.togglePopup && <Popup />}
    </>
  );
};

export default Chapterpage;
