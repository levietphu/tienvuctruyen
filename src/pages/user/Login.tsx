import { useState, useContext, useEffect } from "react";
import "./user.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";

const Login = () => {
  const [checkInputName, setCheckInputName] = useState(false);
  const [checkInputPass, setCheckInputPass] = useState(false);

  const {
    login,
    dataLogin,
    setTextLogin,
    errorServer,
    textLogin,
    checkLogin,
  }: any = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (dataLogin) {
      dataLogin.success && !checkLogin
        ? navigate(-1)
        : dataLogin.success && checkLogin && navigate("/");
    }
  }, [dataLogin]);

  useEffect(() => {
    document.title = "Đăng nhập vào Tiên Vực";
  }, []);

  console.log(checkLogin);
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
            <div className="name__login">
              <p>Email hoặc tên tài khoản</p>
              <input
                className={checkInputName ? "comment__text--active" : ""}
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
            </div>
            <div className="password__login">
              <p>Mật khẩu</p>
              <input
                className={checkInputPass ? "comment__text--active" : ""}
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
            </div>
            <Link to="">Quên mật khẩu?</Link>
            <button
              className=""
              onClick={() => textLogin.email && textLogin.password && login()}
            >
              Đăng nhập
            </button>
          </div>
          <div className="change__register">
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </div>
        </div>
      </div>
      {errorServer.error && (
        <p className="error_auth">{errorServer.showText}</p>
      )}
    </div>
  );
};

export default Login;
