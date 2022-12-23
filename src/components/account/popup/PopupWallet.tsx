import coin from "../../../assets/coin.svg";
import momoqr from "../../../assets/momoqr.jpg";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";

const PopupWallet = ({
  changeMoney,
  numberCoin,
  handleCoppy,
  changeCoin,
}: any) => {
  const { user }: any = useContext(AuthContext);

  return (
    <>
      <div className="popup_next--step1">
        <p>
          <strong>Bước 1.</strong>
          <span>Thực hiện thanh toán theo thông tin bên dưới</span>
        </p>
        {changeCoin === "momo" && (
          <div className="qrcode">
            <div>
              <img src={momoqr} alt="" width={"200px"} height={"200px"} />
            </div>
          </div>
        )}

        <div className="perform">
          <p>Chủ tài khoản</p>
          <p className="coppy__popup" onClick={handleCoppy}>
            LÊ VIỆT PHÚ <i className="fa-regular fa-copy"></i>
          </p>
        </div>
        <div className="perform">
          <p>Số điện thoại</p>
          <p className="coppy__popup" onClick={handleCoppy}>
            0348547762 <i className="fa-regular fa-copy"></i>
          </p>
        </div>
        <div className="perform">
          <p>Số tiền cần chuyển</p>
          <p className="coppy__popup" onClick={handleCoppy}>
            {changeMoney},000 <i className="fa-regular fa-copy"></i>
          </p>
        </div>
        <div className="perform">
          <p>Nội dung chuyển khoản</p>
          <p className="coppy__popup" onClick={handleCoppy}>
            {user.user.name} <i className="fa-regular fa-copy"></i>
          </p>
        </div>
        <div className="perform">
          <p>Số xu nhận được</p>
          <p>
            {changeMoney === 500 ? "10,500" : numberCoin}
            <img src={coin} alt="" width={"16px"} height={"16px"} />
          </p>
        </div>
      </div>
      <div className="popup_next--step2">
        <p>
          <strong>Bước 2.</strong>
          Tải lên ảnh chụp màn hình hóa đơn chuyển khoản/thanh toán của bạn
        </p>
        <label className="upload__image" htmlFor="avatar">
          Kéo thả hoặc bấm vào đây để chọn ảnh...
          <input
            type="file"
            id="avatar"
            accept="image/png,image/gif,image/jpeg"
          />
        </label>
        <p className="note__popup">
          {changeCoin === "momo" ? (
            <i>
              Lưu ý: Nội dung chuyển khoản là TÊN TÀI KHOẢN của bạn, KHÔNG được
              chứa các từ khóa liên quan tới nạp tiền, tiền ảo,... để tránh bị
              chặn. Nếu sau 30p vẫn chưa nhận được XU, vui lòng gửi ảnh giao
              dịch của bạn qua Fanpage để được hỗ trợ.
            </i>
          ) : (
            <i>
              Lưu ý: 1 USD = 20K VND. Sử dụng Paypay trên trình duyệt web và
              chuyển tiền với chế độ "Chuyển tiền tới bạn bè" để hạn chế việc bị
              giam tiền.
            </i>
          )}
        </p>
      </div>
    </>
  );
};

export default PopupWallet;
