import { createContext, useState, useEffect } from "react";
import { AppContextInterface } from "./SettingContextProvider";
import axios from "axios";
import setToken from "../ultis/setToken";

export const AuthContext = createContext<AppContextInterface | null>(null);

const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>();
  const [popupPayment, setPopupPayment] = useState("");
  const [loaderUser, setLoaderUser] = useState<string>("loader");
  const [data, setData] = useState<any>();
  const [checkLogin, setCheckLogin] = useState<boolean>(false);
  const [dataRegister, setDataRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [dataLogin, setDataLogin] = useState<any>();
  const [textLogin, setTextLogin] = useState({
    email: "",
    password: "",
  });

  const [errorServer, setErrorServer] = useState<any>({
    showText: "",
    error: false,
  });

  const token = JSON.parse(localStorage.getItem("token") || "[]");

  useEffect(() => {
    if (errorServer.error) {
      let id = setTimeout(() => {
        setErrorServer({ showText: "", error: false });
      }, 3000);
      return () => clearTimeout(id);
    }
  }, [errorServer.error]);

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

  const login = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}login?email=${textLogin.email}&password=${textLogin.password}`
      )
      .then((res) => {
        if (res.data.success) {
          setDataLogin(res.data);
          setToken(res.data.data.token);
          localStorage.setItem("token", JSON.stringify(res.data.data.token));
        } else {
          setErrorServer({ showText: res.data.data.hasMore, error: true });
        }
      })
      .catch((err) => {
        setErrorServer({ showText: "Lỗi hệ thống", error: true });
      });
  };

  const getUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}getUser?token=${token}`)
      .then((res) => {
        setUser(res.data.data.items);
        setLoaderUser("user");
      });
  };

  useEffect(() => {
    if (dataLogin || token.length > 0) {
      getUser();
    } else if (textLogin.email && textLogin.password) {
      setLoaderUser("loader");
    } else {
      setLoaderUser("login");
    }
  }, [dataLogin, token]);

  const dataAuth: any = {
    data,
    errorServer,
    setErrorServer,
    register,
    dataRegister,
    setDataRegister,
    login,
    dataLogin,
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
  };

  return (
    <AuthContext.Provider value={dataAuth}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
