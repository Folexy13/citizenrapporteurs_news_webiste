import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { truncateText } from "../components/card/Card";

const MetaDecorator = ({ description, title, imageUrl }) => {
  return (
    <Helmet>
      <title>{truncateText(title, 40)}</title>
      <meta name="description" content={truncateText(description, 80)} />
      <meta property="og:description" content={truncateText(description, 80)} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:title" content={truncateText(title, 40)} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />
      <meta property="og:image:type" content="image/jpeg" />
    </Helmet>
  );
};

MetaDecorator.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};

export default MetaDecorator;
