import "./cate.scss";
import MainLayout from "../../layouts/MainLayout";
import NewUpdateStory from "../../components/home/NewUpdateStory";
import Pagination from "../../components/cate/Pagination";

const CatePage = () => {
  return (
    <MainLayout>
      <div className="cate__page">
        <h1 className="cate-title">Truyện tiên hiệp</h1>
        <div className="cate-content">
          <NewUpdateStory />
          <Pagination />
        </div>
      </div>
    </MainLayout>
  );
};

export default CatePage;
