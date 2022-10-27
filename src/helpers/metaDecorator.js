import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { truncateText } from "../components/card/Card";

const MetaDecorator = ({ description, imageUrl, imageAlt }) => (
  <Helmet>
    <meta property="og:title" content={title} />
    <meta name="description" content={truncateText(description, 80)} />
    <meta property="og:description" content={truncateText(description, 80)} />
    <meta property="og:image" content={imageUrl} />
    <meta property="og:image:secure_url" content={imageUrl} />

    <meta property="og:url" content={window.location.href} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image:alt" content={imageAlt} />
    <meta name="twitter:site" content={"@citizenRapporteur"} />
  </Helmet>
);

MetaDecorator.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};

export default MetaDecorator;
