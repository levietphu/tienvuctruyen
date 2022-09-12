import { createContext, useState, useEffect, useRef } from "react";

interface AppContextInterface {
  name: string;
  author: string;
  url: string;
}

export const SettingContext = createContext<AppContextInterface | null>(null);

const SettingContextProvider = ({ children }: any) => {
  const [togglePopup, setTogglePopup] = useState(false);
  const saveTheme = JSON.parse(localStorage.getItem("theme") || "light");
  const saveSize = JSON.parse(localStorage.getItem("size") || "1.2");
  const [theme, setTheme] = useState(saveTheme);
  const [size, setSize] = useState(saveSize);

  useEffect(() => {
    if (togglePopup) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [togglePopup]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("size", JSON.stringify(size));
  }, [size]);

  const setting: any = {
    togglePopup,
    setTogglePopup,
    setTheme,
    theme,
    size,
    setSize,
  };

  return (
    <SettingContext.Provider value={setting}>
      {children}
    </SettingContext.Provider>
  );
};

export default SettingContextProvider;
