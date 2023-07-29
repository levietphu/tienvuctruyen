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
  Image,
  message,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../styles/view-logo.scss";
import type { ColumnsType } from "antd/es/table";
import { createLogo, hiddenLogo, getLogo, updateLogo } from "../api";
import { useEffect, useState } from "react";
import { changeToSlug } from "../../../../ultis/changeToSlug";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

interface DataType {
  id: number;
  name: string;
  value: string;
  status: number;
}

const ViewLogo: React.FC = () => {
  const [dataLogo, setDataLogo] = useState<any>();
  const [open, setOpen] = useState(false);
  const [errorLogo, setErrorLogo] = useState<any>();
  const [alert, setAlert] = useState("");
  const [idLogo, setIdLogo] = useState<any>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [form] = Form.useForm();

  const columns: ColumnsType<DataType> = [
    {
      title: "Stt",
      dataIndex: "id",
      key: "id",
      render(value, record, index) {
        return <a>{index + 1}</a>;
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "value",
      key: "value",
      render(value) {
        return (
          <Image
            width={50}
            src={`${process.env.REACT_APP_UPLOADS}Config/${value}`}
            preview={false}
          />
        );
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (_, record) => {
        return (
          <span style={{ background: `${record.status === 1 ? "" : "red"}` }}>
            {" "}
            {record.status === 1 ? "Publish" : "Unpublish"}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (value) => (
        <>
          <span
            className="span-action"
            style={{ background: "green" }}
            onClick={() => showModal(value)}
          >
            Sửa
          </span>
          <span
            className="span-action"
            style={{ marginLeft: "10px", background: "red" }}
            onClick={() => {
              if (
                // eslint-disable-next-line no-restricted-globals
                confirm(`Bạn có muốn ẩn Logo ${value.name} này không`) === true
              ) {
                destroyLogo(value.id);
              }
            }}
          >
            Ẩn
          </span>
        </>
      ),
    },
  ];

  useEffect(() => {
    getLogo()
      .then((res: any) => {
        setDataLogo(res.data.logo);
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

  const showModal = (values: any) => {
    setOpen(true);
    if (values) {
      form.setFieldsValue({
        name: values.name,
        slug: values.slug,
        value: values.value,
        status: values.status,
      });
      setIdLogo(values.id);
      setFileList([
        {
          uid: values.id,
          name: values.name,
          status: "done",
          url: `${process.env.REACT_APP_UPLOADS}Config/${values.value}`,
        },
      ]);
    }
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setErrorLogo("");
    setIdLogo("");
    setFileList([]);
  };

  // Thêm mới logo
  const postLogo = async (values: any) => {
    await createLogo(values)
      .then((res: any) => {
        setAlert(res.data.message);
        handleCancel();
        getLogo().then((res: any) => {
          setDataLogo(res.data.logo);
        });
      })
      .catch((err) => setErrorLogo(err.response.data.errors));
  };

  // Cập nhật logo
  const changeLogo = async (values: any) => {
    values.id = idLogo;
    await updateLogo(idLogo, values)
      .then((res) => {
        setAlert(res.data.message);
        handleCancel();
        getLogo().then((res: any) => {
          setDataLogo(res.data.logo);
        });
      })
      .catch((err) => setErrorLogo(err.response.data.errors));
  };

  //Xóa logo
  const destroyLogo = async (id: number) => {
    await hiddenLogo(id)
      .then((res) => {
        setAlert(res.data.message);
        getLogo().then((res: any) => {
          setDataLogo(res.data.logo);
        });
      })
      .catch((err) => console.log(err));
  };

  const saveLogo = (values: any) => {
    if (!idLogo) {
      postLogo(values);
    } else {
      changeLogo(values);
    }
  };

  const handleChange = (changedValues: any, allValues: any) => {
    allValues.slug = changeToSlug(changedValues.name);
    form.setFieldsValue({
      slug: changeToSlug(allValues.name),
    });
  };

  const props: UploadProps = {
    name: "value",
    action: `${process.env.REACT_APP_API}cms/upload_logo`,

    accept: "image/png, image/gif, image/jpeg",
    listType: "picture-card",
    fileList: fileList,
    onChange(info) {
      if (!idLogo) {
        setFileList(info.fileList);
      } else {
        setFileList(
          info.fileList.filter((item: any, index: any) => {
            return item.uid !== idLogo;
          })
        );
      }
      if (info.file.status !== "uploading") {
        console.log("đang tải lên");
      }
      if (info.file.status === "done") {
        message.success(` tải ảnh ${info.file.name} lên thành công`);
      } else if (info.file.status === "error") {
        message.error(` tải ảnh ${info.file.name} lên thất bại`);
      }
    },
  };

  const uploadButton = (
    <div>
      <PlusOutlined rev={undefined} />
      <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
    </div>
  );

  return (
    <>
      <div className="top-main">
        <p>Danh sách Logo</p>
        <div className="top-main__right">
          <a href="">Logo</a> / <span>Danh sách Logo</span>
        </div>
      </div>
      <Card>
        <Button
          type="primary"
          onClick={() => showModal("")}
          style={{ marginBottom: "20px" }}
        >
          Thêm mới
        </Button>
        {alert && (
          <Alert
            message={alert}
            type="success"
            closable
            style={{ marginBottom: "20px", fontSize: "24px" }}
          />
        )}

        <Modal
          title={`${idLogo ? "Sửa Logo" : "Thêm mới Logo"}`}
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
            initialValues={{ name: "", slug: "", value: "", status: 1 }}
            form={form}
            onFinish={saveLogo}
            onValuesChange={handleChange}
          >
            <Form.Item
              label="Tên Logo"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Tên Logo không được bỏ trống",
                },
                {
                  max: 255,
                  message: "Tên Logo không được quá 255 ký tự",
                },
              ]}
            >
              <Input type="text" name="name" />
            </Form.Item>
            <Row className="error">
              <Col md={6}>
                <div></div>
              </Col>
              <Col md={18}>
                {errorLogo &&
                  errorLogo.name &&
                  errorLogo.name.map((item: any, index: number) => {
                    return (
                      <p key={index} style={{ color: "red" }}>
                        {item}
                      </p>
                    );
                  })}
              </Col>
            </Row>
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
            <Row className="error">
              <Col md={6}>
                <div></div>
              </Col>
              <Col md={18}>
                {errorLogo &&
                  errorLogo.slug &&
                  errorLogo.slug.map((item: any, index: number) => {
                    return (
                      <p key={index} style={{ color: "red" }}>
                        {item}
                      </p>
                    );
                  })}
              </Col>
            </Row>
            <Form.Item label="Ảnh" name="value">
              <Upload {...props}>
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Row className="error">
              <Col md={6}>
                <div></div>
              </Col>
              <Col md={18}>
                {errorLogo &&
                  errorLogo.value &&
                  errorLogo.value.map((item: any, index: number) => {
                    return (
                      <p key={index} style={{ color: "red" }}>
                        {item}
                      </p>
                    );
                  })}
              </Col>
            </Row>

            <Form.Item label="Trạng thái" name="status">
              <Select
                options={[
                  { value: 1, label: "Publish" },
                  { value: 0, label: "Unpublish" },
                ]}
              />
            </Form.Item>
            <Row className="error">
              <Col md={6}>
                <div></div>
              </Col>
              <Col md={18}>
                {errorLogo &&
                  errorLogo.status &&
                  errorLogo.status.map((item: any, index: number) => {
                    return (
                      <p key={index} style={{ color: "red" }}>
                        {item}
                      </p>
                    );
                  })}
              </Col>
            </Row>
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
          dataSource={dataLogo}
          rowKey={(record) => record.id}
        />
      </Card>
    </>
  );
};

export default ViewLogo;
function getBase64(
  arg0: RcFile
): string | PromiseLike<string | undefined> | undefined {
  throw new Error("Function not implemented.");
}
