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
        <div className="hamburger-menu pt-5">
          <button onClick={handleMenuClick}>☰</button>
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
