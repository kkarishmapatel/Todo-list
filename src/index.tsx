import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
// import { store } from "./app/store";
import store from "./app/store";
// import { createRoot } from "react-dom/client";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// const container = document.getElementById("root");
// const root = createRoot(container!); // createRoot(container!) if you use TypeScript
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );
