import React from "react";

import "./weather-info-block.css";

export default class WeatherInfoBlock extends React.Component {
  render() {
    const { description, icon, temp, wind, humidity, language, unit } = this.props;
    const url = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    const labelTemp = language === 'en' ? 'Apparent Temperature:  ' : 'Кажущаяся температура:  ';
    const labelWind = language === 'en' ? 'Wind speed:  ' : 'Скорость ветра:  ';
    const labelHumidity = language === 'en' ? 'Humidity:  ' : 'Влажность:  ';

    const labelUnitTemp = unit === 'metric' ?  ' °C' : ' °F'

    return (
      <div className="weather-info-block">
        <div className="weather-about">
          <span className="weather-info-big">{description}</span>
          <img id="icon" className="icon" src={url} alt="#"></img>
        </div>

        <div className="weather-info">
          <div className="weather-temp-big">
            <span>{Math.trunc(temp)}</span>
            <span>{labelUnitTemp}</span>
          </div>
          <ul className="weather-description">
            <li>{labelTemp} {temp + labelUnitTemp}</li>
            <li>{labelWind} {wind + ' м/c'}</li>
            <li>{labelHumidity} {humidity + ' %'}</li>
          </ul>
        </div>
      </div>
    );
  }
}
