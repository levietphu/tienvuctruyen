import "../styles/popover-account.scss";
import {
  UserOutlined,
  SettingFilled,
  AppstoreOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const PopoverAccount = ({ logout }: any) => {
  return (
    <div className="popover-account">
      <a href="#" className="popover-account__item">
        <div>
          <UserOutlined rev={undefined} style={{ color: "#b9bdba" }} />
        </div>
        <p>Profile</p>
      </a>
      <a href="#" className="popover-account__item">
        <div>
          <SettingFilled rev={undefined} style={{ color: "#b9bdba" }} />
        </div>
        <p>setting</p>
      </a>
      <a href="#" className="popover-account__item">
        <div>
          <AppstoreOutlined rev={undefined} style={{ color: "#b9bdba" }} />
        </div>
        <p>activity</p>
      </a>
      <button className="popover-account__item border-top" onClick={logout}>
        <div>
          <LogoutOutlined rev={undefined} style={{ color: "#b9bdba" }} />
        </div>
        <p>logout</p>
      </button>
    </div>
  );
};

export default PopoverAccount;
