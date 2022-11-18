import { ReactNode, useContext, useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useParams, useLocation } from "react-router-dom";
import { SettingContext } from "../context/SettingContextProvider";
import Popup from "../pages/chapter/Popup";
import ListChapter from "../components/chapter/ListChapter";
import { LayoutContext } from "../context/LayoutContextProvider";

export interface Props {
  children?: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const params = useParams();
  const { togglePopup, theme }: any = useContext(SettingContext);
  const { dataLayout }: any = useContext(LayoutContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      {params.slugchapter && <ListChapter />}

      {togglePopup && <Popup />}
    </>
  );
};

export default MainLayout;
