import React from "react";
import "./right-container.scss";
import { baba } from "../../assets";
import BodyFlex from "../body-flex/BodyFlex";

function RightContainer() {
	return (
		<div className="right-container">
			<div className="right-cont1">
				<h1>POLITICS</h1>
				<div className="image-container">
					<img src={baba} alt="img.jpg" />
					<a href="/" className="link-container">
						<div className="text-container">
							<h3>
								2023: Support for PDP is beyond politics, it’s Jihad – Katsina
								guber candidate
							</h3>
							<div className="detail-flex">
								<small className="svg-flex">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="10"
										height="10"
										fill="currentColor"
										class="bi bi-clock"
										viewBox="0 0 16 16"
									>
										<path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
										<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
									</svg>
									September 14, 2022
								</small>
								<small className="svg-flex">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="10"
										height="10"
										fill="currentColor"
										class="bi bi-chat"
										viewBox="0 0 16 16"
									>
										<path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
									</svg>
									0
								</small>
							</div>
						</div>
					</a>
				</div>
				{/* Reusable body-flex */}
				<BodyFlex />
				{/* Trending */}
				<div className="trend">
					<div className="trend-box">
						<h5>Trending</h5>
						<h5>Comments</h5>
						<h5>Latest</h5>
					</div>
					<div className="trend-body">
						<BodyFlex />
						<BodyFlex />
						<BodyFlex />
						<BodyFlex />
						<BodyFlex />
					</div>
				</div>
			</div>
		</div>
	);
}

export default RightContainer;
