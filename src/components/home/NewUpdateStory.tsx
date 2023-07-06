import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment/locale/vi";

const NewUpdateStory = ({ data }: any) => {
  return (
    <div className="list__story--newupdate">
      {data &&
        data.map((item: any, index: any) => {
          return (
            <div className="item__story--newupdate" key={item.id}>
              <div className="image__story mr-10">
                <img
                  src={`${process.env.REACT_APP_UPLOADS}${item.image}`}
                  alt=""
                />
              </div>

              <div className="story__newupdate--right">
                <div className="name__story mr-10">
                  <Link className="mr-5" to={`/${item.slug}`}>
                    <span>{item.name}</span>
                  </Link>
                  <span className="cate btn__vip" style={{ margin: "0" }}>
                    vip
                  </span>
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
  );
};

export default NewUpdateStory;
