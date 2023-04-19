import React, { useState } from "react";

function SearchBar(props) {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      props.onSearch(searchText);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a country"
        value={searchText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

export default SearchBar;
