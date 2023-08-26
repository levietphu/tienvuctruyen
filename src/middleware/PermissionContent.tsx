import { Route, Routes } from "react-router-dom";
import routes from "../routes/routes";
import { RouteProps } from "../store/common/interface";

const PermissionContent = () => {
  return (
    <Routes>
      {routes.map((route: RouteProps, idx: number) => {
        return <Route path={route.path} key={idx} element={route.component} />;
      })}
    </Routes>
  );
};

export default PermissionContent;
