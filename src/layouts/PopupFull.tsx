import "./popupfull.scss";
import xuly from "../assets/xuly.png";
import xuly2 from "../assets/xuly2.png";
import { SettingContext } from "../context/SettingContextProvider";
import { useContext } from "react";
import { useOutSide } from "../hookCustom/useOutSide";

const PopupFull = () => {
  const { setCheckPopupHome }: any = useContext(SettingContext);
  const Ref = useOutSide(() => setCheckPopupHome(false));
  return (
    <div className="popup-full">
      <div className="popup-full__center" ref={Ref}>
        <i
          className="fa-solid fa-xmark"
          onClick={() => setCheckPopupHome(false)}
        ></i>
        <div className="popup-full__center--popup">
          <h3>
            Vì lý do: chứng chỉ ssl nên muốn vào trang cần làm theo hướng dẫn:
          </h3>
          <a href="https://139.162.17.88/" target="_blank">
            Nhấp vào đây nhé
          </a>
          <div>
            <img src={xuly} alt="" />
            <img src={xuly2} alt="" />
          </div>
          <p>
            Đợi vào được bên backend thì chuyển lại vào trang này(Chỉ cần làm 1
            lần để chrome cho phép từ lần sau vẫn vào bình thường)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopupFull;
