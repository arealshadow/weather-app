import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../../apiKey";
import "./Weather.css";

const Weather = ({ city, unit }) => {
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherData = async () => {
    console.log("here i am weather component");

    const response = await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      )
      .catch(function (error) {
        if (error.response) {
          console.log("found error in api weather component");
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setWeatherData(null);
        }
      });
    setWeatherData(response.data);
  };

  useEffect(() => {
    getWeatherData();
  }, [city, unit]);

  if (!weatherData) {
    return <div className="weather-data">Loading...</div>;
  }
  const temperature = `${Math.round(weatherData.main.temp)}°${
    unit === "metric" ? "C" : "F"
  }`;
  const feelsLike = `${Math.round(weatherData.main.feels_like)}°${
    unit === "metric" ? "C" : "F"
  }`;
  const maxTemperature = `${Math.round(weatherData.main.temp_max)}°${
    unit === "metric" ? "C" : "F"
  }`;
  const minTemperature = `${Math.round(weatherData.main.temp_min)}°${
    unit === "metric" ? "C" : "F"
  }`;

  return (
    <div className="weather-data">
      <h2>Weather in {weatherData.name}</h2>
      <p>Temperature: {temperature}</p>
      <p>Feels like: {feelsLike}</p>
      <p>Pressure: {weatherData.main.pressure} hPa</p>
      <p>Max Temperature: {maxTemperature}</p>
      <p>Min Temperature: {minTemperature}</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Description: {weatherData.weather[0].description}</p>

      <p>Wind degrees: {weatherData.wind.deg}°</p>
      <p>
        Wind speed: {weatherData.wind.speed} {unit === "metric" ? "m/s" : "mph"}
      </p>

      <p>
        Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
      </p>
      <p>
        Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
      </p>
    </div>
  );
};

export default Weather;
