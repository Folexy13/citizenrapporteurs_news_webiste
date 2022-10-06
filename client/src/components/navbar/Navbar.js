import React from "react";
import { logo } from "../../assets";
import "./navbar.scss";
// import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {
	const location = useLocation();
	return (
		<div className="navBar">
			<div className="navTopCon">
				<div className="navTop">
					<div className="navTopContainer">
						{/* Current Time Container */}
						<div className="time">
							<small>Monday, Septembar 12, 2022</small>
						</div>
						<div className="socialLink">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-facebook"
								viewBox="0 0 16 16"
							>
								<path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
							</svg>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-twitter"
								viewBox="0 0 16 16"
							>
								<path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
							</svg>
						</div>
					</div>
				</div>
			</div>
			<div className="secondNavContainer">
				{/* Middle Navbar */}
				<div className="navMiddle">
					<a href="/">
						<img src={logo} className="logo" alt="img.jpg" />
					</a>
					{/* Filter Form */}
					<form className="search">
						<div className="row">
							<input type="text" name="q" id="q" placeholder="Search..." />
							<button className="danger" type="submit">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-search"
									viewBox="0 0 16 16"
								>
									<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
								</svg>
							</button>
						</div>
					</form>
					{/* Menu Bar */}
					<small className="menu">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="25"
							height="25"
							fill="currentColor"
							class="bi bi-list"
							viewBox="0 0 16 16"
						>
							<path
								fill-rule="evenodd"
								d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
							/>
						</svg>
					</small>
				</div>
			</div>
			{/* Navbar Last */}
			<div className="navLast">
				<a href="/" className={location.pathname === "/" ? "active" : ""}>
					<h5>HOME</h5>
				</a>
				<a
					href="/news"
					className={location.pathname === "/news" ? "active" : ""}
				>
					<h5>NEWS</h5>
				</a>
				<a href="/" className={location.pathname === "/nation" ? "active" : ""}>
					<h5>THE NATION</h5>
				</a>
				<a
					href="/"
					className={location.pathname === "/business" ? "active" : ""}
				>
					<h5>BUSINESS</h5>
				</a>
				<a
					href="/"
					className={location.pathname === "/politics" ? "active" : ""}
				>
					<h5>POLITICS</h5>
				</a>
				<a
					href="/"
					className={location.pathname === "/investigation" ? "active" : ""}
				>
					<h5>INVESTIGATION</h5>
				</a>
				<a
					href="/"
					className={location.pathname === "/opinion" ? "active" : ""}
				>
					<h5>OPINION</h5>
				</a>
				<a href="/" className={location.pathname === "/sport" ? "active" : ""}>
					<h5>SPORTS</h5>
				</a>
				<a
					href="/"
					className={location.pathname === "/entertainment" ? "active" : ""}
				>
					<h5>ENTERTAINMENT</h5>
				</a>
			</div>
		</div>
	);
}

export default Navbar;
