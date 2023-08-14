import { Row, Col } from "antd";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/layout-cms.scss";
import { useEffect } from "react";
import Props from "../../../../ultis/typeChildren";

const LayoutCms = ({ children }: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Row>
      <Col xs={0} sm={0} md={4} lg={4}>
        <Sidebar />
      </Col>
      <Col xs={24} sm={24} md={20} lg={20}>
        <Header />
        <div className="main-layout-cms">
          <div className="screen-95">{children}</div>
        </div>
        <Footer />
      </Col>
    </Row>
  );
};

export default LayoutCms;
