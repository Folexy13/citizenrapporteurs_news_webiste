import React from "react";
import "./layout.scss";
import RightBar from "../right-bar/RightBar.js";
import RightContainer from "../right-container/RightContainer";
const path = window.location.pathname;
function Layout({ children }) {
	return (
		<div className="container">
			<div className="flex-container">
				<div className="flex-left">{children}</div>
				<div className="flex-right">
					<RightBar type={path === "/" || path === "/home" ? "home" : ""}>
						<RightContainer />
					</RightBar>
				</div>
			</div>
		</div>
	);
}

export default Layout;
