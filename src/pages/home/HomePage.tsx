import React from "react";
import "./home.scss";
import MainLayout from "../../layouts/MainLayout";
import GalleryCarousel from "../../components/home/GalleryCarousel";
import Search from "../../components/home/Search";
import DragStory from "../../components/home/DragStory";

const HomePage = () => {
  return (
    <MainLayout>
      <GalleryCarousel />
      <Search />
      <div className="recomended__story">
        <h1>Truyện đề cử</h1>
        <DragStory />
      </div>
    </MainLayout>
  );
};

export default HomePage;
