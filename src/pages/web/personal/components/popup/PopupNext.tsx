import PopupBank from "./PopupBank";
import PopupCard from "./PopupCard";
import PopupWallet from "./PopupWallet";
import { useState, useEffect } from "react";
import PopupRequest from "./PopupRequest";

const PopupNext = ({
  changeCoin,
  changeMoney,
  popupPayment,
  numberCoin,
  setChangeView,
  giveMoney,
  setGiveMoney,
}: any) => {
  const [showCoppy, setShowCoppy] = useState(false);

  const handleCoppy = (e: any) => {
    navigator.clipboard.writeText(e.target.innerText);
    setShowCoppy(true);
  };

  useEffect(() => {
    if (showCoppy) {
      setTimeout(() => {
        setShowCoppy(false);
      }, 1000);
    }
  }, [showCoppy]);

  return (
    <>
      {!giveMoney ? (
        <>
          <div
            className="popup__coppy"
            style={{ top: `${showCoppy ? "150px" : "-100px"}` }}
          >
            <span>Đã sao chép !</span>
          </div>
          <div className="popup_next">
            {popupPayment === "bank" && (
              <PopupBank
                changeMoney={changeMoney}
                numberCoin={numberCoin}
                handleCoppy={handleCoppy}
              />
            )}
            {popupPayment === "wallet" && (
              <PopupWallet
                changeMoney={changeMoney}
                numberCoin={numberCoin}
                handleCoppy={handleCoppy}
                changeCoin={changeCoin}
              />
            )}
            {popupPayment === "card" && <PopupCard />}

            <div className="coin__button">
              <div
                className="coin__button--cancel"
                onClick={() => setChangeView(false)}
              >
                Quay lại
              </div>
              <div
                className="coin__button--continous"
                onClick={() => setGiveMoney(true)}
              >
                {popupPayment === "wallet"
                  ? "Hoàn thành"
                  : "Tôi đã chuyển khoản"}
              </div>
            </div>
          </div>
        </>
      ) : (
        <PopupRequest />
      )}
    </>
  );
};

export default PopupNext;
