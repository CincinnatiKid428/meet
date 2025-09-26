// src/App.jsx

import React, { useState, useEffect } from 'react';
import { getEvents, extractLocations } from './api';

import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';

import { InfoAlert, WarningAlert, ErrorAlert } from './components/Alert';

import './App.css';

//----- Atatus import and config /*Atatus trial expires: 5/25/2025*/
//import * as atatus from 'atatus-spa';
//atatus.config('909884598afd47f1a9001c30d43dc226').install();

const App = () => {

  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  //Determine path for image file based on URL
  const meetLogoImgPath = window.location.href.startsWith('http://localhost') ? "./../public/meet-logo.svg" : "/meet-logo.svg";



  useEffect(() => {

    //Retrieves event data from Google Calendar API / mock-data for local testing
    const fetchEventData = async () => {
      const allEvents = await getEvents();
      const filteredEvents = currentCity === "See all cities" ?
        allEvents :
        allEvents.filter(event => event.location === currentCity)
      setEvents(filteredEvents.slice(0, currentNOE));
      setAllLocations(extractLocations(allEvents));
    };

    //If network is offline, show warning alert
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("No internet connection detected. Reconnect for the most current event listing.");
    }
    fetchEventData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <img src={meetLogoImgPath} className="meet-logo" alt="Meet logo - logo created using RecraftAI and is property of RecraftAI." />
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
      </div>
      <div id="search-boxes">
        <h2>Welcome to Meet</h2>
        Find a City:<br />
        <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
        Number of Events:<br />
        <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
      </div>
      <div className="charts-container">
        <EventGenresChart events={events} />
        <CityEventsChart allLocations={allLocations} events={events} />
      </div>

      <EventList events={events} />
    </div>
  );
};

export default App;