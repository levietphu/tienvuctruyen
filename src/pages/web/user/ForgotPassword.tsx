import React, { useState } from "react";
import { Spin } from "antd";
import axios from "axios";

const ForgotPassword = () => {
  const [checkInputEmail, setCheckInputEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>();

  const callApiForgot = async () => {
    setLoader(true);
    await axios
      .post(`${process.env.REACT_APP_API}forgot`, { email })
      .then((res) => {
        setMessage(res.data.message);
        setLoader(false);
        setIsError(false);
        setEmail("");
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setIsError(true);
        setLoader(false);
      });
  };

  const forgotPass = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    callApiForgot();
  };

  return (
    <div className="login">
      <div className="center login__center">
        <div className="login__container">
          <h1>
            <span>Quên mật khẩu?</span>
          </h1>

          <div className="login__main">
            {message && (
              <div className={`info ${isError ? "infoError" : "infoSuccess"}`}>
                <p>{message}</p>
              </div>
            )}
            <form onSubmit={(e) => forgotPass(e)} method="post">
              <div className="name__login">
                <p>Email của bạn</p>
                <input
                  className={`${
                    checkInputEmail ? "comment__text--active" : ""
                  }`}
                  type="text"
                  placeholder="vidugmail.com"
                  onClick={() => setCheckInputEmail(!checkInputEmail)}
                  onBlur={() => setCheckInputEmail(false)}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                />
              </div>

              <button type="submit" style={{ marginTop: "10px" }}>
                {!loader ? "Tiếp tục" : <Spin />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
