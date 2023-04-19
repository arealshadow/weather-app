import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../../apiKey";
import "./Weather.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

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
    return (
      <div className="text-center cyber-yellow pt-20 pb-4 text-5xl font-bold">
        Please <br /> search
        <br />
        for a<br /> location
        <br />
      </div>
    );
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
      <div className="main-weather-data pt-20 pb-20">
        <h1 className="text-2xl font-bold drop-shadow-lg capitalize">
          {weatherData.name}
        </h1>
        <h1 className="text-7xl	font-bold drop-shadow-lg">{temperature}</h1>
        <h1 className="text-2xl font-bold drop-shadow-lg capitalize">
          {weatherData.weather[0].description}
        </h1>
      </div>

      <div className="main-weather-cards">
        <Card sx={{ minWidth: 275 }} className="py-2 pr-2 pl-2 card-bg">
          <CardContent className="rounded-lg card-content-bg text-slate-50 shadow-xl">
            <div className="flex items-center justify-between pl-2 pr-2">
              <p>Feels like</p>
              <p className="order-last">
                <ArrowForwardIosRoundedIcon className="cyber-yellow" />{" "}
                {feelsLike}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275 }} className="py-2 pr-2 pl-2 card-bg">
          <CardContent className="rounded-lg card-content-bg text-slate-50 shadow-xl">
            <div className="flex items-center justify-between pl-2 pr-2">
              <p>Max Temperature</p>
              <p className="order-last">
                <ArrowForwardIosRoundedIcon className="cyber-yellow" />{" "}
                {maxTemperature}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275 }} className="py-2 pr-2 pl-2 card-bg">
          <CardContent className="rounded-lg card-content-bg text-slate-50 shadow-xl">
            <div className="flex items-center justify-between pl-2 pr-2">
              <p>Min Temperature</p>
              <p className="order-last">
                <ArrowForwardIosRoundedIcon className="cyber-yellow" />{" "}
                {minTemperature}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275 }} className="py-2 pr-2 pl-2 card-bg">
          <CardContent className="rounded-lg card-content-bg text-slate-50 shadow-xl">
            <div className="flex items-center justify-between pl-2 pr-2">
              <p>Pressure</p>
              <p className="order-last">
                <ArrowForwardIosRoundedIcon className="cyber-yellow" />{" "}
                {weatherData.main.pressure} hPa
              </p>
            </div>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275 }} className="py-2 pr-2 pl-2 card-bg">
          <CardContent className="rounded-lg card-content-bg text-slate-50 shadow-xl">
            <div className="flex items-center justify-between pl-2 pr-2">
              <p>Humidity</p>
              <p className="order-last">
                <ArrowForwardIosRoundedIcon className="cyber-yellow" />{" "}
                {weatherData.main.humidity}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275 }} className="py-2 pr-2 pl-2 card-bg">
          <CardContent className="rounded-lg card-content-bg text-slate-50 shadow-xl">
            <div className="flex items-center justify-between pl-2 pr-2">
              <p>Wind degrees</p>
              <p className="order-last">
                <ArrowForwardIosRoundedIcon className="cyber-yellow" />{" "}
                {weatherData.wind.deg}°
              </p>
            </div>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275 }} className="py-2 pr-2 pl-2 card-bg">
          <CardContent className="rounded-lg card-content-bg text-slate-50 shadow-xl">
            <div className="flex items-center justify-between pl-2 pr-2">
              <p>Wind speed</p>
              <p className="order-last">
                <ArrowForwardIosRoundedIcon className="cyber-yellow" />{" "}
                {weatherData.wind.speed}
                {unit === "metric" ? "m/s" : "mph"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275 }} className="py-2 pr-2 pl-2 card-bg">
          <CardContent className="rounded-lg card-content-bg text-slate-50 shadow-xl">
            <div className="flex items-center justify-between pl-2 pr-2">
              <p>Sunrise</p>
              <p className="order-last">
                <ArrowForwardIosRoundedIcon className="cyber-yellow" />{" "}
                {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 275 }} className="py-2 pr-2 pl-2 card-bg">
          <CardContent className="rounded-lg card-content-bg shadow-xl">
            <div className="flex items-center justify-between pl-2 pr-2">
              <p>Sunset</p>
              <p className="order-last">
                <ArrowForwardIosRoundedIcon className="cyber-yellow" />{" "}
                {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Weather;
