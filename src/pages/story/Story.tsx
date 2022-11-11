import { useState, useEffect, useContext } from "react";
import "./story.scss";
import MainLayout from "../../layouts/MainLayout";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CommentStory from "../../components/story/CommentStory";
import ChapterStory from "../../components/story/ChapterStory";
import Loader from "../../components/story/Loader";
import { AuthContext } from "../../context/AuthContextProvider";

const Story = () => {
  // data api
  const [story, setStory] = useState<any>();
  const [loader, setLoader] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>("");
  const [orderby, setOrderby] = useState<string>("asc");

  const { user, loaderUser }: any = useContext(AuthContext);

  const checkStoryAddView = JSON.parse(
    localStorage.getItem("checkStoryAddView") || "[]"
  );

  const params = useParams();
  const navigate = useNavigate();

  const callApi = async (id_user: string, page: number) => {
    await axios
      .get(
        `${process.env.REACT_APP_API}get_story?slug=${params.slug}&page=${page}&keyword=${keyword}&orderby=${orderby}&id_user=${id_user}`
      )
      .then((res) => {
        setStory(res.data.data.items);
        setLoader(false);
      });
  };

  const addViewStory = async () => {
    await axios.get(`${process.env.REACT_APP_API}addview?slug=${params.slug}`);
  };

  useEffect(() => {
    if (user) {
      callApi(user.user.id, 1);
    } else {
      if (loaderUser !== "loader") {
        callApi("", 1);
      }
    }
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
  }, [params.slug, loaderUser]);

  useEffect(() => {
    if (user) {
      callApi(user.user.id, 1);
    } else {
      if (loaderUser !== "loader") {
        callApi("", 1);
      }
    }
  }, [keyword, loaderUser]);

  useEffect(() => {
    if (user) {
      callApi(user.user.id, 1);
    } else {
      if (loaderUser !== "loader") {
        callApi("", 1);
      }
    }
  }, [orderby, loaderUser]);

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
                <span>tác giả: </span> <span>{story.tacgia.name}</span>
              </p>
              <p className="header__story--translator">
                <span>dịch giả: </span>{" "}
                <Link to={`/dich-gia/${story.dichgia.slug}`}>
                  <span className="person">
                    <i className="fa-solid fa-person"></i>
                  </span>{" "}
                  <span>{story.dichgia.name}</span>
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

              <div
                className="header__story--introduce"
                dangerouslySetInnerHTML={{
                  __html: story.introduce,
                }}
              ></div>
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
            <ChapterStory
              story={story}
              callApi={callApi}
              setKeyword={setKeyword}
              keyword={keyword}
              orderby={orderby}
              setOrderby={setOrderby}
              user={user}
            />
            <CommentStory comments={story.comments_story} />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </MainLayout>
  );
};

export default Story;
