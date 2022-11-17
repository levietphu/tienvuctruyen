import { useState, useEffect, useContext } from "react";
import "./user.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [checkInputName, setCheckInputName] = useState(false);
  const [checkInputPass, setCheckInputPass] = useState(false);
  const [checkInputEmail, setCheckInputEmail] = useState(false);
  const [checkRules, setCheckRules] = useState(false);
  const [mail, setMail] = useState<any>({
    errorMail: "",
    checkMail: true,
  });
  const [name, setName] = useState<any>({
    errorName: "",
    checkName: true,
  });

  const navigate = useNavigate();

  const { data, errorServer, register, setDataRegister, dataRegister }: any =
    useContext(AuthContext);

  const validate = (word: string) => {
    if (word === "email") {
      !dataRegister.email.includes("@")
        ? setMail({
            errorMail: "Sai định dạng email !",
            checkMail: false,
          })
        : setMail({
            errorMail: "",
            checkMail: true,
          });
    }
    if (word === "name") {
      !dataRegister.name &&
        setName({ errorName: "Không được bỏ trống", error: true });
    }
  };

  useEffect(() => {
    if (data) {
      data.success && navigate("/login");
    }
  }, [data]);

  useEffect(() => {
    document.title = "Tạo tài khoản Tiên Vực";
  }, []);

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
                  !name.checkName ? "active_error" : ""
                }`}
                type="text"
                placeholder="Tên tài khoản từ 5-20 ký tự bao gồm a-z, 0-9 và _"
                onClick={() => {
                  setCheckInputName(!checkInputName);
                }}
                onBlur={() => {
                  setCheckInputName(false);
                  validate("name");
                }}
                name="name"
                value={dataRegister.name}
                onChange={(e: any) => {
                  setDataRegister({ ...dataRegister, name: e.target.value });
                }}
              />
              <p className="error">{name.errorName}</p>
            </div>
            <div className={`name__login }`}>
              <p>Email</p>
              <input
                className={`${checkInputEmail ? "comment__text--active" : ""} ${
                  !mail.checkMail ? "active_error" : ""
                }`}
                type="email"
                placeholder="vidu@gmail.com"
                onClick={() => setCheckInputEmail(!checkInputEmail)}
                onBlur={() => {
                  setCheckInputEmail(false);
                  validate("email");
                }}
                name="email"
                value={dataRegister.email}
                onChange={(e: any) =>
                  setDataRegister({ ...dataRegister, email: e.target.value })
                }
              />
              <p className="error">{mail.errorMail}</p>
            </div>
            <div className="password__login">
              <p>Mật khẩu</p>
              <input
                className={checkInputPass ? "comment__text--active" : ""}
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
            </div>
            <div className="check">
              <input
                type="checkbox"
                onChange={() => setCheckRules(!checkRules)}
                checked={checkRules}
              />
              <span>
                {" "}
                Đồng ý với các <a href="">điều khoản</a> và{" "}
                <a href="">chính sách</a> của tiên vực
              </span>
            </div>
            <button
              className={!checkRules ? "forbiden" : ""}
              onClick={() =>
                checkRules &&
                dataRegister.name &&
                dataRegister.email &&
                dataRegister.password &&
                mail.checkMail &&
                register()
              }
            >
              Đăng ký
            </button>
          </div>
          <div className="change__register">
            Bạn chưa có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </div>
      </div>
      {errorServer.error && (
        <p className="error_auth">{errorServer.showText}</p>
      )}
    </div>
  );
};

export default Register;
