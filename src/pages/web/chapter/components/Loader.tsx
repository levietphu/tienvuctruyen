import { Skeleton } from "antd";

const Loader = () => {
  return (
    <>
      <section className="screen-80">
        <div className="header__chapter">
          <Skeleton.Button active size={"default"} />
          <Skeleton
            className="mb-20 chapter-loader"
            paragraph={{ rows: 1 }}
            loading={true}
            active
            title={false}
          />
          <div className="next__prev--chapter">
            <span
              className={`next__chapter
      }`}
            >
              Chương trước
            </span>
            <span
              className={`next__chapter
      }`}
            >
              Chương sau
            </span>
          </div>
          <div className="content__chapter">
            <Skeleton
              className="mb-20"
              paragraph={{ rows: 20 }}
              loading={true}
              active
              title={false}
              style={{ padding: "20px" }}
            />
          </div>
        </div>
        <div className="next__prev--chapter">
          <span
            className={`next__chapter
      }`}
          >
            Chương trước
          </span>
          <span
            className={`next__chapter
      }`}
          >
            Chương sau
          </span>
        </div>
      </section>
      <div className="setting__chapter">
        <div className="setting">
          <i className="fa-solid fa-gear"></i>
        </div>
        <a href="#" className="change__story center">
          <i className="fa-solid fa-book" style={{ color: "white" }}></i>
        </a>
        <div className="list__chapter">
          <i className="fa-solid fa-list"></i>
        </div>
        <div className="tick__chapter">
          <i className="fa-regular fa-bookmark"></i>
        </div>
        <div className="next__chapter forbidden center">
          <i className="fa-sharp fa-solid fa-arrow-left"></i>
        </div>

        <div className="next__chapter forbidden center">
          <i className="fa-sharp fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </>
  );
};

export default Loader;
