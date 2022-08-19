import React, { ReactNode } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export interface Props {
  children?: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <div className="screen-85">{children}</div>
      </main>
      <footer className="center">
        <Footer />
      </footer>
    </>
  );
};

export default MainLayout;
