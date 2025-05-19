// src/components/NumberOfEvents.jsx

import React, { useState } from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {

  const [numOfEventsInput, setNumOfEventsInput] = useState(32); //Number of events is 32 by default

  /**
   * Manages updating state or showing error message depending on input validity
   */
  const handleInputChanged = (event) => {

    const value = parseInt(event.target.value, 10); // Convert string to number

    if (event.target.value === '') {

      setNumOfEventsInput(''); //Allow empty input field if user deletes current number/placeholder
      setErrorAlert(""); //Reset the error alert

    } else if (isNaN(value)) {
      setNumOfEventsInput(event.target.value);
      setErrorAlert("You must enter a numeric value");

    } else if (value < 1) {
      setNumOfEventsInput(event.target.value);
      setErrorAlert("The value must be greater than zero");

    } else {
      setNumOfEventsInput(value);
      setCurrentNOE(value);  //Send value back to <App /> via prop function and update state
      setErrorAlert(""); //Reset the error alert
    }
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