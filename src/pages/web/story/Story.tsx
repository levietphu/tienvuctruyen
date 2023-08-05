import { useState, useEffect, useContext } from "react";
import "./story.scss";
import MainLayout from "../../../layouts/MainLayout";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CommentStory from "../../../components/story/CommentStory";
import ChapterStory from "../../../components/story/ChapterStory";
import Loader from "../../../components/story/Loader";
import { AuthContext } from "../../../context/AuthContextProvider";
import { DownOutlined, UpOutlined, CrownFilled } from "@ant-design/icons";

const Story = () => {
  // data api
  const [story, setStory] = useState<any>();

  const [loader, setLoader] = useState<boolean>(true);

  const [viewMore, setViewMore] = useState<any>({
    height: "120px",
    overflow: "hidden",
  });
  const [checkViewMore, setCheckViewMore] = useState(false);

  const { user, loaderUser }: any = useContext(AuthContext);

  const checkStoryAddView = JSON.parse(
    localStorage.getItem("checkStoryAddView") || "[]"
  );

  const params = useParams();
  const navigate = useNavigate();
  if (!params.slug?.includes("-")) {
    navigate("/404");
  }

  const callApi = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}get_story?slug=${params.slug}`)
      .then((res) => {
        setStory(res.data.data.items);
        setLoader(false);
      });
  };

  const addViewStory = async () => {
    await axios.get(`${process.env.REACT_APP_API}addview?slug=${params.slug}`);
  };

  useEffect(() => {
    callApi();
    setLoader(true);
    if (checkStoryAddView.length === 0) {
      localStorage.setItem("checkStoryAddView", JSON.stringify([params.slug]));
      addViewStory();
    } else {
      if (!checkStoryAddView.includes(params.slug)) {
        localStorage.setItem(
          "checkStoryAddView",
          JSON.stringify([...checkStoryAddView, params.slug])
        );
        addViewStory();
      } else {
        let id = setTimeout(() => {
          addViewStory();
        }, 30000);
        return () => clearTimeout(id);
      }
    }
  }, []);

  useEffect(() => {
    if (!loader && params.slug) {
      document.title = story.name;
    }
  }, [loader]);

  const onViewMore = () => {
    setCheckViewMore(!checkViewMore);
  };

  useEffect(() => {
    if (checkViewMore) {
      setViewMore({
        height: "auto",
        overflow: "auto",
      });
    } else {
      setViewMore({
        height: "120px",
        overflow: "hidden",
      });
    }
  }, [checkViewMore]);
  console.log("123");

  return (
    <MainLayout>
      {!loader ? (
        <>
          <div className="header__story">
            <div className="header__story--left">
              <div className="header__story--image">
                <img
                  src={`${process.env.REACT_APP_UPLOADS}${story.image}`}
                  alt=""
                />
                {story.rank.map((item: any, index: any) => {
                  return (
                    item.id === story.id && (
                      <Link
                        key={index}
                        to="/danh-sach/truyen-vip"
                        className="rank-story"
                        style={{
                          background: `${
                            index + 1 === 2
                              ? "#f14668"
                              : index + 1 === 1
                              ? "#ffe08a"
                              : "#3e8ed0"
                          }`,
                          color: `${index + 1 > 1 ? "white" : "#363636"}`,
                        }}
                      >
                        {index === 0 && (
                          <CrownFilled
                            style={{ marginRight: "5px" }}
                            rev={undefined}
                          />
                        )}
                        <span>Top {index + 1}</span>
                      </Link>
                    )
                  );
                })}
              </div>
            </div>
            <div className="header__story--right">
              {story.vip === 1 && <span className="btn__vip">vip</span>}
              {story.full === 1 && <span className="btn__full">full</span>}
              <span className="cate__story header__story--cate">
                {story.theloais.map((item: any) => {
                  return (
                    <Link
                      className="cate__story"
                      to={`/the-loai/${item.slug}`}
                      key={item.id}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </span>

              <h1 className="header__story--name">{story.name}</h1>
              <p className="header__story--author">
                <span>tác giả: </span>{" "}
                <span>
                  {story.tacgia ? story.tacgia.name : "Chưa có thông tin"}
                </span>
              </p>
              <p className="header__story--translator">
                <span>dịch giả: </span>{" "}
                <Link to={`/dich-gia/${story.dichgia && story.dichgia.slug}`}>
                  <span className="person">
                    <i className="fa-solid fa-person"></i>
                  </span>{" "}
                  <span>
                    {story.dichgia ? story.dichgia.name : "chưa có thông tin"}
                  </span>
                </Link>
              </p>
              <div className="header__story--view">
                <span className="boder-right">Lượt xem</span>
                <span className="bg-blue boder-left">{story.view_count}</span>
              </div>
              {story.discount && (
                <div className="header__story--discount">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: story.discount,
                    }}
                  ></div>
                </div>
              )}
              <div className="view-more-introduce">
                <div
                  style={viewMore}
                  className="header__story--introduce"
                  dangerouslySetInnerHTML={{
                    __html: story.introduce,
                  }}
                ></div>
                <p className="view_more" onClick={onViewMore}>
                  {!checkViewMore ? "Xem thêm" : "Xem ít hơn"}
                  {!checkViewMore ? (
                    <DownOutlined
                      rev={undefined}
                      style={{ fontSize: "12px" }}
                    />
                  ) : (
                    <UpOutlined rev={undefined} style={{ fontSize: "12px" }} />
                  )}
                </p>
              </div>
              <div className="header__stoty--read">
                <button
                  className="bg-primary"
                  onClick={() =>
                    navigate(`/${params.slug}/${story.chuongs.data[0].slug}`)
                  }
                >
                  Đọc từ đầu
                </button>
                <button className="bg-blue">
                  Ủng hộ truyện
                  <i className="fa-solid fa-circle-dollar-to-slot"></i>
                </button>
                <button className="bg-vip">Mua chương vip</button>
              </div>
            </div>
          </div>
          <div className="main__story">
            <ChapterStory user={user} story={story} />
            <CommentStory slug={params.slug} story={story} />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </MainLayout>
  );
};

export default Story;
