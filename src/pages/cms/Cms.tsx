import { Routes, Route, Navigate } from "react-router-dom";
import routesCms from "./routesCms";
import { RouteProps } from "../../store/common/interface";
import { AuthContext } from "../../context/AuthContextProvider";
import { useContext } from "react";
import { checkPer } from "../../ultis/checkPer";
import Dashboard from "./dashboard/view/Dashboard";
import NotFound from "../web/NotFound/view/NotFound";

const Cms = () => {
  const { user, loaderUser }: any = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/"
        element={
          user && user.role.length <= 0 ? (
            <a>Bạn không có quyền vào trang này</a>
          ) : user ? (
            <Dashboard />
          ) : (
            !user && loaderUser === "login" && <Navigate to="/login" />
          )
        }
      >
        {routesCms.map((route: RouteProps, idx: number) => {
          return (
            <Route
              path={route.path}
              element={
                user && (checkPer(user.role, route.per) || !route.per) ? (
                  route.component
                ) : (
                  <p style={{ fontSize: "24px" }}>Bạn không đủ quyền vào</p>
                )
              }
              key={idx}
            />
          );
        })}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Cms;
