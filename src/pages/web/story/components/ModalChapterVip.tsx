import "./modal-story.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Button, Input, Form } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContextProvider";
import { Link } from "react-router-dom";

type FieldType = {
  toChapter?: number;
  fromChapter?: number;
};

const ModalChapterVip = ({ story, setIsModalChapterVipOpen }: any) => {
  const { user }: any = useContext(AuthContext);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <div className="modal-donate">
      {user ? (
        <>
          <div className="alert-modal">
            <span>
              Bạn đang có {user.user.coin}
              <FontAwesomeIcon style={{ margin: "0 5px" }} icon={faCoins} />
              <strong>XU</strong>.<a href="">Nạp thêm</a>
            </span>
          </div>
          <div className="content-modal">
            <Form
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item<FieldType>
                label="Mua từ chương"
                name="toChapter"
                rules={[
                  { required: true, message: "Vui lòng điền vào trường này!" },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item<FieldType>
                label="đến chương"
                name="fromChapter"
                rules={[
                  { required: true, message: "Vui lòng điền vào trường này!" },
                ]}
              >
                <Input type="number" max={story.total_chapter} />
              </Form.Item>
              <p style={{ fontSize: "12px", marginBottom: "10px" }}>
                * Hệ thống sẽ tự loại trừ các chương không phải VIP và các
                chương bạn đã mua lẻ trước đó. Nếu bạn thấy số lượng chương
                không trùng khớp, hãy báo cho Admin tại Fanpage Thánh Thiên Tiên
                Vực để Admin kịp thời xử lý nhé!
              </p>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Kiểm tra
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      ) : (
        <div className="change-login">
          <span>
            Bạn cần <Link to="/login">Đăng nhập</Link> để có thể mua chương VIP
          </span>
        </div>
      )}

      <div className="button-modal">
        <Button size="large" onClick={() => setIsModalChapterVipOpen(false)}>
          Hủy Bỏ
        </Button>
      </div>
    </div>
  );
};

export default ModalChapterVip;
