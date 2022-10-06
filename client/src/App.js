import "./App.css";
import { Navbar } from "./components";
import { NewsPage, HomePage } from "./pages";
import { routes } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="main-container">
			<Router>
				<Navbar />
				<Routes>
					<Route
						name={routes.HOMEPAGE.name}
						path={routes.HOMEPAGE.path}
						element={<HomePage />}
					/>
					<Route
						name={routes.NEWSPAGE.name}
						path={routes.NEWSPAGE.path}
						element={<NewsPage />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
