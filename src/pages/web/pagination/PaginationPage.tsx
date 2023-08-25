import { useContext, memo } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";
import "./pagination.scss";
import { Pagination } from "antd";

const PaginationPage = ({ data, callApiPagination, check }: any) => {
  const { user }: any = useContext(AuthContext);

  const changePage = (word: string) => {
    if (
      check === "donate" ||
      check === "cate" ||
      check === "transactionHistory"
    ) {
      if (word === "next") {
        callApiPagination(data.current_page + 1);
      } else if (word === "prev") {
        callApiPagination(data.current_page - 1);
      } else if (word !== "next" && word !== "prev") {
        callApiPagination(Number(word));
      }
      check === "donate" &&
        window.scrollTo({
          top:
            Number(document.querySelector(".header__story")?.clientHeight) + 80,
          behavior: "smooth",
        });
      check === "cate" &&
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
    }
    if (check === "chapter") {
      if (word === "next") {
        if (user) {
          callApiPagination(user.user.id, data.current_page + 1);
        } else {
          callApiPagination("", data.current_page + 1);
        }
      } else if (word === "prev") {
        if (user) {
          callApiPagination(user.user.id, data.current_page - 1);
        } else {
          callApiPagination("", data.current_page - 1);
        }
      } else if (word !== "next" && word !== "prev") {
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
      {data && (
        <div
          className={`pagination`}
          style={{
            justifyContent: `${
              check === "donate" || check === "cate"
                ? "space-between"
                : check === "chapter"
                ? ""
                : "end"
            }`,
          }}
        >
          <Pagination
            current={data.current_page}
            defaultCurrent={1}
            total={data.total}
            onChange={(page: any, pageSize) => changePage(page)}
            pageSize={data.per_page}
            className="pagination-page"
          />
          <div className="pagination__right">
            <div
              className={`pagination__right--prev mr-10 ${
                data.current_page === 1 ? "forbidden" : ""
              }`}
              onClick={(e) => data.current_page !== 1 && changePage("prev")}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </div>
            <div
              className={`pagination__right--next ${
                data.last_page === data.current_page ? "forbidden" : ""
              }`}
              onClick={(e) =>
                data.last_page !== data.current_page && changePage("next")
              }
            >
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(PaginationPage);
