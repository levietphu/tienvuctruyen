import { useState, useContext, useEffect } from "react";
import "./user.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContextProvider";
import setToken from "../../../ultis/setToken";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Login = () => {
  const [checkInputName, setCheckInputName] = useState(false);
  const [checkInputPass, setCheckInputPass] = useState(false);
  const [loaderLogin, setLoaderLogin] = useState(false);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24 }} spin rev={undefined} />
  );
  const {
    login,
    setTextLogin,
    errorServer,
    textLogin,
    checkLogin,
    user,
    setErrorServer,
    getUser,
    setLoaderUser,
    setReLogin,
  }: any = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Đăng nhập vào Tiên Vực";
    return () => {
      setCheckInputName(false);
      setCheckInputPass(false);
      setErrorServer("");
    };
  }, []);

  useEffect(() => {
    user && navigate("/");
  }, [user]);

  const loginTienVuc = () => {
    login()
      .then((res: any) => {
        // lần đầu đăng nhập cần gắn token vào header
        setToken(res.data.data.token);
        setLoaderUser("loader");
        setReLogin(false);
        getUser().catch((err: any) => {
          console.log(err);
        });
        setLoaderLogin(true);
        //lưu đăng nhập
        document.cookie = `token=${res.data.data.token};max-age=604800`;
        !checkLogin ? navigate(-1) : navigate("/");
      })
      .catch((err: any) => {
        setErrorServer(
          err.response.status === 400
            ? err.response.data.message
            : err.response.data.errors
        );
      });
  };

  return (
    <div className="login">
      <div className="center login__center">
        <div className="login__container">
          <h1>
            <span>
              Đăng nhập vào <Link to="/">Tiên vực</Link>{" "}
            </span>

            <i className="fa-sharp fa-solid fa-laptop-file"></i>
          </h1>

          <div className="login__main">
            {errorServer && !errorServer.email && !errorServer.password && (
              <div className="inforError">
                <p>{errorServer}</p>
              </div>
            )}
            <div className="name__login">
              <p>Email hoặc tên tài khoản</p>
              <input
                className={`${checkInputName ? "comment__text--active" : ""} ${
                  errorServer && errorServer.email ? "active_error" : ""
                }`}
                type="text"
                placeholder="vidugmail.com"
                onClick={() => setCheckInputName(!checkInputName)}
                onBlur={() => setCheckInputName(false)}
                value={textLogin.email}
                onChange={(e) =>
                  setTextLogin({ ...textLogin, email: e.target.value })
                }
                name="email"
              />
              {errorServer &&
                errorServer.email &&
                errorServer.email.map((item: any, index: any) => {
                  return (
                    <p className="error" key={index}>
                      {item}
                    </p>
                  );
                })}
            </div>
            <div className="password__login">
              <p>Mật khẩu</p>
              <input
                className={`${checkInputPass ? "comment__text--active" : ""} ${
                  errorServer && errorServer.email ? "active_error" : ""
                }`}
                type="password"
                placeholder="*********"
                onClick={() => setCheckInputPass(!checkInputPass)}
                onBlur={() => setCheckInputPass(false)}
                value={textLogin.password}
                onChange={(e) =>
                  setTextLogin({ ...textLogin, password: e.target.value })
                }
                name="password"
              />
              {errorServer &&
                errorServer.password &&
                errorServer.password.map((item: any, index: any) => {
                  return (
                    <p className="error" key={index}>
                      {item}
                    </p>
                  );
                })}
            </div>
            <Link to="">Quên mật khẩu?</Link>
            <button className="" onClick={() => loginTienVuc()}>
              {!loaderLogin ? "Đăng nhập" : <Spin indicator={antIcon} />}
            </button>
          </div>
          <div className="change__register">
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
