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
import Dashboard from "../pages/cms/dashboard/view/Dashboard";
import ViewCate from "../pages/cms/cate/views/ViewCate";
import ViewDashboard from "../pages/cms/dashboard/view/ViewDashboard";
import ViewAuthor from "../pages/cms/author/views/ViewAuthor";
import ViewTranslator from "../pages/cms/translator/views/ViewTranslator";
import ViewAds from "../pages/cms/ads/views/ViewAds";
import ViewContact from "../pages/cms/contact/views/ViewContact";
import ViewLogo from "../pages/cms/logo/views/ViewLogo";
import ViewBanner from "../pages/cms/banner/views/ViewBanner";
import ViewStory from "../pages/cms/story/views/ViewStory";
import CreateStory from "../pages/cms/story/views/CreateStory";
import EditStory from "../pages/cms/story/views/EditStory";
import ViewChapter from "../pages/cms/chapter/views/ViewChapter";

const routes = ({ user, loaderUser }: any) => {
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
          path="dashboard"
          element={
            user || loaderUser !== "login" ? (
              <Dashboard />
            ) : (
              !user && loaderUser === "login" && <Navigate to="/login" />
            )
          }
        >
          <Route path="" element={<ViewDashboard />} />
          <Route path="cate/view" element={<ViewCate />} />
          <Route path="author/view" element={<ViewAuthor />} />
          <Route path="translator/view" element={<ViewTranslator />} />
          <Route path="ads/view" element={<ViewAds />} />
          <Route path="contact/view" element={<ViewContact />} />
          <Route path="logo/view" element={<ViewLogo />} />
          <Route path="banner/view" element={<ViewBanner />} />
          <Route path="story/view" element={<ViewStory />} />
          <Route path="story/create" element={<CreateStory />} />
          <Route path="story/edit/:id_story" element={<EditStory />} />
          <Route path="chapter/:id_story/view" element={<ViewChapter />} />
          <Route path="*" element={<a>Not Found</a>} />
        </Route>

        <Route
          path="account"
          element={
            user || loaderUser !== "login" ? (
              <PersonalPage />
            ) : (
              !user && loaderUser === "login" && <Navigate to="/login" />
            )
          }
        >
          <Route path="" element={<BookCase />} />
          <Route path="vipbuy" element={<VipBuy />} />
          <Route path="coin" element={<Coin />} />
          <Route path="*" element={<a>Not Found</a>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default routes;
