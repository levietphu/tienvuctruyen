import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
import "moment/locale/vi";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import image from "../../assets/mascot-02.235fd60.png";

const StoryCate = () => {
  const [dataCate, setDataCate] = useState<any>();
  const [loader, setLoader] = useState<boolean>(true);
  const [halfTotalLinks, setHalfTotalLinks] = useState<number>(
    Math.floor(2 / 2)
  );
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);

  const Ref = useRef<HTMLDivElement>(null);

  const params = useParams();

  const callApi = async (page: number) => {
    if (params.slugcate) {
      await axios
        .get(
          `${process.env.REACT_APP_API}cate?slug=${params.slugcate}&page=${page}`
        )
        .then((res) => {
          setDataCate(res.data.data);
          setLoader(false);
          setFrom(res.data.data.items.current_page - halfTotalLinks);
          setTo(res.data.data.items.current_page + halfTotalLinks);
          if (res.data.data.items.current_page < halfTotalLinks) {
            setTo(to + halfTotalLinks - res.data.data.items.current_page);
          }
          if (
            res.data.data.items.last_page - res.data.data.items.current_page <
            halfTotalLinks
          ) {
            setFrom(
              from -
                (halfTotalLinks -
                  (res.data.data.items.last_page -
                    res.data.data.items.current_page))
            );
          }
        });
    } else {
      await axios
        .get(
          `${process.env.REACT_APP_API}list?slug=${params.sluglist}&page=${page}`
        )
        .then((res) => {
          setDataCate(res.data.data);
          setLoader(false);
          setFrom(res.data.data.items.current_page - halfTotalLinks);
          setTo(res.data.data.items.current_page + halfTotalLinks);
          if (res.data.data.items.current_page < halfTotalLinks) {
            setTo(to + halfTotalLinks - res.data.data.items.current_page);
          }
          if (
            res.data.data.items.last_page - res.data.data.items.current_page <
            halfTotalLinks
          ) {
            setFrom(
              from -
                (halfTotalLinks -
                  (res.data.data.items.last_page -
                    res.data.data.items.current_page))
            );
          }
        });
    }
  };

  useEffect(() => {
    callApi(1);
    setLoader(true);
  }, [params.slugcate, params.sluglist]);

  const changePage = (e: any, word: string) => {
    if (
      word === "next" &&
      dataCate.items.current_page < dataCate.items.last_page
    ) {
      callApi(dataCate.items.current_page + 1);
    } else if (word === "prev" && dataCate.items.current_page - 1 > 0) {
      callApi(dataCate.items.current_page - 1);
    } else if (word !== "next" && word !== "prev") {
      e.preventDefault();
      callApi(Number(word));
    }
  };

  return (
    <div className="cate__page">
      <h1
        className={`cate-title ${
          params.sluglist && params.sluglist === "truyen-vip" ? "center" : ""
        }`}
      >
        {params.slugcate
          ? !loader && "Truyện " + dataCate.name
          : params.sluglist === "truyen-vip"
          ? "Bảng xếp hạng truyện vip"
          : params.sluglist === "truyen-moi"
          ? "truyện mới"
          : params.sluglist === "truyen-mien-phi"
          ? "Truyện miễn phí"
          : "Truyện đã hoàn thành"}
      </h1>
      <div className="cate-content">
        {!loader && dataCate.items.data.length !== 0 ? (
          <>
            <div className="list__story--newupdate" ref={Ref}>
              {dataCate.items.data.map((item: any, index: any) => {
                return (
                  <div className="item__story--newupdate" key={item.id}>
                    <div className="image__story mr-10">
                      <img
                        src={`${process.env.REACT_APP_UPLOADS}${item.image}`}
                        alt=""
                      />
                      {params.sluglist && params.sluglist === "truyen-vip" && (
                        <div
                          className="top__story"
                          style={{
                            background: `${
                              index === 0
                                ? "#ffe08a"
                                : index === 1
                                ? "#f14668"
                                : index === 2
                                ? "#3e8ed0"
                                : "#7a7a7a"
                            }`,
                            color: `${index === 0 ? "black" : ""}`,
                          }}
                        >
                          Top {index + 1}
                        </div>
                      )}
                    </div>

                    <div className="story__newupdate--right">
                      <div className="name__story mr-10">
                        <Link className="mr-5" to={`/${item.slug}`}>
                          <span>{item.name}</span>
                        </Link>
                        <span className="cate btn__vip">vip</span>
                        <p>{item.tacgia?.name}</p>
                      </div>
                      <div className="cate__story mr-10">
                        {item.theloais.map((value: any) => {
                          return (
                            <Link to={`/the-loai/${value.slug}`} key={value.id}>
                              {value.name}
                            </Link>
                          );
                        })}
                      </div>
                      <div className="chapter__story">
                        <Link to={`/${item.slug}/${item.chuong.slug}`}>
                          <strong>{item.chuong?.chapter_number}</strong>.{" "}
                          <span>{item.chuong?.name_chapter}</span>
                        </Link>
                        <p>
                          <Moment fromNow locale="vi">
                            {item.chuong?.created_at}
                          </Moment>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {dataCate.items.last_page > 1 && (
              <div className={`pagination`}>
                {((params.sluglist && params.sluglist !== "truyen-vip") ||
                  params.slugcate) && (
                  <>
                    <div className="pagination__left">
                      <ul className="pagination__left--list">
                        {dataCate &&
                          dataCate.items.links.map(
                            (value: any, index: number) => {
                              if (
                                !value.label.includes("Next") &&
                                !value.label.includes("Prev")
                              ) {
                                if (
                                  from < index &&
                                  index <= to &&
                                  index !== dataCate.items.last_page
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
                            }
                          )}
                        <li style={{ border: "none", cursor: "default" }}>
                          <a href="" style={{ cursor: "default" }}>
                            ...
                          </a>
                        </li>

                        <li
                          className={
                            dataCate.items.last_page ===
                            dataCate.items.current_page
                              ? "active"
                              : ""
                          }
                          onClick={(e) =>
                            dataCate.items.current_page !==
                            dataCate.items.last_page
                              ? changePage(e, dataCate.items.last_page)
                              : e.preventDefault()
                          }
                        >
                          <a href="">
                            {dataCate.items && dataCate.items.last_page}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="pagination__right">
                      <div
                        className={`pagination__right--prev mr-10 ${
                          dataCate && dataCate.items.current_page === 1
                            ? "forbidden"
                            : ""
                        }`}
                        onClick={(e) => changePage(e, "prev")}
                      >
                        <i className="fa-solid fa-chevron-left"></i>
                      </div>
                      <div
                        className={`pagination__right--next ${
                          dataCate &&
                          dataCate.items.last_page ===
                            dataCate.items.current_page
                            ? "forbidden"
                            : ""
                        }`}
                        onClick={(e) => changePage(e, "next")}
                      >
                        <i className="fa-solid fa-chevron-right"></i>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        ) : !loader && dataCate.items.data.length === 0 ? (
          <div className="no-view">
            <div>
              <img src={image} alt="" />
              <h4 className="center">Hiện chưa có truyện nào</h4>
              <p className="center">Bạn hãy quay lại sau nhé!</p>
              <span className="center">
                <Link to="/">Về trang chủ</Link>
              </span>
            </div>
          </div>
        ) : (
          loader && (
            <ul className="o-vertical-spacing o-vertical-spacing--l">
              <li className="blog-post o-media">
                <div className="o-media__figure">
                  <span
                    className="skeleton-box"
                    style={{ width: "100px", height: "80px" }}
                  ></span>
                </div>
                <div className="o-media__body">
                  <div className="o-vertical-spacing">
                    <h3 className="blog-post__headline">
                      <span
                        className="skeleton-box"
                        style={{ width: "55%" }}
                      ></span>
                    </h3>
                    <p>
                      <span
                        className="skeleton-box"
                        style={{ width: "80%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "90%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "83%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "80%" }}
                      ></span>
                    </p>
                    <div className="blog-post__meta">
                      <span
                        className="skeleton-box"
                        style={{ width: "70px" }}
                      ></span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="blog-post o-media">
                <div className="o-media__figure">
                  <span
                    className="skeleton-box"
                    style={{ width: "100px", height: "80px" }}
                  ></span>
                </div>
                <div className="o-media__body">
                  <div className="o-vertical-spacing">
                    <h3 className="blog-post__headline">
                      <span
                        className="skeleton-box"
                        style={{ width: "55%" }}
                      ></span>
                    </h3>
                    <p>
                      <span
                        className="skeleton-box"
                        style={{ width: "80%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "90%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "83%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "80%" }}
                      ></span>
                    </p>
                    <div className="blog-post__meta">
                      <span
                        className="skeleton-box"
                        style={{ width: "70px" }}
                      ></span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="blog-post o-media">
                <div className="o-media__figure">
                  <span
                    className="skeleton-box"
                    style={{ width: "100px", height: "80px" }}
                  ></span>
                </div>
                <div className="o-media__body">
                  <div className="o-vertical-spacing">
                    <h3 className="blog-post__headline">
                      <span
                        className="skeleton-box"
                        style={{ width: "55%" }}
                      ></span>
                    </h3>
                    <p>
                      <span
                        className="skeleton-box"
                        style={{ width: "80%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "90%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "83%" }}
                      ></span>
                      <span
                        className="skeleton-box"
                        style={{ width: "80%" }}
                      ></span>
                    </p>
                    <div className="blog-post__meta">
                      <span
                        className="skeleton-box"
                        style={{ width: "70px" }}
                      ></span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          )
        )}
      </div>
    </div>
  );
};

export default StoryCate;
