import "./home.scss";
import MainLayout from "../../../layouts/MainLayout";
import GalleryCarousel from "../../../components/home/GalleryCarousel";
import Search from "../../../components/home/Search";
import DragStory from "../../../components/home/DragStory";
import NewUpdateStory from "../../../components/home/NewUpdateStory";
import FullStory from "../../../components/home/FullStory";
import { HomeContext } from "../../../context/HomeContextProvider";
import { useContext, useEffect, useState } from "react";
import PopupFull from "./components/PopupFull";
import DragLoader from "./LoaderHome/DragLoader";
import { Modal } from "antd";

const HomePage = () => {
  const { dataHome, loaderHome, checkPopupHome }: any = useContext(HomeContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (checkPopupHome) {
      showModal();
    } else {
      handleCancel();
    }
  }, [checkPopupHome]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.title = "Truyện dịch online - Đọc truyện dịch mới nhất | Tiên Vực";
  }, []);

  return (
    <>
      <MainLayout>
        <GalleryCarousel loaderHome={loaderHome} banners={dataHome?.banners} />
        <Search />
        <div className="story">
          <h1 style={{ margin: "0.67em 0" }}>Truyện đề cử</h1>
          {!loaderHome && dataHome.recommendedStory ? (
            <DragStory data={dataHome.recommendedStory} />
          ) : (
            <DragLoader />
          )}
        </div>
        <div className="story">
          <h1 style={{ margin: "0.67em 0" }}>Truyện yêu thích mỗi tuần</h1>
          {!loaderHome ? (
            <DragStory data={dataHome.truyenhot_sort_week} />
          ) : (
            <DragLoader />
          )}
        </div>
        <div className="story">
          <h1 style={{ margin: "0.67em 0" }}>Bảng xếp hạng truyện vip</h1>
          {!loaderHome ? (
            <DragStory data={dataHome.rankVip} vip={1} />
          ) : (
            <DragLoader />
          )}
        </div>
        <div className="story">
          <h1 style={{ margin: "0.67em 0" }}>Truyện hot mới ra lò</h1>
          {!loaderHome ? (
            <DragStory data={dataHome.hotStory} />
          ) : (
            <DragLoader />
          )}
        </div>
        <div className="main__content">
          <div className="story__newupdate">
            <h1 style={{ margin: "0.67em 0" }}>Truyện mới cập nhật</h1>
            <NewUpdateStory data={dataHome && dataHome.newUpdateStory} />
          </div>
          <div className="story__full">
            <h1 style={{ margin: "0.67em 0" }}>Truyện đã full</h1>
            <FullStory data={dataHome && dataHome.fullStory} />
          </div>
        </div>
      </MainLayout>{" "}
      <Modal open={open} onOk={handleOk} onCancel={handleCancel}>
        <PopupFull />
      </Modal>
    </>
  );
};

export default HomePage;
