import {
  ToolOutlined,
  InstagramOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import "../styles/popover-noti.scss";
import { Avatar } from "antd";

const PopoverNoti = () => {
  return (
    <div className="popover-noti">
      <div className="top">
        <span>Alert Center</span>
      </div>
      <div className="main">
        <a className="main-item">
          <div className="icon">
            <Avatar
              size={35}
              style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
              icon={<InstagramOutlined rev={undefined} />}
            />
          </div>
          <div className="text-noti">
            <p>December 12 2023</p>

            <h3>A new monthly report is ready to download!</h3>
          </div>
        </a>
        <a className="main-item">
          <div className="icon">
            <Avatar
              size={35}
              style={{ backgroundColor: "green" }}
              icon={<TrophyOutlined rev={undefined} />}
            />
          </div>
          <div className="text-noti">
            <p>December 12 2023</p>

            <h3>A new monthly report is ready to download!</h3>
          </div>
        </a>
        <a className="main-item">
          <div className="icon">
            <Avatar
              size={35}
              style={{ backgroundColor: "blue" }}
              icon={<ToolOutlined rev={undefined} />}
            />
          </div>
          <div className="text-noti">
            <p>December 12 2023</p>

            <h3>A new monthly report is ready to download!</h3>
          </div>
        </a>
      </div>
      <div className="bottom"></div>
    </div>
  );
};

export default PopoverNoti;
