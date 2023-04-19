import "./App.css";
import React, { useState } from "react";
import Weather from "./components/weather/Weather";
import SideMenu from "./components/sideMenu/SideMenu";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("metric");

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setShowMenu(false);
  };

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
  };

  return (
    <div className="App">
      <header>
        <div className="hamburger-menu">
          <button onClick={handleMenuClick}>☰</button>
        </div>
        <div className="app-title">
          <h1 className="text-3xl font-bold rounded-full">My Weather App</h1>
        </div>
      </header>
      <SideMenu
        isOpen={showMenu}
        onClose={handleCloseMenu}
        onSelectCity={handleSelectCity}
        onUnitChange={handleUnitChange}
      />
      <Weather city={selectedCity} unit={selectedUnit} />
    </div>
  );
}

export default App;
