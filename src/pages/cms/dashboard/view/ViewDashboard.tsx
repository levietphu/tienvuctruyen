import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContextProvider";
import { Card, Row, Col, Table, Select, Alert } from "antd";
import "../styles/dashboard.scss";
import { ColumnsType } from "antd/es/table";
import { withdrawMoneyModel } from "../model/withdrawMoneyModel";
import { checkAdmin } from "../../../../ultis/checkPer";

const ViewDashboard = () => {
  const [data, setData] = useState<any>();
  const [message, setMessage] = useState<string>("");

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

  const acceptWithdrawMoney = (id: number, status: number) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API}cms/accept_withdraw_money`,
      data: {
        id,
        status,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      getApiDashboard();
      setMessage(res.data.message);
    });
  };

  useEffect(() => {
    getApiDashboard();
  }, []);

  const columns: ColumnsType<withdrawMoneyModel> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render(value, record, index) {
        return <a>{index + 1}</a>;
      },
    },
    {
      title: "Người tạo",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã giao dịch",
      dataIndex: "transaction_code",
      key: "transaction_code",
    },
    {
      title: "Số xu",
      dataIndex: "coin",
      key: "coin",
    },
    {
      title: "Số tiền tương đương",
      dataIndex: "money",
      key: "money",
    },

    {
      title: "Tên NH",
      dataIndex: "name_bank",
      key: "name_bank",
    },
    {
      title: "Stk",
      dataIndex: "stk",
      key: "stk",
    },
    {
      title: "Chủ tk",
      dataIndex: "owner_account",
      key: "owner_account",
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (value) => {
        return (
          <Select
            defaultValue={value.status}
            onChange={(key) => acceptWithdrawMoney(value.id, key)}
            options={[
              { value: 0, label: "Chờ duyệt" },
              { value: 1, label: "Không được duyệt" },
              { value: 2, label: "Thành công" },
            ]}
            disabled={value.status !== 0}
          />
        );
      },
    },
  ];

  useEffect(() => {
    if (message) {
      let id = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(id);
    }
  }, [message]);

  return (
    <div style={{ paddingTop: "40px" }}>
      <Row gutter={[16, 16]}>
        <Col sm={24} xs={24} md={8} lg={6} xxl={6}>
          <Card>
            <h3>Doanh thu hôm nay</h3>
            <p className="today">{data && data.revenue.today} XU</p>
            <p>Tháng này: {data && data.revenue.month} XU</p>
            <p>Tháng trước: {data && data.revenue.last_month} XU</p>
          </Card>
        </Col>
        <Col sm={24} xs={24} md={8} lg={6} xxl={6}>
          <Card>
            <h3>Mua chương</h3>
            <p className="today">{data && data.buy_chapter.today} chương</p>
            <p>Tháng này: {data && data.buy_chapter.month} chương</p>
            <p>Tháng trước: {data && data.buy_chapter.last_month} chương</p>
          </Card>
        </Col>
        <Col sm={24} xs={24} md={8} lg={6} xxl={6}>
          <Card>
            <h3>Ủng hộ</h3>
            <p className="today">{data && data.donate.today} XU</p>
            <p>Tháng này: {data && data.donate.month} XU</p>
            <p>Tháng trước: {data && data.donate.last_month} XU</p>
          </Card>
        </Col>
        <Col sm={24} xs={24} md={8} lg={6} xxl={6}>
          <Card>
            <h3>Đã rút</h3>
            <p className="today">{data && data.withdraw_money_success} lần</p>
            <p>Đang chờ duyệt: {data && data.withdraw_money_waiting} </p>
            <p style={{ visibility: "hidden" }}>tháng này</p>
          </Card>
        </Col>
        <Col sm={24} xs={24} md={12} lg={12} xxl={12}>
          <Card>
            <h3>Tổng: 0 truyện</h3>
            <p className="today">{data && data.withdraw_money_success} lần</p>
            <p>Đang chờ duyệt: {data && data.withdraw_money_waiting} </p>
            <p style={{ visibility: "hidden" }}>tháng này</p>
          </Card>
        </Col>
      </Row>
      {checkAdmin(user.role, 43) && (
        <>
          {message && <Alert message={message} type="success" />}
          <h3>Thống kê các giao dịch rút tiền</h3>
          <Table
            columns={columns}
            dataSource={data && data.all_withdraw_money}
            rowKey={(record) => record.id}
            scroll={{ x: 0 }}
          />
        </>
      )}
    </div>
  );
};

export default ViewDashboard;
