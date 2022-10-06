import React from "react";
import { Layout, NewsFlex } from "../../components";
import Footer from "../../components/footer/Footer";
import "./news-page.scss";

function NewsPage() {
	return (
		<div className="news-page">
			<Layout>
				<NewsFlex />
			</Layout>
			<Footer />
		</div>
	);
}

export default NewsPage;
