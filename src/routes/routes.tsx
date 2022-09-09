import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CatePage from "../pages/cate/CatePage";
import Chapterpage from "../pages/chapter/Chapterpage";
import HomePage from "../pages/home/HomePage";
import PersonalPage from "../pages/personal/PersonalPage";
import Story from "../pages/story/Story";

const routes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/the-loai/:slug" element={<CatePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug" element={<Story />} />
        <Route path="/:slugtruyen/:slugchapter" element={<Chapterpage />} />
        <Route path="/account" element={<PersonalPage />} />
      </Routes>
    </Router>
  );
};

export default routes;
