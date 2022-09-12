import { ReactNode, useContext, useRef } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useParams } from "react-router-dom";
import { SettingContext } from "../context/SettingContextProvider";
import Popup from "../pages/chapter/Popup";
import ListChapter from "../components/chapter/ListChapter";

export interface Props {
  children?: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const params = useParams();
  const { togglePopup, theme }: any = useContext(SettingContext);

  return (
    <>
      <header>
        <Header />
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
          <Footer />
        </footer>
      )}
      {params.slugchapter && <ListChapter />}

      {togglePopup && <Popup />}
    </>
  );
};

export default MainLayout;
