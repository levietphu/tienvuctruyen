import React, { useEffect, useState } from "react";
import {
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Image, Button } from "antd";
import { LayoutContext } from "../../../../context/LayoutContextProvider";
import "../styles/sidebar.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContextProvider";
import { checkPer } from "../../../../ultis/checkPer";

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

const SideBar: React.FC = () => {
  const { dataLayout }: any = React.useContext(LayoutContext);
  const { user }: any = React.useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const ChangeRoute = ({ key }: any) => {
    navigate(key);
  };

  const items: MenuItem[] = [
    getItem("Quản trị", "/dashboard", <PieChartOutlined rev={undefined} />),
    user &&
      checkPer(user.role, "cate-view") &&
      getItem(
        "Thể loại",
        "/dashboard/cate/view",
        <PieChartOutlined rev={undefined} />
      ),
    user &&
      checkPer(user.role, "author-view") &&
      getItem(
        "Tác giả",
        "/dashboard/author/view",
        <DesktopOutlined rev={undefined} />
      ),
    user &&
      checkPer(user.role, "author-view") &&
      getItem(
        "Dịch giả",
        "/dashboard/trans/view",
        <ContainerOutlined rev={undefined} />
      ),
    user &&
      checkPer(user.role, "story-view") &&
      getItem(
        "Truyện",
        "/dashboard/story/view",
        <ContainerOutlined rev={undefined} />
      ),
    user &&
      checkPer(user.role, "banner-view") &&
      getItem(
        "Banner",
        "/dashboard/banner/view",
        <ContainerOutlined rev={undefined} />
      ),
    user &&
      checkPer(user.role, "affiliatedbank-view") &&
      getItem(
        "Ngân hàng liên kết",
        "/dashboard/affiliated_bank/view",
        <ContainerOutlined rev={undefined} />
      ),

    getItem("Config", "sub1", <MailOutlined rev={undefined} />, [
      user &&
        checkPer(user.role, "logo-view") &&
        getItem("Logo", "/dashboard/logo/view"),
      user &&
        checkPer(user.role, "ads-view") &&
        getItem("Ads", "/dashboard/ads/view"),
      user &&
        checkPer(user.role, "contact-view") &&
        getItem("Contact", "/dashboard/contact/view"),
    ]),
    getItem("Quản lý giao dịch", "sub2", <MailOutlined rev={undefined} />, [
      user &&
        checkPer(user.role, "transaction-view") &&
        getItem("Nạp tiền", "/dashboard/transaction/view"),
      user &&
        checkPer(user.role, "withdrawmoney-view") &&
        getItem("Rút tiền", "/dashboard/withdraw_money/view"),
    ]),
    user &&
      checkPer(user.role, "bankinfo-view") &&
      getItem(
        "BankInfo",
        "/dashboard/bankinfo/view",
        <ContainerOutlined rev={undefined} />
      ),
    user &&
      checkPer(user.role, "user-view") &&
      getItem(
        "User",
        "/dashboard/user/view",
        <ContainerOutlined rev={undefined} />
      ),
    user &&
      checkPer(user.role, "role-view") &&
      getItem(
        "Vai trò",
        "/dashboard/role/view",
        <ContainerOutlined rev={undefined} />
      ),
    user &&
      checkPer(user.role, "per-view") &&
      getItem(
        "Quyền",
        "/dashboard/per/view",
        <ContainerOutlined rev={undefined} />
      ),
  ];
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="sidebar-cms">
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? (
          <MenuUnfoldOutlined rev={undefined} />
        ) : (
          <MenuFoldOutlined rev={undefined} />
        )}
      </Button>
      <Menu
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        onClick={ChangeRoute}
      />
    </div>
  );
};

export default SideBar;
