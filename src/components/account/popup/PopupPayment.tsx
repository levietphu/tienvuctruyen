import { useOutSide } from "../../../hookCustom/useOutSide";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContextProvider";
import PopupPrev from "./PopupPrev";
import PopupNext from "./PopupNext";
import { bank } from "../../../sample/coin";
import { card } from "../../../sample/coin";
import { bankImage } from "../../../sample/coin";
import { walletImage } from "../../../sample/coin";
import { cardImage } from "../../../sample/coin";

const PopupPayment = () => {
  const { setPopupPayment, popupPayment }: any = useContext(AuthContext);
  const [changeView, setChangeView] = useState(false);
  const [giveMoney, setGiveMoney] = useState(false);

  const store: any =
    popupPayment === "bank" || popupPayment === "wallet"
      ? bank
      : popupPayment === "card"
      ? card
      : [];

  const storeImage: any =
    popupPayment === "bank"
      ? bankImage
      : popupPayment === "wallet"
      ? walletImage
      : cardImage;

  const [changeMoney, setChangeMoney] = useState(store[0].money);
  const [changeCoin, setChangeCoin] = useState(storeImage[0].name);
  const [numberCoin, setNumberCoin] = useState(store[0].coin);

  const Ref = useOutSide(() => setPopupPayment(""));

  return (
    <div className="popup-payment">
      <div
        className={`popup-payment__center ${
          changeView ? "popup__scroll" : ""
        } ${
          (popupPayment === "card" && changeView) || giveMoney
            ? "card__popup"
            : ""
        }`}
        ref={Ref}
      >
        <h3>
          {popupPayment === "bank"
            ? "Chuyển khoản ngân hàng"
            : popupPayment === "wallet"
            ? "Ví điện tử"
            : "Thẻ cào"}
        </h3>
        <div className="popup-payment__center--popup">
          {!changeView && (
            <PopupPrev
              setChangeView={setChangeView}
              changeCoin={changeCoin}
              setChangeCoin={setChangeCoin}
              changeMoney={changeMoney}
              setChangeMoney={setChangeMoney}
              store={store}
              storeImage={storeImage}
              popupPayment={popupPayment}
              setPopupPayment={setPopupPayment}
              setNumberCoin={setNumberCoin}
            />
          )}
          {changeView && (
            <PopupNext
              changeCoin={changeCoin}
              changeMoney={changeMoney}
              popupPayment={popupPayment}
              numberCoin={numberCoin}
              setChangeView={setChangeView}
              setGiveMoney={setGiveMoney}
              giveMoney={giveMoney}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupPayment;
