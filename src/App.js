import "./App.css";
import { NewsPage, CreateNews } from "./pages";
import { routes } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar } from "./components";
import { useState } from "react";

function App() {
  const [show, setShow] = useState(false);
  const handleToggleShow = () => {
    setShow(!show);
  };
  return (
    <div className="main-container">
      <Router>
        <Navbar state={show} onClick={handleToggleShow} />
        <Sidebar show={show} onClick={handleToggleShow} />
        <Routes>
          {/* <Route
            name={routes.HOMEPAGE.name}
            path={routes.HOMEPAGE.path}
            element={<HomePage />}
            exact
          /> */}
          <Route
            name={routes.HOMEPAGE.name}
            path={routes.HOMEPAGE.path}
            element={<CreateNews />}
            exact
          />
          <Route
            name={routes.NEWSPAGE.name}
            path={routes.NEWSPAGE.path + ":slug"}
            element={<NewsPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
