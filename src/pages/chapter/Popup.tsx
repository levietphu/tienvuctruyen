import { useContext } from "react";
import { SettingContext } from "../../context/SettingContextProvider";

const Popup = () => {
  const { setTogglePopup }: any = useContext(SettingContext);

  return (
    <>
      <div className="popup__chapter">
        <div className="popup__chapter--left"></div>
        <div
          className="popup__chapter--right"
          onClick={() => setTogglePopup(false)}
        ></div>
      </div>
    </>
  );
};

export default Popup;
