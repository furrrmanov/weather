import React from "react";

import "./weather-daily-block.css";

export default class WeatherDailyBlock extends React.Component {
  dayParse = (date) => {
    const day = new Date(date).getDay();
    return this.transformDay(day, this.props.language);
  };

  transformDay = (number, language) => {
    let day;

    const week = {
      ru: [
        "воскресенье",
        "понедельник",
        "вторник",
        "среда",
        "четверг",
        "пятница",
        "суббота",
      ],
      en: [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
    };

    switch (language) {
      case "ru":
        day = week.ru[number];
        break;
      case "en":
        day = week.en[number];
        break;
      default:
        break;
    }

    return day;
  };

  render() {
    const { unit, weatherDaily } = this.props;

    const labelUnitTemp = unit === "metric" ? " °C" : " °F";

    const daysBlockArr = weatherDaily.map((item, idx) => {
      const url = `http://openweathermap.org/img/wn/${item.icon}@2x.png`;

      if (idx < 3) {
        return (
          <div className="days-block" key={idx}>
            <h2 className="days-block-name">{this.dayParse(item.days)}</h2>
            <div className='days-info'>
            <div className="days-block-temp">
              {item.temp}
              <span>{labelUnitTemp}</span>
            </div>
            <img className="days-block-img" src={url} alt="img"></img>
            </div>
          </div>
        );
      }
      return null;
    });

    return <div className="weather-daily-block">{daysBlockArr}</div>;
  }
}
