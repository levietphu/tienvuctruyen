import coin from "../../../../../assets/coin.svg";

const PopupPrev = ({
  setChangeView,
  changeCoin,
  setChangeCoin,
  setChangeMoney,
  changeMoney,
  storeImage,
  store,
  popupPayment,
  setPopupPayment,
  setNumberCoin,
}: any) => {
  return (
    <>
      <div className="imageMb">
        <div
          className={popupPayment === "wallet" ? "" : "wrap"}
          style={{
            width: `${
              popupPayment === "card"
                ? "100%"
                : popupPayment === "wallet"
                ? "300px"
                : "200px"
            }`,
          }}
        >
          {storeImage.map((item: any, index: any) => {
            return (
              <div
                className={`block_image ${
                  changeCoin === item.name ? "image-active" : ""
                }`}
                style={{ width: `${popupPayment === "card" ? "19%" : ""}` }}
                key={index}
                onClick={() => setChangeCoin(item.name)}
              >
                <img src={item.image} alt="webtruyen" />
              </div>
            );
          })}
        </div>
      </div>
      <p>Chọn số tiền muốn nạp</p>
      <div className="coin__money">
        {store.map((item: any, index: number) => {
          return (
            <div
              className={`coin__money--item ${
                changeMoney === item.money ? "coin-active" : ""
              }`}
              key={index}
              onClick={() => {
                setChangeMoney(item.money);
                setNumberCoin(item.coin);
              }}
            >
              <div className="top">
                <div
                  className="coin__500"
                  style={{
                    display: `${item.money === 500 ? "block" : "flex"}`,
                  }}
                >
                  <span>{item.coin}</span>
                  <img src={coin} alt="webtruyen" />
                  {item.money === 500 && popupPayment !== "card" && (
                    <p className="add_coin">+500</p>
                  )}
                </div>
              </div>
              <div className="bottom">
                {item.money}k <span> đ</span>
              </div>
            </div>
          );
        })}
      </div>
      {popupPayment === "wallet" && changeCoin === "momo" ? (
        <div className="wallet">
          Lưu ý: Nội dung chuyển khoản là TÊN TÀI KHOẢN của bạn, KHÔNG được chứa
          các từ khóa liên quan tới nạp tiền, tiền ảo,... để tránh bị chặn. Nếu
          sau 30p vẫn chưa nhận được XU, vui lòng gửi ảnh giao dịch của bạn qua
          Fanpage để được hỗ trợ.
        </div>
      ) : popupPayment === "wallet" && changeCoin === "paypal" ? (
        <div className="wallet">
          Lưu ý: 1 USD = 20K VND. Sử dụng Paypay trên trình duyệt web và chuyển
          tiền với chế độ "Chuyển tiền tới bạn bè" để hạn chế việc bị giam tiền.
        </div>
      ) : (
        popupPayment === "card" && (
          <div className="wallet">
            Lưu ý: Kiểm tra kỹ thông tin thẻ nạp! Trường hợp chọn sai mệnh giá,
            số Xu nhận được của bạn sẽ bị trừ 50% so với mệnh giá đúng của thẻ.
          </div>
        )
      )}
      <div className="coin__button">
        <div
          className="coin__button--cancel"
          onClick={() => setPopupPayment("")}
        >
          Hủy bỏ
        </div>
        <div
          className="coin__button--continous"
          onClick={() => setChangeView(true)}
        >
          Tiếp tục
        </div>
      </div>
    </>
  );
};

export default PopupPrev;
