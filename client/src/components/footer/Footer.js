import React from "react";
import { logo } from "../../assets";
import "./footer.scss";

function Footer() {
	return (
		<div className="footer">
			<div className="footer-container">
				<div className="footer-item">
					<a href="/">
						<img src={logo} alt="img.jpg" />
					</a>
				</div>
				<div className="footer-item">
					<h6>Categories</h6>
					<div className="item-flex">
						<div className="flex1">
							<a href="/">
								<h6>Business</h6>
							</a>
							<a href="/">
								<h6>Entertainment</h6>
							</a>
							<a href="/">
								<h6>Health</h6>
							</a>
						</div>
						<div className="flex1">
							<a href="/">
								<h6>Business</h6>
							</a>
							<a href="/">
								<h6>Entertainment</h6>
							</a>
							<a href="/">
								<h6>Health</h6>
							</a>
						</div>
					</div>
				</div>
				<div className="footer-item">
					<h6>Categories</h6>
					<div className="item-text">
						<a href="/">
							<h6>
								Insecurity: Northern governors, traditional rulers demand state
								police
							</h6>
						</a>
						<a href="/">
							<h6>
								Insecurity: Northern governors, traditional rulers demand state
								police
							</h6>
						</a>
					</div>
				</div>
			</div>
			<div className="copy-cont">
				<div className="copywrite">
					<div className="copy-flex">
						<p>
							Copyright © 2022 The Witness Newspaper | All Rights Reserved.{" "}
						</p>
					</div>
					<div className="copy-flex copy-link">
						<a href="/">About Us /</a>
						<a href="/">Advertise /</a>
						<a href="/">Contact Us /</a>
						<a href="/">Privacy Policy /</a>
						<a href="/">Terms and Conditions</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Footer;
