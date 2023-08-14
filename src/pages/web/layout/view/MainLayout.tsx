import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { SettingContext } from "../../../../context/SettingContextProvider";
import { LayoutContext } from "../../../../context/LayoutContextProvider";
import { Modal } from "antd";
import { AuthContext } from "../../../../context/AuthContextProvider";
import ModalReLogin from "../components/ModalReLogin";
import Props from "../../../../ultis/typeChildren";

const MainLayout = ({ children }: Props) => {
  const params = useParams();
  const { theme }: any = useContext(SettingContext);
  const { dataLayout }: any = useContext(LayoutContext);
  const { reLogin }: any = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (reLogin) {
      showModal();
    } else {
      handleCancel();
    }
  }, [reLogin]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <header>
        <Header
          cates={dataLayout && dataLayout.cates}
          logo={dataLayout && dataLayout.logo_header}
        />
      </header>
      <main
        className={`${
          theme === "dark" && params.slugchapter
            ? "dark"
            : theme === "book" && params.slugchapter
            ? "book"
            : ""
        }`}
      >
        <div className="screen-85">{children}</div>
      </main>
      {!params.slugchapter && (
        <footer className="center">
          <Footer
            catalog={dataLayout && dataLayout.khau_hieu}
            logo={dataLayout && dataLayout.logo_footer}
            link_apple={dataLayout && dataLayout.link_apple}
            link_androi={dataLayout && dataLayout.link_androi}
          />
        </footer>
      )}
      <Modal open={open} onOk={handleOk} onCancel={handleCancel}>
        <ModalReLogin />
      </Modal>
    </>
  );
};

export default MainLayout;
