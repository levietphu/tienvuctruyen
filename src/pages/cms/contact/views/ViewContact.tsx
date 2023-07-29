import {
  Card,
  Button,
  Table,
  Alert,
  Row,
  Col,
  Form,
  Input,
  Modal,
  Select,
} from "antd";
import "../styles/view-contact.scss";
import { getContact, updateContact } from "../api";
import { useEffect, useState } from "react";
import { changeToSlug } from "../../../../ultis/changeToSlug";

const ViewContact: React.FC = () => {
  const [dataContact, setDataContact] = useState<any>();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState("");
  const [idContact, setIdContact] = useState<any>();

  const [form] = Form.useForm();

  useEffect(() => {
    getContact()
      .then((res: any) => {
        setDataContact(res.data.contact);
        document
          .querySelector(".map")
          ?.insertAdjacentHTML("afterend", res.data.contact.map.value);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (alert) {
      var a = setTimeout(() => {
        setAlert("");
      }, 3000);
    }
    return () => clearTimeout(a);
  }, [alert]);

  const showModal = (id: number, data: any) => {
    setOpen(true);
    form.setFieldsValue({
      name: data.name,
      slug: data.slug,
      value: data.value,
      status: data.status,
    });
    setIdContact(id);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setIdContact("");
  };

  // Cập nhật Contact
  const changeContact = async (values: any) => {
    values.id = idContact;
    await updateContact(idContact, values)
      .then((res) => {
        setAlert(res.data.message);
        handleCancel();
        getContact().then((res: any) => {
          setDataContact(res.data.contact);
        });
      })
      .catch((err) => console.log(err.response.data.errors));
  };

  const saveContact = (values: any) => {
    changeContact(values);
  };

  const handleChange = (changedValues: any, allValues: any) => {
    allValues.slug = changeToSlug(changedValues.name);
    form.setFieldsValue({
      slug: changeToSlug(allValues.name),
    });
  };

  return (
    <>
      <div className="top-main">
        <p>Danh sách Liên lạc</p>
        <div className="top-main__right">
          <a href="">Liên lạc</a> / <span>Danh sách Liên lạc</span>
        </div>
      </div>
      <Card>
        {alert && (
          <Alert
            message={alert}
            type="success"
            closable
            style={{ marginBottom: "20px", fontSize: "24px" }}
          />
        )}

        <Modal
          title={`${idContact ? "Sửa Liên lạc" : "Thêm mới Liên lạc"}`}
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
            initialValues={{ name: "", slug: "", status: 1 }}
            form={form}
            onFinish={saveContact}
            onValuesChange={handleChange}
          >
            <Form.Item
              label="Tên Contact"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Tên Contact không được bỏ trống",
                },
                {
                  max: 255,
                  message: "Tên Contact không được quá 255 ký tự",
                },
              ]}
            >
              <Input type="text" name="name" />
            </Form.Item>

            <Form.Item
              label="Slug"
              name="slug"
              rules={[
                { required: true, message: "slug không được bỏ trống" },
                { max: 255, message: "slug không được quá 255 ký tự" },
              ]}
            >
              <Input type="text" name="slug" disabled />
            </Form.Item>

            <Form.Item
              label="Giá trị"
              name="value"
              rules={[
                { required: true, message: "giá trị không được bỏ trống" },
              ]}
            >
              <Input type="text" name="value" />
            </Form.Item>

            <Form.Item label="Trạng thái" name="status">
              <Select
                options={[
                  { value: 1, label: "Publish" },
                  { value: 0, label: "Unpublish" },
                ]}
              />
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

        <Row gutter={[20, 20]}>
          <Col md={12}>
            <Card style={{ height: "200px" }}>
              <p className="text-contact">
                Địa chỉ:{" "}
                <strong>{dataContact && dataContact.address.value}</strong>
                <span
                  style={{
                    cursor: "pointer",
                    background: "#1eb553",
                    padding: "5px 10px",
                    color: "white",
                  }}
                  onClick={() =>
                    showModal(dataContact.address.id, dataContact.address)
                  }
                >
                  Sửa
                </span>
              </p>
              <p className="text-contact">
                Email: <strong>{dataContact && dataContact.email.value}</strong>
                <span
                  style={{
                    cursor: "pointer",
                    background: "#1eb553",
                    padding: "5px 10px",
                    color: "white",
                  }}
                  onClick={() =>
                    showModal(dataContact.email.id, dataContact.email)
                  }
                >
                  Sửa
                </span>
              </p>
              <p className="text-contact">
                Số điện thoại:{" "}
                <strong>{dataContact && dataContact.phone.value}</strong>
                <span
                  style={{
                    cursor: "pointer",
                    background: "#1eb553",
                    padding: "5px 10px",
                    color: "white",
                  }}
                  onClick={() =>
                    showModal(dataContact.phone.id, dataContact.phone)
                  }
                >
                  Sửa
                </span>
              </p>
            </Card>
          </Col>
          <Col md={12}>
            <Card style={{ height: "200px" }}>
              <h2>Thời gian làm việc</h2>
              <p className="text-contact">
                {dataContact && dataContact.worktime.value}
                <span
                  style={{
                    cursor: "pointer",
                    background: "#1eb553",
                    padding: "5px 10px",
                    color: "white",
                  }}
                  onClick={() =>
                    showModal(dataContact.worktime.id, dataContact.worktime)
                  }
                >
                  Sửa
                </span>
              </p>
            </Card>
          </Col>
          <Col md={24}>
            <Card>
              <h4>
                Bản đồ{" "}
                <span
                  style={{
                    cursor: "pointer",
                    background: "#1eb553",
                    padding: "5px 10px",
                    color: "white",
                  }}
                  onClick={() => showModal(dataContact.map.id, dataContact.map)}
                >
                  Sửa
                </span>
              </h4>
              <div className="map"></div>
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ViewContact;
