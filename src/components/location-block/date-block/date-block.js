import React from "react";

import "./date-block.css";

export default class DateBlock extends React.Component {
  getDate() {
    const date = new Date();
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
      timezone: "UTC",
    };

    return date.toLocaleString(this.props.language, options);
  }

  render() {
    return <div className="date">{this.getDate()}</div>;
  }
}
