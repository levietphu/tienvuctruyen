import { useState, useEffect } from "react";
import chicken from "../../assets/chicken.png";
import Moment from "react-moment";
import "moment/locale/vi";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import coin from "../../assets/coin.svg";
import Pagination from "../pagination/Pagination";

const ChapterStory = ({ callApiDonate, story, user, donates }: any) => {
  const [chapterStory, setChapterStory] = useState<any>();

  const [keyword, setKeyword] = useState<string>("");
  const [orderby, setOrderby] = useState<string>("asc");
  const [checkKeywordOrderby, setCheckKeywordOrderby] =
    useState<boolean>(false);
  const [checkInput, setCheckInput] = useState(false);
  const [checkDonateOrChapter, setCheckDonateOrChapter] =
    useState<string>("chapter");

  const params = useParams();

  const callApiChapter = async (id_user: string, page: number) => {
    await axios
      .get(
        `${process.env.REACT_APP_API}get_chapter_story?slug=${params.slug}&page=${page}&keyword=${keyword}&orderby=${orderby}&id_user=${id_user}`
      )
      .then((res) => setChapterStory(res.data.chapter));
  };

  useEffect(() => {
    if (user) {
      callApiChapter(user.user.id, 1);
    } else {
      callApiChapter("", 1);
    }
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

  return (
    <div className="chapter__donate">
      <div className="list__chapter__donate">
        <div
          className={`main__story--chapter center ${
            checkDonateOrChapter === "chapter" ? "active__chapter__donate" : ""
          }`}
          onClick={() => {
            setCheckDonateOrChapter("chapter");
          }}
        >
          Ds Chương <span>{story.total_chapter}</span>
        </div>
        <div
          className={`main__story--chapter center ${
            checkDonateOrChapter === "donate" ? "active__chapter__donate" : ""
          }`}
          onClick={() => {
            setCheckDonateOrChapter("donate");
          }}
        >
          Ủng hộ<span>{donates && donates.total_donate}</span>
        </div>
      </div>
      <div className="center__chapter">
        <div
          className="center__chapter--left"
          style={{
            display: `${checkDonateOrChapter === "chapter" ? "" : "none"}`,
          }}
          tabIndex={checkDonateOrChapter === "chapter" ? 0 : -1}
        >
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
          <div className="center__chapter--list">
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
          <Pagination
            data={chapterStory}
            callApiPagination={callApiChapter}
            check="chapter"
          />
        </div>
        <div
          className="center__chapter--right"
          style={{
            display: `${checkDonateOrChapter === "donate" ? "" : "none"}`,
          }}
          tabIndex={checkDonateOrChapter === "donate" ? 0 : -1}
        >
          <p className="text-donate">Danh sách ủng hộ</p>

          {donates && donates.data.length > 0 ? (
            <div className="center__chapter--left">
              <div className="center__chapter--list">
                {donates.data.map((value: any, index: number) => {
                  return (
                    <div
                      className="center__chapter--item"
                      key={index}
                      style={{ cursor: "default" }}
                    >
                      <div className="center__chapter--left">
                        <p>
                          <span
                            className="number__chapter"
                            style={{ textTransform: "unset" }}
                          >
                            {value.name_user_donate}
                          </span>
                        </p>
                        <p className="name__chapter"> {value.message}</p>
                        <i>
                          <span style={{ fontSize: "14px" }}>
                            <Moment fromNow locale="vi">
                              {value.created_at}
                            </Moment>
                          </span>
                        </i>
                      </div>

                      <span className="coin_donate center">
                        <strong
                          style={{ marginRight: "5px", fontSize: "24px" }}
                        >
                          {value.coin_donate}
                        </strong>
                        <img width={20} src={coin} alt="webtruyen" />
                      </span>
                    </div>
                  );
                })}
              </div>
              <Pagination
                check="donate"
                data={donates}
                callApiPagination={callApiDonate}
              />
            </div>
          ) : (
            <div className="donate__story center">
              <div>
                <div className="image__donate">
                  <img src={chicken} alt="webtruyen" />
                </div>
                <p>
                  Hãy bấm vào nút Ủng hộ truyện ở trên để ủng hộ dịch giả nhé!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterStory;
