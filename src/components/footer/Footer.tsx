import React from "react";
import "./footer.scss";
import logo from "../../assets/android-chrome-192x192.png";
import androi from "../../assets/google-play-badge.0dbdf26.png";
import ios from "../../assets/app-store-badge.fba0f3f.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__logo center">
        <img src={logo} alt="" />
        <span>tiên vực</span>
      </div>
      <p>
        Webtruyen đọc truyện dịch nhanh nhất, ổn định nhất, đọc truyện KHÔNG
        quảng cáo.
      </p>
      <div className="footer__download center">
        <a href="" className="mr-5">
          <img src={androi} alt="" />
        </a>
        <a href="">
          <img src={ios} alt="" />
        </a>
      </div>
      <div className="center mt-20 footer__support">
        <a href="" className="mr-20">
          liên hệ hỗ trợ
        </a>
        <a href="">quy định và chính sách</a>
      </div>
    </div>
  );
};

export default Footer;
