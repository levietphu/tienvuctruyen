import { useState, useEffect, useContext } from "react";
import "./user.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [checkInputName, setCheckInputName] = useState(false);
  const [checkInputPass, setCheckInputPass] = useState(false);
  const [checkInputEmail, setCheckInputEmail] = useState(false);
  const [checkRules, setCheckRules] = useState(false);

  const navigate = useNavigate();

  const {
    errorServer,
    register,
    setDataRegister,
    dataRegister,
    setCheckLogin,
    setErrorServer,
    user,
  }: any = useContext(AuthContext);

  useEffect(() => {
    document.title = "Tạo tài khoản Tiên Vực";
    return () => {
      setCheckInputEmail(false);
      setCheckInputPass(false);
      setCheckInputName(false);
      setCheckRules(false);
      setErrorServer("");
    };
  }, []);

  useEffect(() => {
    user && navigate("/");
  }, [user]);

  useEffect(() => {
    if (
      errorServer &&
      !errorServer.name &&
      !errorServer.email &&
      !errorServer.password
    ) {
      var id = setTimeout(() => setErrorServer(""), 2000);
    }
    return () => clearTimeout(id);
  }, [errorServer]);

  const registerTienVuc = () => {
    register()
      .then((res: any) => {
        navigate("/login");
        setCheckLogin(true);
      })
      .catch((err: any) => {
        setErrorServer(err.response.data.errors);
      });
  };
  return (
    <div className="login">
      <div className="center login__center">
        <div className="login__container">
          <h1>
            <span>
              Đăng ký vào <Link to="/">Tiên vực</Link>{" "}
            </span>

            <i className="fa-solid fa-clipboard-list"></i>
          </h1>
          <div className="login__main">
            <div className="name__login">
              <p>Tên tài khoản</p>
              <input
                className={`${checkInputName ? "comment__text--active" : ""} ${
                  errorServer && errorServer.name ? "active_error" : ""
                }`}
                type="text"
                placeholder="Tên tài khoản từ 5-20 ký tự bao gồm a-z, 0-9 và _"
                onClick={() => {
                  setCheckInputName(!checkInputName);
                }}
                name="name"
                value={dataRegister.name}
                onChange={(e: any) => {
                  setDataRegister({ ...dataRegister, name: e.target.value });
                }}
              />
              {errorServer &&
                errorServer.name &&
                errorServer.name.map((item: any, index: any) => {
                  return (
                    <p className="error" key={index}>
                      {item}
                    </p>
                  );
                })}
            </div>
            <div className={`name__login }`}>
              <p>Email</p>
              <input
                className={`${checkInputEmail ? "comment__text--active" : ""} ${
                  errorServer && errorServer.email ? "active_error" : ""
                }`}
                type="email"
                placeholder="vidu@gmail.com"
                onClick={() => setCheckInputEmail(!checkInputEmail)}
                name="email"
                value={dataRegister.email}
                onChange={(e: any) =>
                  setDataRegister({ ...dataRegister, email: e.target.value })
                }
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
                  errorServer && errorServer.password ? "active_error" : ""
                }`}
                type="password"
                placeholder="*********"
                onClick={() => setCheckInputPass(!checkInputPass)}
                onBlur={() => setCheckInputPass(false)}
                name="password"
                value={dataRegister.password}
                onChange={(e: any) =>
                  setDataRegister({ ...dataRegister, password: e.target.value })
                }
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
            <div className="check">
              <input
                type="checkbox"
                onChange={() => setCheckRules(!checkRules)}
                checked={checkRules}
              />
              <span>
                {" "}
                Đồng ý với các <Link to="">điều khoản</Link> và{" "}
                <Link to="">chính sách</Link> của tiên vực
              </span>
            </div>
            <button
              className={`${checkRules ? "" : "forbiden"}`}
              onClick={() => checkRules && registerTienVuc()}
            >
              Đăng ký
            </button>
          </div>
          <div className="change__register">
            Bạn chưa có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </div>
      </div>
      {errorServer &&
        !errorServer.name &&
        !errorServer.email &&
        !errorServer.password && <p className="error_auth">Lỗi hệ thống</p>}
    </div>
  );
};

export default Register;