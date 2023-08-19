import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import BookCase from "../pages/web/personal/view/BookCase";
import Coin from "../pages/web/personal/view/Coin";
import VipBuy from "../pages/web/personal/view/VipBuy";
import CatePage from "../pages/web/cate/view/CatePage";
import Chapterpage from "../pages/web/chapter/view/Chapterpage";
import HomePage from "../pages/web/home/view/HomePage";
import PersonalPage from "../pages/web/personal/view/PersonalPage";
import Story from "../pages/web/story/view/Story";
import Transalator from "../pages/web/translator/view/Transalator";
import Login from "../pages/web/user/Login";
import Register from "../pages/web/user/Register";
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
import ViewUser from "../pages/cms/user/views/ViewUser";
import ViewPermission from "../pages/cms/permission/views/ViewPermission";
import ViewRole from "../pages/cms/role/views/ViewRole";
import HomeContextProvider from "../context/HomeContextProvider";
import { checkPer } from "../ultis/checkPer";
import NotFound from "../pages/web/NotFound/view/NotFound";
import ViewDiscount from "../pages/cms/discount/views/ViewDiscount";
import ViewBankInfo from "../pages/cms/bankinfo/views/ViewBankInfo";
import ViewLoadCent from "../pages/cms/loadcents/views/ViewLoadCent";

const routes = ({ user, loaderUser }: any) => {
  return (
    <Router>
      <Routes>
        <Route path="/the-loai/:slugcate" element={<CatePage />} />
        <Route path="/danh-sach/:sluglist" element={<CatePage />} />
        <Route path="/dich-gia/:slugdichgia" element={<Transalator />} />

        <Route
          path="/"
          element={
            <HomeContextProvider>
              <HomePage />
            </HomeContextProvider>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/:slug" element={<Story />} />
        <Route path="/:slugstory/:slugchapter" element={<Chapterpage />} />

        <Route
          path="dashboard"
          element={
            user && user.role.length <= 0 ? (
              <a>Bạn không có quyền vào trang này</a>
            ) : user || loaderUser !== "login" ? (
              <Dashboard />
            ) : (
              !user && loaderUser === "login" && <Navigate to="/login" />
            )
          }
        >
          <Route path="" element={<ViewDashboard />} />
          <Route
            path="cate/view"
            element={
              user && checkPer(user.role, "cate-view") ? (
                <ViewCate />
              ) : (
                <p style={{ fontSize: "24px" }}>Bạn không đủ quyền vào</p>
              )
            }
          />
          <Route
            path="author/view"
            element={
              user && checkPer(user.role, "author-view") ? (
                <ViewAuthor />
              ) : (
                <p style={{ fontSize: "24px" }}>Bạn không đủ quyền vào</p>
              )
            }
          />
          <Route
            path="trans/view"
            element={
              user && checkPer(user.role, "trans-view") ? (
                <ViewTranslator />
              ) : (
                <p style={{ fontSize: "24px" }}>Bạn không đủ quyền vào</p>
              )
            }
          />
          <Route
            path="ads/view"
            element={
              user && checkPer(user.role, "ads-view") ? (
                <ViewAds />
              ) : (
                <p style={{ fontSize: "24px" }}>Bạn không đủ quyền vào</p>
              )
            }
          />
          <Route
            path="contact/view"
            element={
              user && checkPer(user.role, "contact-view") ? (
                <ViewContact />
              ) : (
                <p style={{ fontSize: "24px" }}>Bạn không đủ quyền vào</p>
              )
            }
          />
          <Route
            path="logo/view"
            element={
              user && checkPer(user.role, "logo-view") ? (
                <ViewLogo />
              ) : (
                <p style={{ fontSize: "24px" }}>Bạn không đủ quyền vào</p>
              )
            }
          />
          <Route
            path="banner/view"
            element={
              user && checkPer(user.role, "banner-view") ? (
                <ViewBanner />
              ) : (
                <p style={{ fontSize: "24px" }}>Bạn không đủ quyền vào</p>
              )
            }
          />
          <Route
            path="bankinfo/view"
            element={
              user && checkPer(user.role, "bankinfo-view") ? (
                <ViewBankInfo />
              ) : (
                <p style={{ fontSize: "24px" }}>Bạn không đủ quyền vào</p>
              )
            }
          />
          <Route
            path="story/view"
            element={
              user && checkPer(user.role, "story-view") ? (
                <ViewStory />
              ) : (
                <p style={{ fontSize: "24px" }}>Bạn không đủ quyền vào</p>
              )
            }
          />
          <Route
            path="user/view"
            element={
              user && checkPer(user.role, "user-view") ? (
                <ViewUser />
              ) : (
                <p style={{ fontSize: "24px" }}>Bạn không đủ quyền vào</p>
              )
            }
          />
          <Route
            path="per/view"
            element={
              user && checkPer(user.role, "per-view") ? (
                <ViewPermission />
              ) : (
                <p style={{ fontSize: "24px" }}>Bạn không đủ quyền vào</p>
              )
            }
          />
          <Route
            path="role/view"
            element={
              user && checkPer(user.role, "role-view") ? (
                <ViewRole />
              ) : (
                <p style={{ fontSize: "24px" }}>Bạn không đủ quyền vào</p>
              )
            }
          />
          <Route
            path="story/create"
            element={
              user && checkPer(user.role, "story-create") ? (
                <CreateStory />
              ) : (
                <p style={{ fontSize: "24px" }}>Bạn không đủ quyền vào</p>
              )
            }
          />
          <Route
            path="story/edit/:id_story"
            element={
              user && checkPer(user.role, "story-edit") ? (
                <EditStory />
              ) : (
                <p style={{ fontSize: "24px" }}>Bạn không đủ quyền vào</p>
              )
            }
          />
          <Route path="discount/:id_story/view" element={<ViewDiscount />} />
          <Route path="chapter/:id_story/view" element={<ViewChapter />} />
          <Route path="loadcent/:id_bankinfo/view" element={<ViewLoadCent />} />
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
