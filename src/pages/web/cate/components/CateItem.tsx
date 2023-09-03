import Moment from "react-moment";
import { Link, useParams } from "react-router-dom";

const CateItem = ({ item, index }: any) => {
  const params = useParams();

  return (
    <div className="item__story--newupdate">
      <div className="image__story mr-10">
        <Link to={`/${item.slug}`}>
          <img
            src={`${process.env.REACT_APP_UPLOADS}${item.image}`}
            alt="webtruyen"
          />
        </Link>
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
            <span className="cate btn__vip" style={{ margin: "0" }}>
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
};

export default CateItem;
