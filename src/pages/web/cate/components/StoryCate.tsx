import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
import "moment/locale/vi";
import axios from "axios";
import { useState, useEffect } from "react";
import image from "../../../../assets/mascot-02.235fd60.png";
import Pagination from "../../pagination/Pagination";
import LoaderCate from "./LoaderCate";

const StoryCate = () => {
  const [dataCate, setDataCate] = useState<any>();
  const [nameCate, setNameCate] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(true);

  const params = useParams();

  const callApi = async (page: number) => {
    if (params.slugcate) {
      await axios
        .get(
          `${process.env.REACT_APP_API}cate?slug=${params.slugcate}&page=${page}`
        )
        .then((res) => {
          setDataCate(res.data.data.items);
          setLoader(false);
          setNameCate(res.data.data.name);
        });
    } else {
      await axios
        .get(
          `${process.env.REACT_APP_API}list?slug=${params.sluglist}&page=${page}`
        )
        .then((res) => {
          setDataCate(res.data.data.items);
          setLoader(false);
        });
    }
  };

  useEffect(() => {
    if (params.slugcate || params.sluglist) {
      callApi(1);
      setLoader(true);
      window.scrollTo({
        top: 0,
      });
    }
  }, [params.slugcate, params.sluglist]);

  const checkName = () => {
    let name: any = params.slugcate
      ? !loader && "Truyện " + nameCate
      : params.sluglist === "truyen-vip"
      ? "Bảng xếp hạng truyện vip"
      : params.sluglist === "truyen-moi"
      ? "Truyện mới"
      : params.sluglist === "truyen-mien-phi"
      ? "Truyện miễn phí"
      : "Truyện đã hoàn thành";
    return name;
  };

  useEffect(() => {
    if (!loader && (params.slugcate || params.sluglist)) {
      document.title = checkName();
    }
  }, [loader]);

  return (
    <div className="cate__page">
      <h1
        className={`cate-title ${
          params.sluglist && params.sluglist === "truyen-vip" ? "center" : ""
        }`}
      >
        {checkName()}
      </h1>
      <div className="cate-content">
        {!loader && dataCate.data.length !== 0 ? (
          <>
            <div className="list__story--newupdate">
              {dataCate.data.map((item: any, index: any) => {
                return (
                  <div className="item__story--newupdate" key={item.id}>
                    <div className="image__story mr-10">
                      <img
                        src={`${process.env.REACT_APP_UPLOADS}${item.image}`}
                        alt="webtruyen"
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
                        {item.vip === 1 && (
                          <span
                            className="cate btn__vip"
                            style={{ margin: "0" }}
                          >
                            vip
                          </span>
                        )}
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
                        {item.chuong ? (
                          <Link to={`/${item.slug}/${item.chuong?.slug}`}>
                            <strong>{item.chuong?.chapter_number}</strong>.{" "}
                            <span>{item.chuong?.name_chapter}</span>
                          </Link>
                        ) : (
                          <a href="">
                            <span>Hiện chưa có chương</span>
                          </a>
                        )}

                        {item.chuong && (
                          <p>
                            <Moment fromNow locale="vi">
                              {item.chuong.created_at}
                            </Moment>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {(params.slugcate || params.sluglist) &&
              params.sluglist !== "truyen-vip" && (
                <Pagination
                  data={dataCate}
                  check="cate"
                  callApiPagination={callApi}
                />
              )}
          </>
        ) : !loader && dataCate.data.length === 0 ? (
          <div className="no-view">
            <div>
              <img src={image} alt="webtruyen" />
              <h4 className="center">Hiện chưa có truyện nào</h4>
              <p className="center">Bạn hãy quay lại sau nhé!</p>
              <span className="center">
                <Link to="/">Về trang chủ</Link>
              </span>
            </div>
          </div>
        ) : (
          loader && <LoaderCate />
        )}
      </div>
    </div>
  );
};

export default StoryCate;
