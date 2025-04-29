// src/components/NumberOfEvents.jsx

import React, { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE }) => {

  const [numOfEventsInput, setNumOfEventsInput] = useState(32); //Number of events is 32 by default

  const handleInputChanged = (event) => {
    const value = parseInt(event.target.value, 10); // Convert string to number
    const safeValue = isNaN(value) ? 0 : value; // Handle empty or invalid input with 0
    setNumOfEventsInput(safeValue); //
    setCurrentNOE(safeValue);  //Send value back to <App /> via prop function and update state
  };

  return (
    <input
      id="number-of-events"
      type="text"
      value={numOfEventsInput}
      onChange={handleInputChanged}
      placeholder='Enter number of events'
    >
    </input>
  );
};

export default NumberOfEvents;