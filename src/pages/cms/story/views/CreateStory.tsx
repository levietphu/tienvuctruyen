import {
  Card,
  Button,
  Row,
  Col,
  Form,
  Input,
  Select,
  message,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../styles/view-story.scss";
import { createStory, storeStory } from "../api";
import { useContext, useEffect, useState } from "react";
import type { UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { Link, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { changeToSlug } from "../../../../ultis/changeToSlug";
import { AuthContext } from "../../../../context/AuthContextProvider";
import { useAppDispatch } from "../../store/hookStore";

const CreateStory: React.FC = () => {
  const [data, setData] = useState({
    authors: [],
    trans: [],
    cates: [],
  });
  const [discount, setDiscount] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [errorStory, setErrorStory] = useState<any>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [form] = Form.useForm();

  const { user }: any = useContext(AuthContext);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  useEffect(() => {
    createStory()
      .then((res) => {
        setData({
          authors: res.data.author,
          trans: res.data.trans,
          cates: res.data.cate,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  // Thêm mới Story
  const postStory = async (values: any) => {
    await storeStory(values)
      .then((res: any) => {
        dispatch({
          payload: res.data.message,
          type: "story/createStorySuccess",
        });
        navigate("/dashboard/story/view");
      })
      .catch((err) => setErrorStory(err.response.data.errors));
  };

  const saveStory = (values: any) => {
    values.discount = discount;
    values.introduce = introduce;
    values.id_user = user.user.id;
    postStory(values);
  };

  const handleChange = (changedValues: any, allValues: any) => {
    if (changedValues.name) {
      allValues.slug = changeToSlug(changedValues.name);
      form.setFieldsValue({
        slug: changeToSlug(changedValues.name),
      });
    }
    if (changedValues.name === "") {
      form.setFieldsValue({
        slug: "",
      });
    }
  };

  //upload ảnh
  const props: UploadProps = {
    name: "image",
    action: `${process.env.REACT_APP_API}cms/upload_story/0`,
    accept: "image/png, image/gif, image/jpeg",
    listType: "picture-card",
    fileList: fileList,
    onChange(info) {
      setFileList(info.fileList);
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
        <p>Thêm mới Truyện</p>
        <div className="top-main__right">
          <Link to="">Truyện</Link> / <span>Thêm mới Truyện</span>
        </div>
      </div>
      <Card>
        <Form
          name="wrap"
          layout="vertical"
          initialValues={{
            name: "",
            slug: "",
            introduce: "",
            image: "",
            vip: 0,
            full: 0,
            recommended: 0,
            hot: 0,
            status: 1,
          }}
          form={form}
          onFinish={saveStory}
          onValuesChange={handleChange}
        >
          <Row gutter={[20, 20]}>
            <Col md={12}>
              <Form.Item
                label="Tên Truyện"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Tên Truyện không được bỏ trống",
                  },
                  {
                    max: 255,
                    message: "Tên truyện không được quá 255 ký tự",
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
                  {errorStory &&
                    errorStory.name &&
                    errorStory.name.map((item: any, index: number) => {
                      return (
                        <p key={index} style={{ color: "red" }}>
                          {item}
                        </p>
                      );
                    })}
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Form.Item
                label="Slug"
                name="slug"
                rules={[
                  {
                    required: true,
                    message: "SLug không được bỏ trống",
                  },
                ]}
              >
                <Input type="text" name="slug" disabled />
              </Form.Item>
              <Row className="error">
                <Col md={6}>
                  <div></div>
                </Col>
                <Col md={18}>
                  {errorStory &&
                    errorStory.slug &&
                    errorStory.slug.map((item: any, index: number) => {
                      return (
                        <p key={index} style={{ color: "red" }}>
                          {item}
                        </p>
                      );
                    })}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={[20, 20]}>
            <Col md={12}>
              <Form.Item
                label="Giới thiệu"
                name="introduce"
                rules={[
                  {
                    required: true,
                    message: "Giới thiệu không được bỏ trống",
                  },
                ]}
              >
                <CKEditor
                  editor={ClassicEditor}
                  data=""
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setIntroduce(data);
                  }}
                />
              </Form.Item>
              <Row className="error">
                <Col md={6}>
                  <div></div>
                </Col>
                <Col md={18}>
                  {errorStory &&
                    errorStory.introduce &&
                    errorStory.introduce.map((item: any, index: number) => {
                      return (
                        <p key={index} style={{ color: "red" }}>
                          {item}
                        </p>
                      );
                    })}
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <Form.Item label="Giảm giá">
                <CKEditor
                  editor={ClassicEditor}
                  data=""
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDiscount(data);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[20, 20]}>
            <Col md={8}>
              <Form.Item label="Ảnh" name="image">
                <Upload {...props}>
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
              </Form.Item>
              <Row className="error">
                <Col md={6}>
                  <div></div>
                </Col>
                <Col md={18}>
                  {errorStory &&
                    errorStory.image &&
                    errorStory.image.map((item: any, index: number) => {
                      return (
                        <p key={index} style={{ color: "red" }}>
                          {item}
                        </p>
                      );
                    })}
                </Col>
              </Row>
            </Col>
            <Col md={8}>
              <Form.Item label="Thể loại" name="id_cate">
                <Select
                  mode="multiple"
                  size="middle"
                  placeholder="Lựa chọn thể loại"
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  filterOption={(input: string, option: any) =>
                    option?.label.toLowerCase().includes(input)
                  }
                  options={
                    data.cates &&
                    data.cates.map((item: any) => {
                      return {
                        value: item.id,
                        label: item.name,
                      };
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col md={8}>
              <Form.Item
                label="Tác giả"
                name="id_tacgia"
                rules={[
                  {
                    required: true,
                    message: "Tác giả không được bỏ trống",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Lựa chọn tác giả"
                  optionFilterProp="children"
                  filterOption={(input: string, option: any) =>
                    option?.label.toLowerCase().includes(input)
                  }
                  options={
                    data.authors &&
                    data.authors.map((item: any) => {
                      return {
                        value: item.id,
                        label: item.name,
                      };
                    })
                  }
                />
              </Form.Item>
              <Row className="error">
                <Col md={6}>
                  <div></div>
                </Col>
                <Col md={18}>
                  {errorStory &&
                    errorStory.id_tacgia &&
                    errorStory.id_tacgia.map((item: any, index: number) => {
                      return (
                        <p key={index} style={{ color: "red" }}>
                          {item}
                        </p>
                      );
                    })}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={[20, 20]}>
            <Col md={8}>
              <Form.Item
                label="Dịch giả"
                name="id_trans"
                rules={[
                  {
                    required: true,
                    message: "Dịch giả không được bỏ trống",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Lựa chọn dịch giả"
                  optionFilterProp="children"
                  filterOption={(input: string, option: any) =>
                    option?.label.toLowerCase().includes(input)
                  }
                  options={
                    data.trans &&
                    data.trans.map((item: any) => {
                      return {
                        value: item.id,
                        label: item.name,
                      };
                    })
                  }
                />
              </Form.Item>
              <Row className="error">
                <Col md={6}>
                  <div></div>
                </Col>
                <Col md={18}>
                  {errorStory &&
                    errorStory.id_trans &&
                    errorStory.id_trans.map((item: any, index: number) => {
                      return (
                        <p key={index} style={{ color: "red" }}>
                          {item}
                        </p>
                      );
                    })}
                </Col>
              </Row>
            </Col>
            <Col md={8}>
              <Form.Item
                label="Truyện full"
                name="full"
                rules={[
                  {
                    required: true,
                    message: "Trạng full không được bỏ trống",
                  },
                ]}
              >
                <Select
                  options={[
                    { value: 1, label: "Truyện đã full" },
                    { value: 0, label: "Truyện đang ra" },
                  ]}
                />
              </Form.Item>
              <Row className="error">
                <Col md={6}>
                  <div></div>
                </Col>
                <Col md={18}>
                  {errorStory &&
                    errorStory.full &&
                    errorStory.full.map((item: any, index: number) => {
                      return (
                        <p key={index} style={{ color: "red" }}>
                          {item}
                        </p>
                      );
                    })}
                </Col>
              </Row>
            </Col>
            <Col md={8}>
              <Form.Item
                label="Truyện vip"
                name="vip"
                rules={[
                  {
                    required: true,
                    message: "Truyện vip không được bỏ trống",
                  },
                ]}
              >
                <Select
                  options={[
                    { value: 1, label: "Truyện vip" },
                    { value: 0, label: "Truyện free" },
                  ]}
                />
              </Form.Item>
              <Row className="error">
                <Col md={6}>
                  <div></div>
                </Col>
                <Col md={18}>
                  {errorStory &&
                    errorStory.vip &&
                    errorStory.vip.map((item: any, index: number) => {
                      return (
                        <p key={index} style={{ color: "red" }}>
                          {item}
                        </p>
                      );
                    })}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={[20, 20]}>
            <Col md={8}>
              <Form.Item
                label="Đề xuất"
                name="recommended"
                rules={[
                  {
                    required: true,
                    message: "Đề xuất không được bỏ trống",
                  },
                ]}
              >
                <Select
                  options={[
                    { value: 1, label: "Có" },
                    { value: 0, label: "Không" },
                  ]}
                />
              </Form.Item>
              <Row className="error">
                <Col md={6}>
                  <div></div>
                </Col>
                <Col md={18}>
                  {errorStory &&
                    errorStory.recommended &&
                    errorStory.recommended.map((item: any, index: number) => {
                      return (
                        <p key={index} style={{ color: "red" }}>
                          {item}
                        </p>
                      );
                    })}
                </Col>
              </Row>
            </Col>
            <Col md={8}>
              <Form.Item
                label="Truyện hot"
                name="hot"
                rules={[
                  {
                    required: true,
                    message: "Truyện hot không được bỏ trống",
                  },
                ]}
              >
                <Select
                  options={[
                    { value: 1, label: "Có" },
                    { value: 0, label: "Không" },
                  ]}
                />
              </Form.Item>
              <Row className="error">
                <Col md={6}>
                  <div></div>
                </Col>
                <Col md={18}>
                  {errorStory &&
                    errorStory.hot &&
                    errorStory.hot.map((item: any, index: number) => {
                      return (
                        <p key={index} style={{ color: "red" }}>
                          {item}
                        </p>
                      );
                    })}
                </Col>
              </Row>
            </Col>
            <Col md={8}>
              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Trạng thái không được bỏ trống",
                  },
                ]}
              >
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
                  {errorStory &&
                    errorStory.status &&
                    errorStory.status.map((item: any, index: number) => {
                      return (
                        <p key={index} style={{ color: "red" }}>
                          {item}
                        </p>
                      );
                    })}
                </Col>
              </Row>
            </Col>
          </Row>

          <Button
            size="large"
            type="primary"
            htmlType="submit"
            style={{ marginRight: "10px" }}
          >
            Thêm mới
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default CreateStory;
