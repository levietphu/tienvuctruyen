import { useState, useEffect } from "react";
import "./story.scss";
import MainLayout from "../../layouts/MainLayout";

import { Link, useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import CommentStory from "../../components/story/CommentStory";
import ChapterStory from "../../components/story/ChapterStory";

const Story = () => {
  // data api
  const [story, setStory] = useState<any>();
  const [loader, setLoader] = useState<boolean>(true);

  const params = useParams();
  const navigate = useNavigate();

  const callApi = async (page: number) => {
    await axios
      .get(
        `${process.env.REACT_APP_API}get_story?slug=${params.slug}&page=${page}`
      )
      .then((res) => {
        setStory(res.data.data.items);
        setLoader(false);
      });
  };

  useEffect(() => {
    callApi(1);
  }, [params.slug]);

  return (
    <MainLayout>
      {!loader && story && (
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
              <div className="cate__story header__story--cate">
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
              </div>

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
            <ChapterStory story={story} callApi={callApi} />
            <CommentStory />
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Story;
