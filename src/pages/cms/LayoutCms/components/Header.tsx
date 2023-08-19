import "../styles/header.scss";
import { Input, Space, Popover, Button, Badge, Avatar } from "antd";
import { useState, useContext } from "react";
import { UserOutlined, BellFilled, MailFilled } from "@ant-design/icons";
import PopoverNoti from "./PopoverNoti";
import PopoverMail from "./PopoverMail";
import PopoverAccount from "./PopoverAccount";
import { AuthContext } from "../../../../context/AuthContextProvider";
import setToken from "../../../../ultis/setToken";

const { Search } = Input;

const Header = () => {
  const onSearch = () => {
    console.log("onSearch");
  };
  const [openNoti, setOpenNoti] = useState(false);
  const [openMail, setOpenMail] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const hide = () => {
    setOpenNoti(false);
  };

  const { user, loaderUser }: any = useContext(AuthContext);

  const logout = () => {
    setToken("");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };

  return (
    <div className="header-cms">
      <div className="header-screen screen-95">
        <div className="left">
          <Space direction="vertical">
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
          </Space>
        </div>
        <div className="right">
          <div className="notification-cms">
            <Popover
              content={<PopoverNoti />}
              trigger="click"
              open={openNoti}
              onOpenChange={() => setOpenNoti(!openNoti)}
            >
              <Space size={16} style={{ cursor: "pointer" }}>
                <Badge count={1} size="small">
                  <BellFilled rev={undefined} className="icon-header" />
                </Badge>
              </Space>
            </Popover>
          </div>
          <div className="message">
            <Popover
              content={<PopoverMail />}
              trigger="click"
              open={openMail}
              onOpenChange={() => setOpenMail(!openMail)}
            >
              <Space size={16} style={{ cursor: "pointer" }}>
                <Badge count={1} size="small">
                  <MailFilled rev={undefined} className="icon-header" />
                </Badge>
              </Space>
            </Popover>
          </div>
          <div className="account-cms">
            <Popover
              content={<PopoverAccount logout={logout} />}
              trigger="click"
              open={openUser}
              onOpenChange={() => setOpenUser(!openUser)}
            >
              <div className="avatar">
                <span style={{ marginRight: "5px" }}>{user?.user?.name}</span>
                <Space size={24}>
                  <Avatar
                    style={{ backgroundColor: "#87d068" }}
                    icon={<UserOutlined rev={undefined} />}
                  />
                </Space>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
