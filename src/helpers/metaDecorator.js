import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { truncateText } from "../components/card/Card";

const MetaDecorator = ({ description, imageUrl, imageAlt }) => (
  <Helmet>
    <meta name="description" content={truncateText(description, 80)} />
    <meta property="og:description" content={truncateText(description, 80)} />
    <meta property="og:image" itemProp="image" content={imageUrl} />
    <meta property="og:image:secure_url" content={imageUrl} />
    <meta property="og:image:width" content="300" />
    <meta property="og:image:height" content="300" />
  </Helmet>
);

MetaDecorator.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};

export default MetaDecorator;
