import React from "react";
import "./right-bar.scss";

function RightBar({ type, ...props }) {
	if (type === "home") return <div>{props.children}</div>;
}

export default RightBar;
