import { useContext } from "react";
import { AuthContext } from "../../../../../context/AuthContextProvider";

const PopupRequest = () => {
  const { setPopupPayment }: any = useContext(AuthContext);

  return (
    <div className="popup_request">
      <i className="fa-regular fa-circle-check"></i>
      <h1>Đã gửi yêu cầu nạp thành công!</h1>
      <p>Hệ thống sẽ tự động xử lý giao dịch của bạn trong khoảng 3-5 phút.</p>
      <div className="popup_btn">
        <button onClick={() => setPopupPayment(false)}>Đồng ý</button>
      </div>
    </div>
  );
};

export default PopupRequest;
