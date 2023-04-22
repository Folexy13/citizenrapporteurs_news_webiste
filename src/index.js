import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { usePromiseTracker } from "react-promise-tracker";
import { Spinner } from "./components";
import { SkeletonTheme } from "react-loading-skeleton";
const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return promiseInProgress && <Spinner />;
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <App />
      </SkeletonTheme>
      <LoadingIndicator />
    </Provider>
  </React.StrictMode>
);
