import React, { Component } from "react";

import "./App.css";

import GeolocationPointService from "../services/WeatherApiService";
import ControlsBlock from "../controls-block";
import SearchBlock from "../search-block/search-block";
import LocationBlock from "../location-block/location-block";
import WeatherInfoBlock from "../weather-info-block/weather-info-block";
import WeatherDailyBlock from "../wether-daily-block/weather-daily-block";
import Map from "../map/map";
import Spinner from '../spinner/spinner'
import Error from "../error/error";

export default class App extends Component {
  GeolocationPointService = new GeolocationPointService();

  constructor(props) {
    super(props);
    this.state = {
      language: "ru",
      unit: "metric",
      coord: null,
      city: null,
      country: null,
      timezone: null,
      temp: null,
      humidity: null,
      wind: null,
      description: null,
      icon: null,
      loading: true,
      error: false,
      weatherDaily: [],
    };
  }

  componentDidMount() {
    this.updateWeather();
    GeolocationPointService.getImgRequest().then(this.onImageLoaded)
  }

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }


  updateWeather = (city, unit, language) => {
    GeolocationPointService.getWeatherRequest(city, unit, language).then(
      this.onWeatherLoaded,
      this.setState({error: false})
    ).catch(this.onError);
    ;
    GeolocationPointService.getLocationPoint(city, language).then(
      this.onLocationLoaded,
      this.setState({error: false})
    ).catch(this.onError);
    ;

    this.setState({loading: true})
  };

  setLanguage = (lang) => {
    this.setState({ language: lang, loading: true });
    this.updateWeather(this.state.city, this.state.unit, lang);
  };

  setTempUnit = (value) => {
    this.setState({ unit: value, loading: true });
    this.updateWeather(this.state.city, value, this.state.lang);
  }

  onSearchLocation = (loc) => {
    this.setState({loading: true });
    this.updateWeather(loc, this.state.unit, this.state.language);
  };

  onLocationLoaded = (location) => {
    this.setState({
      country: location.country,
      timezone: location.timezone,
      // city: location.city,
      loading: false,
    });
  };

  onWeatherLoaded = (weather) => {
    this.setState({
      temp: weather.temp,
      humidity: weather.humidity,
      wind: weather.wind,
      description: weather.description,
      icon: weather.icon,
      weatherDaily: weather.weatherDaily,
      coord: weather.coord,
      loading: false,
      city: weather.city
    });
  };

  onImageLoaded = (img) => {
    if(img) {
      document.body.style.cssText = `
      background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgb(0, 0, 0)),url('${img.urls.regular}');
      background-repeat:no-repeat;
      background-size: 100% 100vh;
      background-color: #000000;
      color: #c4cfe1;
     `;
    }
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };


  render() {
    const { loading, language, timezone, country, city, temp, wind, humidity, description, icon, unit, weatherDaily, coord, error } = this.state;


    if(loading) {
      return( 
      <div className="wrapper">
        <div className="header">
         <ControlsBlock setLanguage={this.setLanguage} setTempUnit={this.setTempUnit}/>
        </div>

        <div className='main'>
          <Spinner />
        </div>
        </div>
      )
    }

    if(error) {
      return( 
        <div className="wrapper">
          <div className="header">
           <ControlsBlock setLanguage={this.setLanguage} setTempUnit={this.setTempUnit}/>
          </div>
  
          <div className='main'>
            <Error />
            <div className='map-wrapper'>
             <SearchBlock onSearchLocation={this.onSearchLocation} />
             <Map coord={coord}/>
        </div>
          </div>
          </div>
        )
    }


    return (
      <div className="wrapper">
        <div className="header">
          <ControlsBlock setLanguage={this.setLanguage} 
          setTempUnit={this.setTempUnit} 
          onImageLoaded={this.onImageLoaded}/>
        </div>

        <div className='main'>
        <div className='weather'>

        <LocationBlock
          city={city}
          country={country}
          language={language}
          timezone={timezone}
        />

        <WeatherInfoBlock temp={temp} 
        description={description} 
        icon={icon} 
        humidity={humidity}
        wind={wind}
        language={language}
        unit={unit}/>

        <WeatherDailyBlock 
        weatherDaily={weatherDaily}
        unit={unit} 
        language={language}/>
        </div>

        <div className='map-wrapper'>
        <SearchBlock onSearchLocation={this.onSearchLocation} />
        <Map coord={coord}/>
        </div>
        
       </div>
      </div>
    );
  }
}
