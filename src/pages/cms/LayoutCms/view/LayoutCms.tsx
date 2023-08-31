import Sidebar from "../components/Sidebar";
import "../styles/layout-cms.scss";
import { useEffect } from "react";
import Props from "../../../../ultis/typeChildren";
import Header from "../../../web/layout/components/Header";
import { LayoutContext } from "../../../../context/LayoutContextProvider";
import { useContext, useState, useCallback } from "react";
import { AuthContext } from "../../../../context/AuthContextProvider";
import axios from "axios";

const LayoutCms = ({ children }: Props) => {
  const [notifications, setNotifications] = useState<any>();
  const [noti_count, setNotiCount] = useState<number>();

  const { dataLayout }: any = useContext(LayoutContext);
  const { user }: any = useContext(AuthContext);

  const getNotification = useCallback(async (page = 1) => {
    await axios
      .get(
        `${process.env.REACT_APP_API}notification?id_user=${user.user.id}&page=${page}`
      )
      .then((res) => {
        setNotifications(res.data.noti_loadcents);
        setNotiCount(res.data.noti_count);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getNotification();
  }, []);

  return (
    <div className="container">
      <header>
        <Header
          cates={dataLayout && dataLayout.cates}
          logo={dataLayout && dataLayout.logo_header}
          notifications={notifications}
          noti_count={noti_count}
          getNotification={getNotification}
        />
      </header>
      <Sidebar />
      <div className="main-layout-cms">{children}</div>
    </div>
  );
};

export default LayoutCms;
