import { useState, useEffect, useRef } from "react";
import chicken from "../../assets/chicken.png";
import Moment from "react-moment";
import "moment/locale/vi";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ChapterStory = ({ story, user }: any) => {
  const [chapterStory, setChapterStory] = useState<any>();
  const [keyword, setKeyword] = useState<string>("");
  const [orderby, setOrderby] = useState<string>("asc");
  const [checkKeywordOrderby, setCheckKeywordOrderby] =
    useState<boolean>(false);
  const [position, setPosition] = useState(0);
  const [checkInput, setCheckInput] = useState(false);
  const [saveRef, setSaveRef]: any = useState();

  const Ref = useRef<HTMLDivElement>(null);

  const params = useParams();

  // pagination
  const halfTotalLinks = Math.floor(2 / 2);

  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);

  const callApiChapter = async (id_user: string, page: number) => {
    await axios
      .get(
        `${process.env.REACT_APP_API}get_chapter_story?slug=${params.slug}&page=${page}&keyword=${keyword}&orderby=${orderby}&id_user=${id_user}`
      )
      .then((res) => setChapterStory(res.data.chapter))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user) {
      callApiChapter(user.user.id, 1);
    } else {
      callApiChapter("", 1);
    }
    if (Ref.current) {
      setSaveRef(Ref.current);
    }
    const change = () => setPosition(-saveRef?.clientWidth);
    window.addEventListener("resize", change);
    return () => window.removeEventListener("resize", change);
  }, []);

  useEffect(() => {
    if (checkKeywordOrderby) {
      if (user) {
        callApiChapter(user.user.id, 1);
      } else {
        callApiChapter("", 1);
      }
    }
  }, [keyword]);

  useEffect(() => {
    if (checkKeywordOrderby) {
      if (user) {
        callApiChapter(user.user.id, 1);
      } else {
        callApiChapter("", 1);
      }
    }
  }, [orderby]);

  useEffect(() => {
    if (chapterStory) {
      setFrom(chapterStory.current_page - halfTotalLinks);
      setTo(chapterStory.current_page + halfTotalLinks);
      if (chapterStory.current_page < halfTotalLinks) {
        setTo(to + halfTotalLinks - chapterStory.current_page);
      }
      if (chapterStory.last_page - chapterStory.current_page < halfTotalLinks) {
        setFrom(
          from -
            (halfTotalLinks -
              (chapterStory.last_page - chapterStory.current_page))
        );
      }
    }
  }, [chapterStory]);

  const changePage = (e: any, word: string) => {
    if (word === "next" && chapterStory.current_page < chapterStory.last_page) {
      if (user) {
        callApiChapter(user.user.id, chapterStory.current_page + 1);
      } else {
        callApiChapter("", chapterStory.current_page + 1);
      }
      // window.scrollTo(0, 1000);
    } else if (word === "prev" && chapterStory.current_page - 1 > 0) {
      if (user) {
        callApiChapter(user.user.id, chapterStory.current_page - 1);
      } else {
        callApiChapter("", chapterStory.current_page - 1);
      }
      // window.scrollTo(0, 1000);
    } else if (word !== "next" && word !== "prev") {
      e.preventDefault();
      if (user) {
        callApiChapter(user.user.id, Number(word));
      } else {
        callApiChapter("", Number(word));
      }
      // window.scrollTo(0, 1000);
    }
  };

  return (
    <div className="chapter__donate">
      <div className="list__chapter__donate">
        <div
          className={`main__story--chapter center ${
            !position ? "active__chapter__donate" : ""
          }`}
          onClick={() => setPosition(0)}
        >
          Ds Chương <span>{story.total_chapter}</span>
        </div>
        <div
          className={`main__story--donate center ${
            position === -saveRef?.clientWidth ? "active__chapter__donate" : ""
          }`}
          onClick={() => setPosition(-saveRef?.clientWidth)}
        >
          Ủng hộ
        </div>
      </div>
      <div
        className="center__chapter"
        style={{
          transform: `translateX(${position}px)`,
          maxHeight: `${position === -saveRef?.clientWidth ? "360px" : "100%"}`,
        }}
      >
        <div className="center__chapter--left">
          <div className="sort__search">
            {orderby === "asc" ? (
              <button
                onClick={() => {
                  setOrderby("desc");
                  !checkKeywordOrderby && setCheckKeywordOrderby(true);
                }}
              >
                <i className="fa-solid fa-arrow-up-9-1"></i>
              </button>
            ) : (
              <button
                onClick={() => {
                  setOrderby("asc");
                  !checkKeywordOrderby && setCheckKeywordOrderby(true);
                }}
              >
                <i className="fa-solid fa-arrow-down-1-9"></i>
              </button>
            )}

            <div className="search">
              <div
                className={`search__container ${
                  checkInput ? "search__container--active" : ""
                }`}
              >
                <div className="search__icon">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Tìm theo số chương, tên chương..."
                  onClick={() => setCheckInput(!checkInput)}
                  onBlur={() => setCheckInput(false)}
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    !checkKeywordOrderby && setCheckKeywordOrderby(true);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="center__chapter--list" ref={Ref}>
            {chapterStory &&
              chapterStory.data.map((value: any, index: number) => {
                return (
                  <Link
                    to={`/${params.slug}/${value.slug}`}
                    className="center__chapter--item"
                    key={index}
                  >
                    <div className="center__chapter--left">
                      <p>
                        <span className="number__chapter">
                          {value.chapter_number}.
                        </span>
                        <span className="name__chapter">
                          {" "}
                          {value.name_chapter}
                        </span>
                      </p>
                      <i>
                        <span>Cập nhật: </span>
                        <span>
                          <Moment fromNow locale="vi">
                            {value.created_at}
                          </Moment>
                        </span>
                      </i>
                    </div>

                    {value.bought && (
                      <>
                        <span className="bought">
                          <i className="fa-solid fa-lock-open"></i>
                          <div className="hover__bought">
                            {value.coin} xu - đã mua
                          </div>
                        </span>
                      </>
                    )}
                    {!value.bought && value.coin > 0 && (
                      <span className="coin">{value.coin} xu </span>
                    )}
                  </Link>
                );
              })}
          </div>
          {chapterStory && chapterStory.last_page > 1 && (
            <div className={`pagination`}>
              <div className="pagination__left">
                <ul className="pagination__left--list">
                  {chapterStory.links.map((value: any, index: number) => {
                    if (
                      !value.label.includes("Next") &&
                      !value.label.includes("Prev")
                    ) {
                      if (
                        from < index + 1 &&
                        index + 1 <= to &&
                        index !== chapterStory.last_page
                      ) {
                        return (
                          <li
                            className={value.active ? "active" : ""}
                            key={index}
                            onClick={(e) =>
                              !value.active
                                ? changePage(e, value.label)
                                : e.preventDefault()
                            }
                          >
                            <a>{value.label}</a>
                          </li>
                        );
                      }
                    }
                  })}
                  {chapterStory.last_page > 2 && (
                    <li style={{ border: "none", cursor: "default" }}>
                      <a style={{ cursor: "default" }}>...</a>
                    </li>
                  )}

                  <li
                    className={
                      chapterStory.last_page === chapterStory.current_page
                        ? "active"
                        : ""
                    }
                    onClick={(e) =>
                      chapterStory.current_page !== chapterStory.last_page
                        ? changePage(e, chapterStory.last_page)
                        : e.preventDefault()
                    }
                  >
                    <a>{chapterStory && chapterStory.last_page}</a>
                  </li>
                </ul>
              </div>
              <div className="pagination__right">
                <div
                  className={`pagination__right--prev mr-10 ${
                    chapterStory.current_page === 1 ? "forbidden" : ""
                  }`}
                  onClick={(e) => changePage(e, "prev")}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </div>
                <div
                  className={`pagination__right--next ${
                    chapterStory.last_page === chapterStory.current_page
                      ? "forbidden"
                      : ""
                  }`}
                  onClick={(e) => changePage(e, "next")}
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="center__chapter--right">
          <h2>Danh sách ủng hộ</h2>
          <div className="donate__story center">
            <div>
              <div className="image__donate">
                <img src={chicken} alt="" />
              </div>
              <p>
                Hãy bấm vào nút Ủng hộ truyện ở trên để ủng hộ dịch giả nhé!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterStory;
