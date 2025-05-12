// src/App.jsx

import React, { useState, useEffect } from 'react';
import { getEvents, extractLocations } from './api';

import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';

import './App.css';

//----- Atatus import and config
import * as atatus from 'atatus-spa';
atatus.config('909884598afd47f1a9001c30d43dc226').install();

const App = () => {

  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  //Determine path for image file based on URL
  const meetLogoImgPath = window.location.href.startsWith('http://localhost') ? "./../public/meet-logo.svg" : "/meet-logo.svg";

  //Retrieves event data from Google Calendar API / mock-data for local testing
  const fetchEventData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    fetchEventData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <img src={meetLogoImgPath} className="meet-logo" alt="Meet logo - logo created using RecraftAI and is property of RecraftAI." />
      <div id="search-boxes">
        <h2>Welcome to Meet</h2>
        Find a City:<br />
        <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
        Number of Events:<br />
        <NumberOfEvents setCurrentNOE={setCurrentNOE} />
      </div>
      <EventList events={events} />
    </div>
  );
};

export default App;