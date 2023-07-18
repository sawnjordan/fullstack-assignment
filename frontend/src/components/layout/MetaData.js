import React from "react";
import { Helmet } from "react-helmet";

export const MetaData = (props) => {
  return (
    <Helmet>
      <title>{`${props.title} - Book eCommerce`}</title>
    </Helmet>
  );
};
