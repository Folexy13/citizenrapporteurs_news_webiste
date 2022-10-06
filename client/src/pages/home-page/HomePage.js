import React from "react";
import "./home-page.scss";
import {
	Card,
	Entertainment,
	Layout,
	Opinion,
	SelectCard,
	SingleRow,
	Witness,
} from "../../components";
import Footer from "../../components/footer/Footer";

function HomePage({ children }) {
	return (
		<div className="home-page">
			<Layout>
				<Card />
				<SelectCard />
				<Opinion />
			</Layout>
			<div className="last-container">
				<div className="middle-container">
					<SingleRow />
					<Entertainment />
					<Witness />
				</div>
			</div>
			<div className="footer-section">
				<Footer />
			</div>
		</div>
	);
}

export default HomePage;
