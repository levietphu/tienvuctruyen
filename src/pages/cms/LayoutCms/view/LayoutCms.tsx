import Sidebar from "../components/Sidebar";
import "../styles/layout-cms.scss";
import { useEffect } from "react";
import Props from "../../../../ultis/typeChildren";
import Header from "../../../web/layout/components/Header";
import { LayoutContext } from "../../../../context/LayoutContextProvider";
import { useContext } from "react";

const LayoutCms = ({ children }: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { dataLayout }: any = useContext(LayoutContext);

  return (
    <div className="container">
      <header>
        <Header
          cates={dataLayout && dataLayout.cates}
          logo={dataLayout && dataLayout.logo_header}
        />
      </header>
      <div className="flex">
        <Sidebar />
        <div className="main-layout-cms">{children}</div>
      </div>
    </div>
  );
};

export default LayoutCms;
