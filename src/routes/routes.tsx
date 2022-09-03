import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CatePage from "../pages/cate/CatePage";
import HomePage from "../pages/home/HomePage";
import Story from "../pages/story/Story";

const routes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/the-loai/:slug" element={<CatePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug" element={<Story />} />
      </Routes>
    </Router>
  );
};

export default routes;
