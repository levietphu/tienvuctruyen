import { useState } from "react";

const PopupCard = ({ changeMoney, numberCoin, handleCoppy }: any) => {
  const [input, setInput] = useState(false);
  const [input2, setInput2] = useState(false);

  return (
    <>
      <div className="popup_next--step1">
        <div className={`popup__input `} onClick={() => setInput(!input)}>
          <input
            type="text"
            className={`${input ? "search__container--active" : ""}`}
            placeholder="Số Seri"
          />
        </div>
        <div className="popup__input" onClick={() => setInput2(!input2)}>
          <input
            type="text"
            className={`${input2 ? "search__container--active" : ""}`}
            placeholder="Mã thẻ cào"
          />
        </div>
      </div>
      <div className="popup_next--step2">
        <p className="note__popup">
          <i>
            Lưu ý: Kiểm tra kỹ thông tin thẻ nạp! Trường hợp chọn sai mệnh giá,
            số Xu nhận được của bạn sẽ bị trừ 50% so với mệnh giá đúng của thẻ.
          </i>
        </p>
      </div>
    </>
  );
};

export default PopupCard;
