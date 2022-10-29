import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { usePromiseTracker } from "react-promise-tracker";
import { Spinner } from "./components";
import MetaDecorator from "./helpers/metaDecorator";
const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return promiseInProgress && <Spinner />;
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MetaDecorator
        description={"store.descriptio"}
        title={"store.title"}
        imageUrl={
          "https://yt3.ggpht.com/ytc/AMLnZu_iIR_sJ69owCwzuDYvx-FuXA4n2CJYAPWIM33rBA=s900-c-k-c0x00ffffff-no-rj"
        }
        imageAlt="alt"
      />
      <App />
      <LoadingIndicator />
    </Provider>
  </React.StrictMode>
);
