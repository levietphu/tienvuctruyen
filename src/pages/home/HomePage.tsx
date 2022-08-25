import React from "react";
import "./home.scss";
import MainLayout from "../../layouts/MainLayout";
import GalleryCarousel from "../../components/home/GalleryCarousel";
import Search from "../../components/home/Search";
import RecommendedStory from "../../components/home/RecommendedStory";

const HomePage = () => {
  return (
    <MainLayout>
      <GalleryCarousel />
      <Search />
      <RecommendedStory />
    </MainLayout>
  );
};

export default HomePage;
