import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SettingContextProvider from "./context/SettingContextProvider";
import HomeContextProvider from "./context/HomeContextProvider";
import reportWebVitals from "./reportWebVitals";
import LayoutContextProvider from "./context/LayoutContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <LayoutContextProvider>
    <SettingContextProvider>
      <HomeContextProvider>
        <App />
      </HomeContextProvider>
    </SettingContextProvider>
  </LayoutContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
