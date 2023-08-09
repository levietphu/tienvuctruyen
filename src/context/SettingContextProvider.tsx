import { createContext, useState, useEffect } from "react";

export interface AppContextInterface {
  name: string;
  author: string;
  url: string;
}

export const SettingContext = createContext<AppContextInterface | null>(null);

const SettingContextProvider = ({ children }: any) => {
  const [togglePopup, setTogglePopup] = useState(false);
  const value = localStorage.getItem("theme");
  const value2 = localStorage.getItem("size");

  let saveTheme: any;
  let saveSize: any;
  if (typeof value === "string") {
    saveTheme = JSON.parse(value);
  }
  if (typeof value2 === "string") {
    saveSize = JSON.parse(value2);
  }

  const [theme, setTheme] = useState(saveTheme || "light");
  const [size, setSize] = useState(saveSize || 1.2);

  useEffect(() => {
    if (togglePopup) {
      document.body.classList.add("hidden__scroll");
    } else {
      document.body.classList.remove("hidden__scroll");
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
