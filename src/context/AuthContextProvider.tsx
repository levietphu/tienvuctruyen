import { createContext, useState, useEffect } from "react";
import { AppContextInterface } from "./SettingContextProvider";
import axios from "axios";
import { getCookie } from "../ultis/getCookie";

export const AuthContext = createContext<AppContextInterface | null>(null);

const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>();
  const [popupPayment, setPopupPayment] = useState("");
  const [loaderUser, setLoaderUser] = useState<string>("loader");
  const [checkLogin, setCheckLogin] = useState<boolean>(false);
  const [dataRegister, setDataRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [textLogin, setTextLogin] = useState({
    email: "",
    password: "",
  });

  const [errorServer, setErrorServer] = useState<any>();
  const [reLogin, setReLogin] = useState<boolean>(false);

  const token = getCookie("token");

  const register = async () => {
    return await axios.post(`${process.env.REACT_APP_API}register`, {
      name: dataRegister.name,
      email: dataRegister.email,
      password: dataRegister.password,
    });
  };

  const login = async () => {
    return await axios.post(`${process.env.REACT_APP_API}login`, {
      email: textLogin.email,
      password: textLogin.password,
    });
  };

  const getUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}getUser?token=${token}`)
      .then((res: any) => {
        setUser(res.data.data.items);
        setLoaderUser("user");
      });
  };

  useEffect(() => {
    if (token) {
      getUser().catch((err) => {
        if (err.response.status === 401) {
          setLoaderUser("login");
          setReLogin(true);
        }
      });
    } else {
      setLoaderUser("login");
    }
  }, []);

  const dataAuth: any = {
    errorServer,
    setErrorServer,
    register,
    dataRegister,
    setDataRegister,
    login,
    setTextLogin,
    user,
    textLogin,
    loaderUser,
    setLoaderUser,
    getUser,
    setCheckLogin,
    checkLogin,
    popupPayment,
    setPopupPayment,
    reLogin,
    setReLogin,
  };

  return (
    <AuthContext.Provider value={dataAuth}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
