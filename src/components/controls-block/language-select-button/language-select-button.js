import React from "react";

import "./language-select-button";

export default class LanguageSelectButton extends React.Component {
  handleChange = ({ target }) => {
    this.props.setLanguage(target.value);
  };

  render() {
    return (
      <select
        className="btn btn-outline-secondary lang-select"
        onChange={this.handleChange}
      >
        <option value="ru">ru</option>
        <option value="en">en</option>
      </select>
    );
  }
}
