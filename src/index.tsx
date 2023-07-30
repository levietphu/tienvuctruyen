import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SettingContextProvider from "./context/SettingContextProvider";
import HomeContextProvider from "./context/HomeContextProvider";
import reportWebVitals from "./reportWebVitals";
import LayoutContextProvider from "./context/LayoutContextProvider";
import AuthContextProvider from "./context/AuthContextProvider";
import { Provider } from "react-redux";
import { rootStore } from "./pages/cms/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <LayoutContextProvider>
        <SettingContextProvider>
          <AuthContextProvider>
            <HomeContextProvider>
              <App />
            </HomeContextProvider>
          </AuthContextProvider>
        </SettingContextProvider>
      </LayoutContextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
