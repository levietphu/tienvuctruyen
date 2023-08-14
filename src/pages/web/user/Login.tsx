import { useState, useContext, useEffect } from "react";
import "./user.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContextProvider";
import setToken from "../../../ultis/setToken";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Alert } from "antd";

const Login = () => {
  const [checkInputName, setCheckInputName] = useState(false);
  const [checkInputPass, setCheckInputPass] = useState(false);
  const [loaderLogin, setLoaderLogin] = useState(false);
  const [error, setError] = useState<string>("");

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

  const clearChangePage = () => {
    setCheckInputName(false);
    setCheckInputPass(false);
    setErrorServer("");
    setTextLogin({ email: "", password: "" });
  };

  useEffect(() => {
    document.title = "Đăng nhập vào Tiên Vực";
    return () => clearChangePage();
  }, []);

  useEffect(() => {
    user && navigate("/");
  }, [user]);

  const loginTienVuc = () => {
    setLoaderLogin(true);
    login()
      .then((res: any) => {
        // lần đầu đăng nhập cần gắn token vào header
        setToken(res.data.data.token);

        setLoaderUser("loader");
        setReLogin(false);
        getUser();
        //lưu đăng nhập
        document.cookie = `token=${res.data.data.token};max-age=604800;path=/;`;
        !checkLogin ? navigate(-1) : navigate("/");
      })
      .catch((err: any) => {
        setErrorServer(
          err.response.status === 400
            ? err.response.data.message
            : err.response.data.errors
        );
        err.response.status === 500 && setError("Lỗi hệ thống");
      });
  };

  useEffect(() => {
    if (error) {
      var id = setTimeout(() => {
        setError("");
      }, 3000);
    }
    return () => clearTimeout(id);
  }, [error]);

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
      <Alert
        className="error_chapter"
        message={error}
        type="error"
        showIcon
        style={{
          top: `${error ? "50%" : "-10000px"}`,
          transition: `${error ? "0.3s" : "unset"}`,
        }}
      />
    </div>
  );
};

export default Login;
