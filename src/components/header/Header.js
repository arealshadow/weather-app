import React, { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SideMenu from "../sideMenu/SideMenu";

function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCitySelect = (city) => {
    props.onSelectCity(city);
  };

  return (
    <header className="Header">
      <div className="menu-container">
        <FontAwesomeIcon
          icon={faBars}
          className="menu-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>
      <h1 className="app-title">Weather App</h1>
      <div className="placeholder" />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a city"
          className="search-input"
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleCitySelect(event.target.value);
              event.target.value = "";
            }
          }}
        />
      </div>
      <div className="clearfix" />
      <div className="divider" />
      <SideMenu
        isOpen={isMenuOpen}
        onSelectCity={handleCitySelect}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
}

export default Header;
