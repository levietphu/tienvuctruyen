import { useContext, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { Modal } from "antd";
import { routesWeb } from "./routesWeb";
import { RouteProps } from "../../store/common/interface";
import PersonalPage from "./personal/view/PersonalPage";
import BookCase from "./personal/view/BookCase";
import VipBuy from "./personal/view/VipBuy";
import Coin from "./personal/view/Coin";
import { AuthContext } from "../../context/AuthContextProvider";

const Web = () => {
  const { user, loaderUser }: any = useContext(AuthContext);

  return (
    <>
      <Routes>
        {routesWeb.map((route: RouteProps, idx: number) => {
          return (
            <Route key={idx} path={route.path} element={route.component} />
          );
        })}
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
    </>
  );
};

export default Web;
