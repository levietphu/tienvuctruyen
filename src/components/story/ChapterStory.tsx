import React, { useState, useEffect, useRef } from "react";
import chicken from "../../assets/chicken.png";
import Moment from "react-moment";
import "moment/locale/vi";
import { Link, useParams } from "react-router-dom";

const ChapterStory = ({
  story,
  callApi,
  setKeyword,
  keyword,
  orderby,
  setOrderby,
  user,
}: any) => {
  const [position, setPosition] = useState(0);
  const [checkInput, setCheckInput] = useState(false);
  const [saveRef, setSaveRef]: any = useState();

  const Ref = useRef<HTMLDivElement>(null);

  const params = useParams();

  // pagination
  const [halfTotalLinks, setHalfTotalLinks] = useState<number>(
    Math.floor(2 / 2)
  );
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);
  console.log(story);
  useEffect(() => {
    if (Ref.current) {
      setSaveRef(Ref.current);
    }
    const change = () => setPosition(-saveRef?.clientWidth);
    window.addEventListener("resize", change);
    return () => window.removeEventListener("resize", change);
  });

  useEffect(() => {
    if (story) {
      setFrom(story.chuongs.current_page - halfTotalLinks);
      setTo(story.chuongs.current_page + halfTotalLinks);
      if (story.chuongs.current_page < halfTotalLinks) {
        setTo(to + halfTotalLinks - story.current_page);
      }
      if (story.last_page - story.current_page < halfTotalLinks) {
        setFrom(
          from - (halfTotalLinks - (story.last_page - story.current_page))
        );
      }
    }
  }, [story]);

  const changePage = (e: any, word: string) => {
    if (
      word === "next" &&
      story.chuongs.current_page < story.chuongs.last_page
    ) {
      if (user) {
        callApi(user.user.id, story.chuongs.current_page + 1);
      } else {
        callApi("", story.chuongs.current_page + 1);
      }
    } else if (word === "prev" && story.chuongs.current_page - 1 > 0) {
      if (user) {
        callApi(user.user.id, story.chuongs.current_page - 1);
      } else {
        callApi("", story.chuongs.current_page - 1);
      }
    } else if (word !== "next" && word !== "prev") {
      e.preventDefault();
      if (user) {
        callApi(user.user.id, Number(word));
      } else {
        callApi("", Number(word));
      }
    }
  };

  return (
    <div className="chapter__donate">
      <div className="list__chapter__donate">
        <div
          className={`main__story--chapter center ${
            position === 0 ? "active__chapter__donate" : ""
          }`}
          onClick={() => setPosition(0)}
        >
          Ds Chương <span>{story.chuongs.total}</span>
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
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="center__chapter--list" ref={Ref}>
            {story.chuongs.data.map((value: any, index: number) => {
              return (
                <Link
                  to={`/${params.slug}/${value.slug}`}
                  className="center__chapter--item"
                  key={index}
                >
                  <p>
                    <span className="number__chapter">
                      {value.chapter_number}.
                    </span>
                    <span className="name__chapter"> {value.name_chapter}</span>
                  </p>
                  <i>
                    <span>Cập nhật: </span>
                    <span>
                      <Moment fromNow locale="vi">
                        {value.created_at}
                      </Moment>
                    </span>
                  </i>
                  {value.bought && (
                    <>
                      <span className="bought">
                        <i className="fa-solid fa-lock-open"></i>
                      </span>
                      <div className="hover__bought">
                        {value.coin} xu - đã mua
                      </div>
                    </>
                  )}
                  {!value.bought && value.coin > 0 && (
                    <span className="coin">{value.coin} xu </span>
                  )}
                </Link>
              );
            })}
          </div>
          {story.chuongs.last_page > 1 && (
            <div className={`pagination`}>
              <div className="pagination__left">
                <ul className="pagination__left--list">
                  {story.chuongs.links.map((value: any, index: number) => {
                    if (
                      !value.label.includes("Next") &&
                      !value.label.includes("Prev")
                    ) {
                      if (
                        from < index &&
                        index <= to &&
                        index !== story.chuongs.last_page
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
                            <a href="">{value.label}</a>
                          </li>
                        );
                      }
                    }
                  })}
                  {story.chuongs.last_page < 2 && (
                    <li style={{ border: "none", cursor: "default" }}>
                      <a href="" style={{ cursor: "default" }}>
                        ...
                      </a>
                    </li>
                  )}

                  <li
                    className={
                      story.chuongs.last_page === story.chuongs.current_page
                        ? "active"
                        : ""
                    }
                    onClick={(e) =>
                      story.chuongs.current_page !== story.chuongs.last_page
                        ? changePage(e, story.chuongs.last_page)
                        : e.preventDefault()
                    }
                  >
                    <a href="">{story.chuongs && story.chuongs.last_page}</a>
                  </li>
                </ul>
              </div>
              <div className="pagination__right">
                <div
                  className={`pagination__right--prev mr-10 ${
                    story.chuongs.current_page === 1 ? "forbidden" : ""
                  }`}
                  onClick={(e) => changePage(e, "prev")}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </div>
                <div
                  className={`pagination__right--next ${
                    story.chuongs.last_page === story.chuongs.current_page
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
