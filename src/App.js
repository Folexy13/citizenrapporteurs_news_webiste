import "./App.css";
import { NewsPage, CreateNews } from "./pages";
import { routes } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="main-container">
      <Router>
        {/* <Navbar /> */}
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
