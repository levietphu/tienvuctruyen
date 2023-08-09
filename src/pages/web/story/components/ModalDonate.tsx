import "./modal-story.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContextProvider";
import { Link } from "react-router-dom";

const { TextArea } = Input;

const ModalDonate = ({ setIsModalDonateOpen }: any) => {
  const { user }: any = useContext(AuthContext);

  return (
    <div className="modal-donate">
      {user ? (
        <>
          <div className="alert-modal">
            <span>
              Bạn đang có{" "}
              <FontAwesomeIcon style={{ margin: "0 5px" }} icon={faCoins} />{" "}
              {user.user.coin}
              <strong> XU</strong>.<Link to="/account/coin">Nạp thêm</Link>
            </span>
          </div>
          <div className="content-modal">
            <div className="main-content-modal">
              <div className="coin-donate">
                <p>Số XU bạn muốn ủng hộ</p>
                <Input type="number" value={10} />
              </div>
              <div className="message-donate">
                <p>Lời nhắn</p>
                <TextArea rows={6} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="change-login">
          <span>
            Bạn cần <Link to="/login">Đăng nhập</Link> để có thể ủng hộ truyện
          </span>
        </div>
      )}

      <div className="button-modal">
        <Button size="large" onClick={() => setIsModalDonateOpen(false)}>
          Hủy
        </Button>
        <Button className="donate-button" size="large">
          Ủng hộ
        </Button>
      </div>
    </div>
  );
};

export default ModalDonate;
