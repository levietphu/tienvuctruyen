import { Link } from "react-router-dom";
import Moment from "react-moment";
import { memo } from "react";

const ChapterItem = ({ params, index, value }: any) => {
  return (
    <Link
      to={`/${params.slug}/${value.slug}`}
      className="center__chapter--item"
      key={index}
    >
      <div className="center__chapter--left">
        <p>
          <span className="number__chapter">{value.chapter_number}.</span>
          <span className="name__chapter"> {value.name_chapter}</span>
        </p>
        <i>
          <span>Cập nhật: </span>
          <span>
            <Moment fromNow locale="vi">
              {value.created_at}
            </Moment>
          </span>
        </i>
      </div>

      {value.bought && (
        <>
          <span className="bought">
            <i className="fa-solid fa-lock-open"></i>
            <div className="hover__bought">{value.coin} xu - đã mua</div>
          </span>
        </>
      )}
      {!value.bought && value.coin > 0 && (
        <span className="coin">{value.coin} xu </span>
      )}
    </Link>
  );
};

export default memo(ChapterItem);
