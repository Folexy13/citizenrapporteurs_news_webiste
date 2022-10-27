import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { truncateText } from "../components/card/Card";

const MetaDecorator = ({ description, imageUrl }) => (
  <Helmet>
    {/* <meta name="description" content={truncateText(description, 80)} />
    <meta property="og:description" content={truncateText(description, 80)} />
    <meta property="og:image" itemProp="image" content={imageUrl} />
    <meta property="og:image:secure_url" content={imageUrl} />
    <meta property="og:image:width" content="300" />
    <meta property="og:url" content={window.location.href} />
    <meta property="og:image:height" content="300" />
    <meta property="og:determiner" content="the" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:locale:alternate" content="fr_FR" />
    <meta property="og:locale:alternate" content="es_ES" />
    <meta property="og:site_name" content="IMDb" /> */}
    <meta
      property="og:image"
      content="https://res.cloudinary.com/folajimidev/image/upload/v1665830019/jf3dzmxvrcwrubuczvh6.jpg"
    />
    <meta
      property="og:image:secure_url"
      content="https://res.cloudinary.com/folajimidev/image/upload/v1665830019/jf3dzmxvrcwrubuczvh6.jpg"
    />
    <meta property="og:audio" content="http://example.com/bond/theme.mp3" />
    <meta
      property="og:description"
      content="Sean Connery found fame and fortune as the
                   suave, sophisticated British agent, James Bond."
    />
    <meta property="og:determiner" content="the" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:locale:alternate" content="fr_FR" />
    <meta property="og:locale:alternate" content="es_ES" />
    <meta property="og:site_name" content="IMDb" />
    <meta property="og:video" content="http://example.com/bond/trailer.swf" />
  </Helmet>
);

MetaDecorator.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};

export default MetaDecorator;
