import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContextProvider";
import { useParams, useNavigate } from "react-router-dom";

const ChapterVip = ({ coin, setError }: any) => {
  const { user }: any = useContext(AuthContext);

  const params = useParams();
  const navigate = useNavigate();

  const callApi = async () => {
    if (user) {
      await axios
        .get(
          `${process.env.REACT_APP_API}buy_chapter?id_user=${user.user.id}&slug_story=${params.slugstory} &slug=${params.slugchapter}`
        )
        .then((res) => {
          if (res.data.success) {
            callApi();
          } else if (!res.data.success && res.data.status === 400) {
            setError(true);
          }
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="box__vip">
      <div className="chapter-vip">
        <div className="content__check">
          <h1>Chương Vip</h1>
          <p>
            Đây là chương VIP - Bạn cần mua bằng XU để có thể tiếp tục đọc
            truyện!
          </p>
          <p style={{ fontSize: "1.5rem" }}>
            Giá: <span style={{ textTransform: "uppercase" }}>{coin} xu</span>
          </p>
        </div>
        <div className="buy__chapter center">
          <button className="btn-chapter" onClick={callApi}>
            Mua Chương này
          </button>
          <button
            className="btn-coin"
            onClick={() =>
              user ? navigate("/account/coin") : navigate("/login")
            }
          >
            Nạp xu
          </button>
        </div>
        <div className="qa-buy center">
          <button>Bạn muốn mua hết các chương VIP?</button>
        </div>
      </div>
    </div>
  );
};

export default ChapterVip;
