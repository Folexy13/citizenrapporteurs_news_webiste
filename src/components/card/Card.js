import React from "react";
import { NewImage } from "../../assets";
import "./card.scss";

function Card() {
	return (
		<div className="card">
			<div className="img-container">
				<a href="/">
					<img src={NewImage} alt="img.jpg" />
				</a>
				<h5>THE NATION</h5>
			</div>
			<div className="card-body">
				<div className="item1">
					<a href="/" className="item-title">
						<h1>
							Insecurity: Northern governors, traditional rulers demand state
							police
						</h1>
					</a>
					<div className="detail-flex">
						<small>
							BY <a href="/">STANLEY OSARIEMEN</a>
						</small>
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
					<p>
						Governors of the 19 northern states under the umbrella of the
						Northern Governors Forum (NGF) have called for the immediate
						establishment of state police in order to address the escalating
						insecurity challenges...
					</p>
					<a href="/" className="read">
						READ MORE
					</a>
				</div>
				<div className="item-bottom">
					<h5 className="item-flex">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							fill="red"
							class="bi bi-caret-right-fill"
							viewBox="0 0 16 16"
						>
							<path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
						</svg>
						<a href="/">
							My administration has done extremely well, Buhari boasts in Owerri
						</a>
					</h5>
					<h5 className="item-flex">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							fill="red"
							class="bi bi-caret-right-fill"
							viewBox="0 0 16 16"
						>
							<path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
						</svg>
						<a href="/">
							Appeal Court reserves judgment on Nnamdi Kanu, adjourns
							indefinitely
						</a>
					</h5>
					<h5 className="item-flex">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							fill="red"
							class="bi bi-caret-right-fill"
							viewBox="0 0 16 16"
						>
							<path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
						</svg>
						<a href="/">
							Appeal Court reserves judgment on Nnamdi Kanu, adjourns
							indefinitely
						</a>
					</h5>
					<h5 className="item-flex">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							fill="red"
							class="bi bi-caret-right-fill"
							viewBox="0 0 16 16"
						>
							<path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
						</svg>
						<a href="/">
							Appeal Court reserves judgment on Nnamdi Kanu, adjourns
							indefinitely
						</a>
					</h5>
				</div>
			</div>
		</div>
	);
}

export default Card;
