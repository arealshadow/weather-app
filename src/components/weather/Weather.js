import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../../apiKey";
import "./Weather.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className="weather-data app-bg-color">
      <div className="main-weather-data">
        <h1 className="text-2xl font-bold">{weatherData.name}</h1>
        <h1 className="text-2xl font-bold">Temperature: {temperature}</h1>
        <h2 className="text-2xl font-bold">Feels like: {feelsLike}</h2>
      </div>

      <Card sx={{ minWidth: 275 }} className="py-4">
        <CardContent className="rounded-full card-bg text-slate-50">
          <p>Pressure</p>
          <p>
            <FontAwesomeIcon
              icon="fa-solid fa-chevron-right"
              style={{ color: "#105ada" }}
            />
            {weatherData.main.pressure} hPa
          </p>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275 }} className="py-4">
        <CardContent className="rounded-full card-bg text-slate-50">
          <p>Max Temperature > {maxTemperature}</p>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275 }} className="py-4">
        <CardContent className="rounded-full card-bg text-slate-50">
          <p>Min Temperature: {minTemperature}</p>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275 }} className="py-4">
        <CardContent className="rounded-full card-bg text-slate-50">
          <p>Humidity: {weatherData.main.humidity}%</p>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275 }} className="py-4">
        <CardContent className="rounded-full card-bg text-slate-50">
          <p>Description: {weatherData.weather[0].description}</p>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275 }} className="py-4">
        <CardContent className="rounded-full card-bg text-slate-50">
          <p>Wind degrees: {weatherData.wind.deg}°</p>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275 }} className="py-4">
        <CardContent className="rounded-full card-bg text-slate-50">
          <p>
            Wind speed: {weatherData.wind.speed}{" "}
            {unit === "metric" ? "m/s" : "mph"}
          </p>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275 }} className="py-4">
        <CardContent className="rounded-full card-bg text-slate-50">
          <p>
            Sunrise:{" "}
            {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
          </p>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275 }} className="py-4">
        <CardContent className="rounded-full card-bg text-slate-50">
          <p>
            Sunset:{" "}
            {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Weather;
