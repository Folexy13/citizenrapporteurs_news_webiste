import "./App.css";
import {
  NewsPage,
  UpdateNews,
  HomePage,
  NewsMain,
  LoginPage,
  RouteGard,
} from "./pages";
import { ErrorBoundary } from "react-error-boundary";
import React, { useEffect } from "react";
import { routes } from "./routes";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navbar, Sidebar } from "./components";
import { useLayoutEffect, useState } from "react";
import { newsAction } from "./redux/action/newsAction";
import { useDispatch, useSelector } from "react-redux";
import { truncateText } from "./components/card/Card";
const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};
function MyFallbackComponent({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
function App() {
  const [show, setShow] = useState(false);
  const store = useSelector((el) => el?.mainNews);
  const dispacth = useDispatch();
  const handleToggleShow = () => {
    setShow(!show);
  };
  useEffect(() => {
    setInterval(() => {
      dispacth(newsAction.getClickedNews());
    }, 2000);
  }, [dispacth]);

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
  return (
    <div className="main-container">
      <Router>
        <ErrorBoundary
          FallbackComponent={MyFallbackComponent}
          onError={(error, errorInfo) =>
            alert(JSON.stringify({ error, errorInfo }))
          }
          onReset={() => {
            // reset the state of your app
          }}
        >
          <Wrapper>
            <Navbar state={show} onClick={handleToggleShow} />
            <Sidebar show={show} onClick={handleToggleShow} />
            <Routes>
              <Route
                name={routes.HOMEPAGE.name}
                path={routes.HOMEPAGE.path}
                element={<HomePage />}
                exact
              />

              <Route
                name={routes.NEWSPAGE.name}
                path={routes.NEWSPAGE.path + ":slug"}
                element={<NewsPage />}
              />
              <Route
                name={routes.NEWSPAGE_MAIN.name}
                path={routes.NEWSPAGE_MAIN.path + "/:slug"}
                element={<NewsMain />}
              />
              <Route
                name={routes.LOGIN.name}
                path={routes.LOGIN.path}
                element={<LoginPage />}
              />
              <Route element={<RouteGard />}>
                <Route
                  name={routes.HOMEPAGE.name}
                  path={"/create-news"}
                  element={<UpdateNews type={"create"} />}
                  exact
                />

                <Route
                  path="/edit-news/:slug"
                  element={<UpdateNews type="update" />}
                />
              </Route>
            </Routes>
          </Wrapper>
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;
