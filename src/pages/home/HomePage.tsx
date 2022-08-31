import React from "react";
import "./home.scss";
import MainLayout from "../../layouts/MainLayout";
import GalleryCarousel from "../../components/home/GalleryCarousel";
import Search from "../../components/home/Search";
import DragStory from "../../components/home/DragStory";
import imageStory from "../../store";
import NewUpdateStory from "../../components/home/NewUpdateStory";
import FullStory from "../../components/home/FullStory";

const HomePage = () => {
  return (
    <MainLayout>
      <GalleryCarousel />
      <Search />
      <div className="story">
        <h1>Truyện đề cử</h1>
        <DragStory imageStory={imageStory} />
      </div>
      <div className="story">
        <h1>Truyện yêu thích mỗi tuần</h1>
        <DragStory imageStory={imageStory} />
      </div>
      <div className="story">
        <h1>Bảng xếp hạng truyện vip</h1>
        <DragStory imageStory={imageStory} />
      </div>
      <div className="story">
        <h1>Truyện hot mới ra lò</h1>
        <DragStory imageStory={imageStory} />
      </div>
      <div className="main__content">
        <div className="story__newupdate">
          <h1>truyện mới cập nhật</h1>
          <NewUpdateStory />
        </div>
        <div className="story__full">
          <h1>truyện đã full</h1>
          <FullStory />
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
