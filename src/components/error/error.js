import React from "react";

import "./error.css";

export default class Error extends React.Component {
  render() {
    const { language } = this.props;

    const title = language === 'en' ? "Error" : 'Ошибка'
    const description = language === "en" ? 'Enter a valid request' : 'Ведден не корректный запрос'    
    return (
      <div className="error-block">
        <h1 className="error-title">{title}</h1>
        <p className="error-description">{description}</p>
      </div>
    );
  }
}
