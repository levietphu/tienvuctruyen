import React from "react";

const Loader = () => {
  return (
    <section className="screen-80">
      <div className="header__chapter">
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
        <ul className="o-vertical-spacing o-vertical-spacing--l">
          <li className="blog-post o-media">
            <div className="o-media__figure">
              <span className="skeleton-box"></span>
            </div>
            <div className="o-media__body">
              <div className="o-vertical-spacing">
                <h3 className="blog-post__headline">
                  <span
                    className="skeleton-box"
                    style={{ width: "55%" }}
                  ></span>
                </h3>
                <p>
                  <span
                    className="skeleton-box"
                    style={{ width: "100%" }}
                  ></span>
                  <span
                    className="skeleton-box"
                    style={{ width: "40%" }}
                  ></span>
                  <span
                    className="skeleton-box"
                    style={{ width: "30%" }}
                  ></span>
                  <span
                    className="skeleton-box"
                    style={{ width: "40%" }}
                  ></span>
                </p>
                <div className="blog-post__meta">
                  <span
                    className="skeleton-box"
                    style={{ width: "100%", height: "268px" }}
                  ></span>
                </div>
              </div>
            </div>
          </li>
        </ul>
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
  );
};

export default Loader;
