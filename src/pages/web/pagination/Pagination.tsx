import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";

const Pagination = ({ data, callApiPagination, check }: any) => {
  // pagination
  const halfTotalLinks = Math.floor(2 / 2);

  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);

  const { user }: any = useContext(AuthContext);

  useEffect(() => {
    if (data) {
      setFrom(data.current_page - halfTotalLinks);
      setTo(data.current_page + halfTotalLinks);
      if (data.current_page < halfTotalLinks) {
        setTo(to + halfTotalLinks - data.current_page);
      }
      if (data.last_page - data.current_page < halfTotalLinks) {
        setFrom(from - (halfTotalLinks - (data.last_page - data.current_page)));
      }
    }
  }, [data]);

  const changePage = (e: any, word: string) => {
    if (check === "donate" || check === "cate") {
      if (word === "next" && data.current_page < data.last_page) {
        callApiPagination(data.current_page + 1);
      } else if (word === "prev" && data.current_page - 1 > 0) {
        callApiPagination(data.current_page - 1);
      } else if (word !== "next" && word !== "prev") {
        e.preventDefault();
        callApiPagination(Number(word));
      }
      check === "donate"
        ? window.scrollTo({
            top:
              Number(document.querySelector(".header__story")?.clientHeight) +
              80,
            behavior: "smooth",
          })
        : window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
    }
    if (check === "chapter") {
      if (word === "next" && data.current_page < data.last_page) {
        if (user) {
          callApiPagination(user.user.id, data.current_page + 1);
        } else {
          callApiPagination("", data.current_page + 1);
        }
      } else if (word === "prev" && data.current_page - 1 > 0) {
        if (user) {
          callApiPagination(user.user.id, data.current_page - 1);
        } else {
          callApiPagination("", data.current_page - 1);
        }
      } else if (word !== "next" && word !== "prev") {
        e.preventDefault();
        if (user) {
          callApiPagination(user.user.id, Number(word));
        } else {
          callApiPagination("", Number(word));
        }
      }
      window.scrollTo({
        top:
          Number(document.querySelector(".header__story")?.clientHeight) + 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {data && data.last_page > 1 && (
        <div
          className={`pagination`}
          style={{
            justifyContent: `${check === "donate" ? "space-between" : ""}`,
          }}
        >
          <div className="pagination__left">
            <ul className="pagination__left--list">
              {data.links.map((value: any, index: number) => {
                if (
                  !value.label.includes("Next") &&
                  !value.label.includes("Prev")
                ) {
                  if (from < index && index <= to && index !== data.last_page) {
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
              {data.last_page > 2 && (
                <li style={{ border: "none", cursor: "default" }}>
                  <a style={{ cursor: "default" }}>...</a>
                </li>
              )}

              <li
                className={data.last_page === data.current_page ? "active" : ""}
                onClick={(e) =>
                  data.current_page !== data.last_page
                    ? changePage(e, data.last_page)
                    : e.preventDefault()
                }
              >
                <a>{data && data.last_page}</a>
              </li>
            </ul>
          </div>
          <div className="pagination__right">
            <div
              className={`pagination__right--prev mr-10 ${
                data.current_page === 1 ? "forbidden" : ""
              }`}
              onClick={(e) => changePage(e, "prev")}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </div>
            <div
              className={`pagination__right--next ${
                data.last_page === data.current_page ? "forbidden" : ""
              }`}
              onClick={(e) => changePage(e, "next")}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
