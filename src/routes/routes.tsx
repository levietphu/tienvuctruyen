import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import BookCase from "../components/account/BookCase";
import Coin from "../components/account/Coin";
import VipBuy from "../components/account/VipBuy";
import CatePage from "../pages/cate/CatePage";
import Chapterpage from "../pages/chapter/Chapterpage";
import HomePage from "../pages/home/HomePage";
import PersonalPage from "../pages/personal/PersonalPage";
import Story from "../pages/story/Story";
import Transalator from "../pages/translator/Transalator";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";

const routes = ({ user }: any) => {
  return (
    <Router>
      <Routes>
        <Route path="/the-loai/:slugcate" element={<CatePage />} />
        <Route path="/danh-sach/:sluglist" element={<CatePage />} />
        <Route path="/dich-gia/:slugdichgia" element={<Transalator />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route path="/:slug" element={<Story />} />
        <Route path="/:slugstory/:slugchapter" element={<Chapterpage />} />
        <Route
          path="account"
          element={user ? <PersonalPage /> : <Navigate to="/login" />}
        >
          <Route path="" element={<BookCase />} />
          <Route path="vipbuy" element={<VipBuy />} />
          <Route path="coin" element={<Coin />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default routes;
