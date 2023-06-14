import "./home.scss";
import MainLayout from "../../layouts/MainLayout";
import GalleryCarousel from "../../components/home/GalleryCarousel";
import Search from "../../components/home/Search";
import DragStory from "../../components/home/DragStory";
import NewUpdateStory from "../../components/home/NewUpdateStory";
import FullStory from "../../components/home/FullStory";
import { HomeContext } from "../../context/HomeContextProvider";
import { useContext, useEffect } from "react";
import PopupFull from "../../layouts/PopupFull";
import { SettingContext } from "../../context/SettingContextProvider";

const HomePage = () => {
  const { dataHome, loaderHome }: any = useContext(HomeContext);
  const { checkPopupHome }: any = useContext(SettingContext);
  useEffect(() => {
    if (checkPopupHome) {
      document.body.classList.add("hidden__scroll");
    } else {
      document.body.classList.remove("hidden__scroll");
    }
  }, [checkPopupHome]);

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
          <DragStory data={dataHome && dataHome.recommendedStory} />
        </div>
        <div className="story">
          <h1 style={{ margin: "0.67em 0" }}>Truyện yêu thích mỗi tuần</h1>
          <DragStory data={dataHome && dataHome.truyenhot_sort_week} />
        </div>
        <div className="story">
          <h1 style={{ margin: "0.67em 0" }}>Bảng xếp hạng truyện vip</h1>
          <DragStory data={dataHome && dataHome.rankVip} vip={1} />
        </div>
        <div className="story">
          <h1 style={{ margin: "0.67em 0" }}>Truyện hot mới ra lò</h1>
          <DragStory data={dataHome && dataHome.hotStory} />
        </div>
        <div className="main__content">
          <div className="story__newupdate">
            <h1 style={{ margin: "0.67em 0" }}>truyện mới cập nhật</h1>
            <NewUpdateStory data={dataHome && dataHome.newUpdateStory} />
          </div>
          <div className="story__full">
            <h1 style={{ margin: "0.67em 0" }}>truyện đã full</h1>
            <FullStory data={dataHome && dataHome.fullStory} />
          </div>
        </div>
      </MainLayout>
      {checkPopupHome && <PopupFull />}
    </>
  );
};

export default HomePage;
