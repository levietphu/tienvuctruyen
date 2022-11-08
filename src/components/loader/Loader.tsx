import "./loader.scss";

const Loader = () => {
  return (
    <div className="wrapper">
      <div className="box1">
        <div className="profile">
          <div className="skeleton2"></div>
        </div>
        <div className="bio">
          <div className="skeleton3"></div>
        </div>
      </div>
      <div className="box2">
        <div className="gallery">
          <div className="skeleton4"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
