import React, { createContext, useState, useEffect } from "react";

interface AppContextInterface {
  name: string;
  author: string;
  url: string;
}

export const SettingContext = createContext<AppContextInterface | null>(null);

const SettingContextProvider = ({ children }: any) => {
  const [togglePopup, setTogglePopup] = useState(false);

  useEffect(() => {
    if (togglePopup) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [togglePopup]);

  const setting: any = {
    togglePopup,
    setTogglePopup,
  };

  return (
    <SettingContext.Provider value={setting}>
      {children}
    </SettingContext.Provider>
  );
};

export default SettingContextProvider;
