import { createContext, useState } from "react";
import { AppContextInterface } from "./SettingContextProvider";
import axios from "axios";

export const AuthContext = createContext<AppContextInterface | null>(null);

const AuthContextProvider = ({ children }: any) => {
  const [data, setData] = useState<any>();
  const [dataRegister, setDataRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorServer, setErrorServer] = useState<any>({
    showText: "",
    error: false,
  });

  const register = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}register?name=${dataRegister.name}&email=${dataRegister.email}&password=${dataRegister.password}`
      )
      .then((res) => {
        if (res.data.success) {
          setData(res.data);
        } else {
          setErrorServer({ showText: res.data.data.hasMore, error: true });
        }
      })
      .catch((err) => {
        setErrorServer({ showText: "Lỗi hệ thống", error: true });
      });
  };

  const dataAuth: any = {
    data,
    errorServer,
    setErrorServer,
    register,
    dataRegister,
    setDataRegister,
  };

  return (
    <AuthContext.Provider value={dataAuth}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
