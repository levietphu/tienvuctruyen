import DragStory from "../../components/home/DragStory";
import MainLayout from "../../layouts/MainLayout";
import "./translator.scss";
import imageStory from "../../store";

const Transalator = () => {
  return (
    <MainLayout>
      <div className="translator__header center">
        <div>
          <i className="fa-solid fa-user"></i>
          <div className="translator__name">
            <h1>mocmeo</h1>
            <p>@mocmeo</p>
          </div>
        </div>
      </div>
      <div className="translator__story">
        <h1>
          Truyện dịch bởi <span>mocmeo</span>
        </h1>
        <DragStory imageStory={imageStory} />
      </div>
    </MainLayout>
  );
};

export default Transalator;
