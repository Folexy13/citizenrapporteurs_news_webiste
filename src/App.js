import "./App.css";
import { NewsPage, CreateNews, HomePage, NewsMain } from "./pages";
import React,{useEffect} from "react";
import { routes } from "./routes";
import { useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navbar, Sidebar } from "./components";
import { useLayoutEffect, useState } from "react";
import { newsAction } from "./redux/action/newsAction";
const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};
function App() {
  const [show, setShow] = useState(false);
  const dispacth = useDispatch()

  const handleToggleShow = () => {
    setShow(!show);
    console.log("first");
  };
  useEffect(() => {
 dispacth(newsAction.getClickedNews())
  }, [dispacth])
  
  
  return (
    <div className="main-container">
      <Router>
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
              name={routes.HOMEPAGE.name}
              path={"/create-news"}
              element={<CreateNews />}
              exact
            />
            <Route
              name={routes.NEWSPAGE.name}
              path={routes.NEWSPAGE.path + ":slug"}
              element={<NewsPage />}
            />
            <Route
              name={routes.NEWSPAGE_MAIN.name}
              path={routes.NEWSPAGE_MAIN.path + "/:id/:slug"}
              element={<NewsMain />}
            />
          </Routes>
        </Wrapper>
      </Router>
    </div>
  );
}

export default App;
