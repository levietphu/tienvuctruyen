import React from "react";
import {
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu, Image } from "antd";
import { LayoutContext } from "../../../../context/LayoutContextProvider";
import "../styles/sidebar.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "Thể loại",
    "/dashboard/cate/view",
    <PieChartOutlined rev={undefined} />
  ),
  getItem(
    "Tác giả",
    "/dashboard/author/view",
    <DesktopOutlined rev={undefined} />
  ),
  getItem(
    "Dịch giả",
    "/dashboard/translator/view",
    <ContainerOutlined rev={undefined} />
  ),
  getItem(
    "Truyện",
    "/dashboard/story/view",
    <ContainerOutlined rev={undefined} />
  ),
  getItem(
    "Banner",
    "/dashboard/banner/view",
    <ContainerOutlined rev={undefined} />
  ),

  getItem("Config", "sub1", <MailOutlined rev={undefined} />, [
    getItem("Logo", "/dashboard/logo/view"),
    getItem("Ads", "/dashboard/ads/view"),
    getItem("Contact", "/dashboard/contact/view"),
  ]),
  getItem(
    "User",
    "/dashboard/user/view",
    <ContainerOutlined rev={undefined} />
  ),
  getItem(
    "Vai trò",
    "/dashboard/role/view",
    <ContainerOutlined rev={undefined} />
  ),
  getItem(
    "Quyền",
    "/dashboard/permission/view",
    <ContainerOutlined rev={undefined} />
  ),
];

const SideBar: React.FC = () => {
  const { dataLayout }: any = React.useContext(LayoutContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const ChangeRoute = ({ key }: any) => {
    navigate(key);
  };

  return (
    <div className="sidebar">
      <Link className="logo" to="/dashboard">
        <Image
          width={50}
          src={`${process.env.REACT_APP_UPLOADS}Config${dataLayout?.logo_header?.value}`}
          preview={false}
        />
        <span>Quản trị Tiên Vực</span>
      </Link>
      <Menu
        mode="inline"
        items={items}
        className="menu-cms"
        onClick={ChangeRoute}
        selectedKeys={[pathname]}
      />
    </div>
  );
};

export default SideBar;
