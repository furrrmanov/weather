import React from "react";

import "./unit-select-block.css";

export default class UnitSelectBlock extends React.Component {
  handleClick = ({ target }) => {
    this.props.setTempUnit(target.value);
  };
  
  render() {
    const button = [
      { unit: "°C", value: "metric", key: "m" },
      { unit: "°F", value: "imperial", key: "i" },
    ];
    const buttonRender = button.map((item) => {
      return (
        <button
          className="btn btn-outline-secondary"
          value={item.value}
          key={item.key}
          onClick={this.handleClick}
        >
          {item.unit}
        </button>
      );
    });

    return <div className="unit-select-block">{buttonRender}</div>;
  }
}
