import "../../styles/loadcent.scss";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../../context/AuthContextProvider";

const LoadCents = () => {
  const { popupPayment, setPopupPayment }: any = useContext(AuthContext);
  useEffect(() => {
    if (popupPayment) {
      document.body.classList.add("hidden__scroll");
    } else {
      document.body.classList.remove("hidden__scroll");
    }
  }, [popupPayment]);

  return (
    <div className="load__cents">
      <div
        className="load__cents--item"
        onClick={() => setPopupPayment("bank")}
      >
        <div className="load-cents__center">
          <i className="fa-solid fa-building-columns"></i>
          <div>
            <p>Chuyển khoản ngân hàng</p>
            <span>Có XU nhanh trong vài phút</span>
          </div>
        </div>
      </div>
      <div
        className="load__cents--item"
        onClick={() => setPopupPayment("wallet")}
      >
        <div className="load-cents__center">
          <i className="fa-solid fa-wallet"></i>
          <div>
            <p>Ví điện tử</p>
            <span>Momo,ZaloPay,Paypal,...</span>
          </div>
        </div>
      </div>
      <div
        className="load__cents--item"
        onClick={() => setPopupPayment("card")}
      >
        <div className="load-cents__center">
          <i className="fa-solid fa-address-card"></i>
          <div>
            <p>Thẻ cào</p>
            <span>Thẻ mobi,Viettel,Zing,...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadCents;
