import React from "react";
import PropTypes from "prop-types";
import HeatingPageTemplate from "../../templates/components/HeatingTest/HeatingTest";

const HeatingTestCNPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();

  if (data) {
    return <HeatingPageTemplate title={data.title} subTitle={data.subTitle} />;
  } else {
    return <div>Loading...</div>;
  }
};

HeatingTestCNPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default HeatingTestCNPagePreview;
