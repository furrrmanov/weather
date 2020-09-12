export default class GeolocationPointService {
  static async getWeatherRequest(city, unit = 'metric', lang = "ru") {
    
    const WEATHER_API_KEY = "6c83a5ce38c337a613a5a4f9fdd64430";
    const WEATHER_API = "https://api.openweathermap.org/data/2.5/forecast";

    let url;
    let weatherDaily;

    const location = await this.getLocationIp();

    const town = city ? city : location.city

    url = `${WEATHER_API}?q=${town}&lang=${lang}&units=${unit}&APPID=${WEATHER_API_KEY}`;

    const response = await fetch(url);

    if(!response.ok) {
      throw new Error(
        `Could not fetch ${url} {received ${response.status}`
      );
    } else {
      const data = await response.json();

      const dailyData = data.list.filter((reading) => {
        return reading.dt_txt.includes("15:00:00");
      });
  
      weatherDaily = dailyData.map(this.transformDailyWeather);
      data.weatherDaily = weatherDaily;

      return this.transformWeather(data);
    }
    
  }

  static async getLocationRequest(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url} + , received ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  static async getLocationIp() {
    const url = `https://ipinfo.io/?token=feb304c4e835c3`;
    const res = await this.getLocationRequest(url);
    return res;
  }

  static async getLocationPoint(city, lang) {
    const _API_KEY = "c6b6da0f80f24b299e08ee1075f81aa5";
    const _Location_API = "https://api.opencagedata.com/geocode/v1/json";

    let locPoint;
    let url;

    let location = await this.getLocationIp();

    const town = city ? city : location.city

    url = `${_Location_API}?q=${town}&key=${_API_KEY}&pretty=1&language=${lang}`;

    const response = await fetch(url);

    if(!response.ok) {
      throw new Error(`Could not fetch ${url} + , received ${response.status}`);
    } else {
      locPoint = await response.json();

      return this.transformLocation(locPoint);
    }
   
  }

  static async getImgRequest() {
    const IMG_REQUEST_ID = '7OpGndPTAOMwzaFF6E6EJm3ZuAOd3SgWfXeEyXnHZm0'
    let img;

    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=summer&client_id=${IMG_REQUEST_ID}`;

    try {
      const response = await fetch(url);
      img = await response.json();
    } catch {}

    return img;
  }

  static transformLocation = (data) => {
    return {
      timezone: data.results[0].annotations.timezone.name,
      country: data.results[0].components.country,
      city: data.results[0].formatted.split(",")[0],
    };
  };

  static transformDailyWeather = (data) => {
    return {
      temp: data.main.temp,
      icon: data.weather[0].icon,
      days: data.dt_txt,
    };
  };

  static transformWeather = (data) => {
    return {
      coord: data.city.coord,
      city: data.city.name,
      temp: data.list[0].main.temp,
      humidity: data.list[0].main.humidity,
      wind: data.list[0].wind.speed,
      description: data.list[0].weather[0].description,
      icon: data.list[0].weather[0].icon,
      weatherDaily: data.weatherDaily,
    };
  };
}
