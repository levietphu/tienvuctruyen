import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookCase from "../components/account/BookCase";
import VipBuy from "../components/account/VipBuy";
import CatePage from "../pages/cate/CatePage";
import Chapterpage from "../pages/chapter/Chapterpage";
import HomePage from "../pages/home/HomePage";
import PersonalPage from "../pages/personal/PersonalPage";
import Story from "../pages/story/Story";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";

const routes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/the-loai/:slugcate" element={<CatePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/:slug" element={<Story />} />
        <Route path="/:slugtruyen/:slugchapter" element={<Chapterpage />} />
        <Route path="account" element={<PersonalPage />}>
          <Route path="" element={<BookCase />} />
          <Route path="vipbuy" element={<VipBuy />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default routes;
