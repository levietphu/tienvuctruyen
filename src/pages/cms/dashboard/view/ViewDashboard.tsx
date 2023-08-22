import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContextProvider";
import { Card, Row, Col } from "antd";

import "../styles/dashboard.scss";

const ViewDashboard = () => {
  const [data, setData] = useState<any>();

  const { user }: any = useContext(AuthContext);

  const getApiDashboard = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API}cms/dashboard?id_user=${user.user.id}`,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setData(res.data.dashboard);
    });
  };

  useEffect(() => {
    getApiDashboard();
  }, []);

  return (
    <div className="" style={{ paddingTop: "40px" }}>
      <Row gutter={[16, 16]}>
        <Col md={6}>
          <Card>
            <h3>Doanh thu hôm nay</h3>
            <p className="today">{data && data.revenue.today} XU</p>
            <p>Tháng này: {data && data.revenue.month} XU</p>
            <p>Tháng trước: {data && data.revenue.last_month} XU</p>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <h3>Mua chương</h3>
            <p className="today">{data && data.buy_chapter.today} chương</p>
            <p>Tháng này: {data && data.buy_chapter.month} chương</p>
            <p>Tháng trước: {data && data.buy_chapter.last_month} chương</p>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <h3>Ủng hộ</h3>
            <p className="today">{data && data.donate.today} XU</p>
            <p>Tháng này: {data && data.donate.month} XU</p>
            <p>Tháng trước: {data && data.donate.last_month} XU</p>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <h3>Đã rút</h3>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ViewDashboard;
