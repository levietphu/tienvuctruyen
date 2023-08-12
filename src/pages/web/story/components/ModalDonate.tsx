import "./modal-story.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContextProvider";
import { Link } from "react-router-dom";
import axios from "axios";

const { TextArea } = Input;

const ModalDonate = ({
  callApiDonate,
  id_truyen,
  setIsModalDonateOpen,
}: any) => {
  const { user }: any = useContext(AuthContext);
  const [dataDonate, setDataDonate] = useState<any>({
    coin_donate: 10,
    message: "",
  });
  const [remainingCoins, setRemainingCoins] = useState<string>("");
  const [errorTextDonate, setErrorTextDonate] = useState<string>("");

  const postDonate = async () => {
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}add_donate`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        coin_donate: dataDonate.coin_donate,
        message: dataDonate.message,
        id_truyen: id_truyen,
        id_user: user.user.id,
      },
    })
      .then((res) => {
        callApiDonate();
        setDataDonate({ coin_donate: 10, message: "" });
        setIsModalDonateOpen(false);
        setRemainingCoins(res.data.remaining_coins);
      })
      .catch((err) => {
        err.response.status === 400 &&
          setErrorTextDonate(err.response.data.message);
      });
  };

  return (
    <div className="modal-donate">
      {user ? (
        <>
          <div className="alert-modal">
            <span>
              Bạn đang có{" "}
              <FontAwesomeIcon style={{ margin: "0 5px" }} icon={faCoins} />{" "}
              {remainingCoins ? remainingCoins : user.user.coin}
              <strong> XU</strong>.
              {user.user.coin <= 0 && <Link to="/account/coin">Nạp thêm</Link>}
            </span>
          </div>
          {errorTextDonate && (
            <div className="errorModal">
              <p>{errorTextDonate}</p>
            </div>
          )}
          <div className="content-modal">
            <div className="main-content-modal">
              <div className="coin-donate">
                <p>Số XU bạn muốn ủng hộ</p>
                <Input
                  type="number"
                  min={dataDonate.coin_donate}
                  value={dataDonate.coin_donate}
                  onChange={(e) =>
                    setDataDonate({
                      ...dataDonate,
                      coin_donate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="message-donate">
                <p>Lời nhắn</p>
                <TextArea
                  rows={6}
                  value={dataDonate.message}
                  onChange={(e) =>
                    setDataDonate({ ...dataDonate, message: e.target.value })
                  }
                />
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
        <Button
          size="large"
          onClick={() => {
            setDataDonate({ coin_donate: 10, message: "" });
            setIsModalDonateOpen(false);
            setErrorTextDonate("");
          }}
        >
          Hủy
        </Button>
        <Button
          className="donate-button"
          size="large"
          onClick={user && postDonate}
        >
          Ủng hộ
        </Button>
      </div>
    </div>
  );
};

export default ModalDonate;
