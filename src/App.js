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
import { useDispatch } from "react-redux";
import MetaDecorator from "./helpers/metaDecorator";
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
  const dispacth = useDispatch();
  const handleToggleShow = () => {
    setShow(!show);
  };
  useEffect(() => {
    setInterval(() => {
      dispacth(newsAction.getClickedNews());
    }, 2000);
  }, [dispacth]);

  return (
    <div className="main-container">
      <MetaDecorator>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&family=Shrikhand&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.css"
          integrity="sha512-EaaldggZt4DPKMYBa143vxXQqLq5LE29DG/0OoVenoyxDrAScYrcYcHIuxYO9YNTIQMgD8c8gIUU8FQw7WpXSQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <link
          href="https://fonts.googleapis.com/css2?family=Beau+Rivage&family=Charis+SIL:ital,wght@0,400;0,700;1,400;1,700&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Slab:wght@700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </MetaDecorator>
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
