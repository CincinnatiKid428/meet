// src/components/CitySearch.jsx

import React, { useState, useEffect } from 'react';

const CitySearch = ({ allLocations, setCurrentCity }) => {

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  //Handles updating state variables when user types in city search textbox
  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().includes(value.toUpperCase());
    }) : [];

    setQuery(value);
    setSuggestions(filteredLocations);
  };

  //Handles user click on a suggestion from list
  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false); //Hide the list after click
    setCurrentCity(value);
  };

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]); //using strigified value of allLocations to detect changes

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onChange={handleInputChanged}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions ?
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return <li key={suggestion} className="suggestion-item" onClick={handleItemClicked}>{suggestion}</li>
          })}
          <li key='see-all-cities' className="suggestion-item" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul> : null}
    </div>
  );
};

export default CitySearch;