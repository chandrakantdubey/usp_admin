import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { GlobalTheme } from "@carbon/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GlobalTheme theme={localStorage.getItem("theme")}>
      <App />
    </GlobalTheme>
  </Provider>
);
