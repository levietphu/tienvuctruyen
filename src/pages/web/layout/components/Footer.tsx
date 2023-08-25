import "../styles/footer.scss";
import androi from "../../../../assets/google-play-badge.0dbdf26.png";
import ios from "../../../../assets/app-store-badge.fba0f3f.png";

const Footer = ({ catalog, logo, link_apple, link_androi }: any) => {
  console.log("footer");

  return (
    <div className="footer">
      <div className="footer__logo center">
        <img
          src={`${process.env.REACT_APP_UPLOADS}Config${logo?.value}`}
          alt="webtruyen"
        />
        <span>tiên vực</span>
      </div>
      <p>{catalog?.value}</p>
      <div className="footer__download center">
        <a href={link_androi?.value} className="mr-5">
          <img src={androi} alt="webtruyen" />
        </a>
        <a href={link_apple?.value}>
          <img src={ios} alt="webtruyen" />
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
