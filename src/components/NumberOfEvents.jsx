// src/components/NumberOfEvents.jsx

import React, { useState } from 'react';

const NumberOfEvents = () => {

  const [numOfEvents, setNumOfEvents] = useState(32); //Number of events is 32 by default

  const handleInputChanged = (event) => {
    const value = parseInt(event.target.value, 10); // Convert string to number
    setNumOfEvents(isNaN(value) ? 0 : value); // Handle empty or invalid input with 0
  };

  return (
    <input
      id="number-of-events"
      type="text"
      value={numOfEvents}
      onChange={handleInputChanged}
      placeholder='Enter number of events'
    >
    </input>
  );
};

export default NumberOfEvents;