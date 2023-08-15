import { useState, useEffect, useCallback } from "react";
import chicken from "../../../../assets/chicken.png";
import "moment/locale/vi";
import { useParams } from "react-router-dom";
import axios from "axios";
import coin from "../../../../assets/coin.svg";
import Pagination from "../../pagination/Pagination";
import ChapterItem from "./ChapterItem";
import DonateItem from "./DonateItem";

const ChapterStory = ({ callApiDonate, story, user, donates }: any) => {
  const [chapterStory, setChapterStory] = useState<any>();

  const [keyword, setKeyword] = useState<string>("");
  const [orderby, setOrderby] = useState<string>("asc");
  const [checkKeywordOrderby, setCheckKeywordOrderby] =
    useState<boolean>(false);
  const [checkInput, setCheckInput] = useState(false);
  const [checkDonateOrChapter, setCheckDonateOrChapter] =
    useState<string>("chapter");

  useCallback(() => {}, []);
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
                  <ChapterItem
                    key={index}
                    value={value}
                    index={index}
                    params={params}
                  />
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
                    <DonateItem
                      value={value}
                      index={index}
                      key={index}
                      coin={coin}
                    />
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
