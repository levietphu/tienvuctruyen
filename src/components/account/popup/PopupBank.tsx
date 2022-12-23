import coin from "../../../assets/coin.svg";
import qrcode from "../../../assets/qrcode.jpg";

const PopupBank = ({ changeMoney, numberCoin, handleCoppy }: any) => {
  return (
    <>
      <div className="popup_next--step1">
        <p>
          <strong>Bước 1.</strong>
          <span>Thực hiện thanh toán theo thông tin bên dưới</span>
        </p>
        <div className="perform">
          <p>Chủ tài khoản</p>
          <p className="coppy__popup" onClick={handleCoppy}>
            LÊ VIỆT PHÚ <i className="fa-regular fa-copy"></i>
          </p>
        </div>
        <div className="perform">
          <p>Số tài khoản</p>
          <p className="coppy__popup" onClick={handleCoppy}>
            120501071993 <i className="fa-regular fa-copy"></i>
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
            TV834446173676 <i className="fa-regular fa-copy"></i>
          </p>
        </div>
        <div className="perform">
          <p>Số xu nhận được</p>
          <p>
            {changeMoney === 500 ? "10,500" : numberCoin}
            <img src={coin} alt="" width={"16px"} height={"16px"} />
          </p>
        </div>
        <div className="qrcode">
          <div>
            <i>Hoặc sử dụng app ngân hàng của bạn để quét mã QR thanh toán</i>
            <img src={qrcode} alt="" width={"200px"} height={"200px"} />
          </div>
        </div>
      </div>
      <div className="popup_next--step2">
        <p>
          <strong>Bước 2.</strong>
          Sau khi chuyển khoản thành công, bấm nút{" "}
          <strong>Tôi đã chuyển khoản</strong> để xác nhận.
        </p>
        <p className="note__popup">
          <i>
            Lưu ý: Nhập chính xác NỘI DUNG chuyển khoản là TV039259812098 để hệ
            thống có thể cộng XU cho tài khoản của bạn. Nếu nhập sai, XU có thể
            sẽ bị cộng nhầm sang tài khoản khác! Mỗi mã sẽ chỉ tồn tại trong 10
            phút, bạn cần sử dụng hình thức chuyển khoản nhanh 247 để hệ thống
            kịp thời ghi nhận.
          </i>
        </p>
      </div>
    </>
  );
};

export default PopupBank;
