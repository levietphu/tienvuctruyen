const Loader = () => {
  return (
    <div className="header__story">
      <div className="header__story--left">
        <div className="header__story--image">
          <ul className="o-vertical-spacing o-vertical-spacing--l">
            <li className="blog-post o-media">
              <div className="o-media__figure">
                <span
                  className="skeleton-box"
                  style={{ width: "270px", height: "405px" }}
                ></span>
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
      </div>
    </div>
  );
};

export default Loader;
