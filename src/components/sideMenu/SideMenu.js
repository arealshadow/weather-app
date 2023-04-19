import React, { useState, useEffect } from "react";
import "./SideMenu.css";
import axios from "axios";
import { API_KEY } from "../../apiKey";
import Button from "@mui/material/Button";

const SideMenu = ({ isOpen, onClose, onSelectCity, onUnitChange }) => {
  const [cityList, setCityList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("metric");
  const [savedCities, setSavedCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectCity = (city) => {
    onSelectCity(city.name);
    setSelectedCity(city);
    onClose();
    setSearchTerm("");
    setSavedCities((prevSavedCities) => {
      const cityAlreadySaved = prevSavedCities.find(
        (savedCity) => savedCity.name === city.name
      );
      if (cityAlreadySaved) {
        return prevSavedCities;
      }
      return [...prevSavedCities, city];
    });
  };

  const handleRemoveCity = (city) => {
    setSavedCities((prevSavedCities) => {
      const updatedSavedCities = prevSavedCities.filter(
        (savedCity) => savedCity.name !== city.name
      );
      return updatedSavedCities;
    });
    if (selectedCity.name === city.name) {
      console.log(selectedCity.name);
      onSelectCity("");
    }
  };

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
    onUnitChange(unit);
  };

  useEffect(() => {
    const fetchCities = async () => {
      console.log("here i am sidemenu");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?q=${searchTerm}&type=like&mode=json&units=${selectedUnit}&appid=${API_KEY}`
      );

      setCityList(response.data.list);
      console.log(response.data.list);
    };

    if (searchTerm) {
      fetchCities();
    } else {
      setCityList([]);
    }
  }, [searchTerm, selectedUnit]);

  return (
    <div className={`side-menu ${isOpen ? "open" : ""}`}>
      <nav>
        <div className="py-2">
          <Button variant="text" onClick={() => handleUnitChange("metric")}>
            Celsius
          </Button>
          <Button variant="text" onClick={() => handleUnitChange("imperial")}>
            Fahrenheit
          </Button>
        </div>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search for a city"
          />
        </div>

        <div>
          {cityList.map((city) => (
            <ol>
              <Button key={city.id} onClick={() => handleSelectCity(city)}>
                {city.name}, {city.sys.country}
              </Button>
            </ol>
          ))}
        </div>
        <div className="saved-cities side-menu-txt text-center">
          <h1>Saved Cities</h1>
          {savedCities.map((city) => (
            <ol className="side-menu-txt">
              <Button
                key={city.id}
                onClick={() => handleSelectCity(city)}
                className="side-menu-txt"
              >
                {city.name}, {city.sys.country}
              </Button>
              <Button onClick={() => handleRemoveCity(city)}>Remove</Button>
            </ol>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SideMenu;
