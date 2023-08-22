import {
  Card,
  Button,
  Table,
  Alert,
  Form,
  Input,
  Modal,
  Tooltip,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataType } from "../model/withdrawMoneyModel";
import { AuthContext } from "../../../../context/AuthContextProvider";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const WithdrawMoneyView: React.FC = () => {
  const [datawithdrawMoney, setDatawithdrawMoney] = useState<any>();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState("");

  const { user }: any = useContext(AuthContext);

  const [form] = Form.useForm();

  const getWithdrawMoneyHistory = async () => {
    axios
      .get(`${process.env.REACT_APP_API}cms/withdraw_money/index`)
      .then((res) => setDatawithdrawMoney(res.data.withdraw_money))
      .catch((err) => console.log(err));
  };

  // Thêm mới withdrawMoney
  const createWithdrawMoney = async (values: any) => {
    await axios
      .post(`${process.env.REACT_APP_API}cms/withdraw_money/create`, values)
      .then((res) => {
        setAlert(res.data.message);
        getWithdrawMoneyHistory();
        handleCancel();
      })
      .catch((err) => console.log(err));
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render(value, record, index) {
        return <a>{index + 1}</a>;
      },
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
      title: "Trạng thái",
      key: "status",
      render: (value) => {
        return (
          <Select
            defaultValue={value.status}
            // onChange={(key) =>
            //   changeStatusPayment(value.id, key, value.coin_number)
            // }
            options={[
              { value: 0, label: "Chờ duyệt" },
              { value: 1, label: "Không thành công" },
              { value: 2, label: "Thành công" },
            ]}
            disabled={value.status !== 0}
          />
        );
      },
    },
  ];

  useEffect(() => {
    getWithdrawMoneyHistory();
  }, []);

  useEffect(() => {
    if (alert) {
      var a = setTimeout(() => {
        setAlert("");
      }, 3000);
    }
    return () => clearTimeout(a);
  }, [alert]);

  const showModal = (value: any) => {
    setOpen(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleChange = (changedValues: any, allValues: any) => {
    if (changedValues.coin) {
      allValues.money = Math.round(changedValues.coin / 0.018);
      form.setFieldsValue({
        money: Math.round(changedValues.coin / 0.018),
      });
    }
    if (changedValues.coin === "") {
      form.setFieldsValue({
        money: 0,
      });
    }
  };

  const handleSave = (values: any) => {
    values.transaction_code = "RT" + Math.floor(Math.random() * 100000000000);
    values.id_user = user.user.id;
    createWithdrawMoney(values);
  };

  return (
    <>
      <div className="top-main">
        <p>Danh sách Rút tiền</p>
        <div className="top-main__right">
          <a href="">Rút tiền</a> / <span>Danh sách Rút tiền</span>
        </div>
      </div>
      <Card>
        <Tooltip title="Tạo lệnh rút tiền" color={"blue"}>
          <Button
            type="primary"
            onClick={() => showModal("")}
            style={{ marginBottom: "20px" }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Tooltip>
        {alert && (
          <Alert
            message={alert}
            type="success"
            closable
            style={{ marginBottom: "20px", fontSize: "24px" }}
          />
        )}

        <Modal
          title="Tạo lệnh rút tiền"
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            name="wrap"
            labelCol={{ flex: "110px" }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 600 }}
            initialValues={{ coin: 180, money: 10000 }}
            form={form}
            onFinish={handleSave}
            onValuesChange={handleChange}
          >
            <Form.Item
              label="Số xu"
              name="coin"
              rules={[{ required: true, message: "Số xu không được bỏ trống" }]}
            >
              <Input type="number" name="coin" min={180} />
            </Form.Item>
            <Form.Item label="Số tiền tương đương" name="money">
              <Input type="number" name="money" disabled />
            </Form.Item>

            <div className="submit-button">
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Lưu
              </Button>
              <Button type="primary" danger onClick={handleCancel}>
                Hủy
              </Button>
            </div>
          </Form>
        </Modal>

        <Table
          columns={columns}
          dataSource={datawithdrawMoney}
          rowKey={(record) => record.id}
        />
      </Card>
    </>
  );
};

export default WithdrawMoneyView;
