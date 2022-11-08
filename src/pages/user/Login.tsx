import { useState } from "react";
import "./user.scss";
import { Link } from "react-router-dom";

const Login = () => {
  const [checkInputName, setCheckInputName] = useState(false);
  const [checkInputPass, setCheckInputPass] = useState(false);

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
              />
            </div>
            <Link to="">Quên mật khẩu?</Link>
            <button className="">Đăng nhập</button>
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
