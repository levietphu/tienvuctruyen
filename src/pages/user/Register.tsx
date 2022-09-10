import { useState } from "react";
import "./user.scss";
import { Link } from "react-router-dom";

const Register = () => {
  const [checkInputName, setCheckInputName] = useState(false);
  const [checkInputPass, setCheckInputPass] = useState(false);
  const [checkInputEmail, setCheckInputEmail] = useState(false);
  const [checkRules, setCheckRules] = useState(true);

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
                className={checkInputName ? "comment__text--active" : ""}
                type="text"
                placeholder="Tên tài khoản từ 5-20 ký tự bao gồm a-z, 0-9 và _"
                onClick={() => setCheckInputName(!checkInputName)}
                onBlur={() => setCheckInputName(false)}
              />
            </div>
            <div className="name__login">
              <p>Email</p>
              <input
                className={checkInputEmail ? "comment__text--active" : ""}
                type="email"
                placeholder="vidu@gmail.com"
                onClick={() => setCheckInputEmail(!checkInputEmail)}
                onBlur={() => setCheckInputEmail(false)}
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
            <div className="check">
              <input
                type="checkbox"
                onClick={(e) => setCheckRules(!checkRules)}
              />
              <span>
                {" "}
                Đồng ý với các <a href="">điều khoản</a> và{" "}
                <a href="">chính sách</a> của tiên vực
              </span>
            </div>
            <button className={checkRules ? "forbiden" : ""}>Đăng ký</button>
          </div>
          <div className="change__register">
            Bạn chưa có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
