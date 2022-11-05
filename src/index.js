import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider, useSelector } from "react-redux";
import { usePromiseTracker } from "react-promise-tracker";
import { Spinner } from "./components";
import { truncateText } from "./components/card/Card";
const LoadingIndicator = (props) => {
  const store = useSelector((el) => el?.mainNews);
  useEffect(() => {
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", truncateText(store?.description, 80));
    document
      .querySelector('meta[property="og:description"]')
      .setAttribute("content", truncateText(store?.description, 80));
    document
      .querySelector('meta[property="og:image"]')
      .setAttribute("content", store?.image);
    document
      .querySelector('meta[property="og:image:secure_url"]')
      .setAttribute("content", store?.image);
    document.title = store.title;
  }, [store]);
  const { promiseInProgress } = usePromiseTracker();

  return promiseInProgress && <Spinner />;
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <LoadingIndicator />
    </Provider>
  </React.StrictMode>
);
