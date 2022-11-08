import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { AppContextInterface } from "./SettingContextProvider";

export const LayoutContext = createContext<AppContextInterface | null>(null);

const LayoutContextProvider = ({ children }: any) => {
  const [dataLayout, setDataLayout] = useState<any>();
  const callApi = async () => {
    await axios.get(`${process.env.REACT_APP_API}layout`).then((res) => {
      setDataLayout(res.data.data);
    });
  };

  useEffect(() => {
    callApi();
  }, []);

  const data: any = { dataLayout };

  return (
    <LayoutContext.Provider value={data}>{children}</LayoutContext.Provider>
  );
};

export default LayoutContextProvider;
