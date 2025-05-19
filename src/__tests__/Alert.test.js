// src/__tests__/Alert.test.js

import React from 'react';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from './../App';
import { InfoAlert, ErrorAlert } from './../components/Alert';

describe('<InfoAlert /> <ErrorAlert /> Component', () => {


  test('DEBUG DOM LOGGING: <InfoAlert /> renders message', () => {
    const { container, debug } = render(<InfoAlert text="Info Text" />);
    debug(); // Logs the rendered DOM to help debug

    const alertEl = container.querySelector('#info-alert');
    expect(alertEl).not.toBeNull(); // Helps confirm presence before accessing .textContent
    expect(alertEl.textContent).toBe('Info Text');
  });

  test('<InfoAlert /> renders message', () => {
    const infoAlertComponent = render(<InfoAlert text="Info Text" />);
    const infoAlertDOM = infoAlertComponent.container.firstChild;
    const infoAlertText = infoAlertDOM.textContent;
    expect(infoAlertText).toBe('Info Text');
  });

  test('<ErrorAlert /> renders message', () => {
    const errorAlertComponent = render(<ErrorAlert text="Error Text" />);
    const errorAlertDOM = errorAlertComponent.container.firstChild;
    const errorAlertText = errorAlertDOM.textContent;
    expect(errorAlertText).toBe('Error Text');
  });
});

describe('<InfoAlert /> <ErrorAlert /> Integration', () => {

  let AppDOM, AlertDOM;

  beforeEach(async () => {
    AppDOM = render(<App />).container.firstChild;
    //AlertDOM = await AppDOM.querySelector('#alerts-container');
  });

  test('InfoAlert/ErrorAlert components are not rendered by default', () => {
    const infoAlert = AppDOM.querySelector('#info-alert');
    const errorAlert = AppDOM.querySelector('#error-alert');
    expect(infoAlert).toBeNull();
    expect(errorAlert).toBeNull();
  });

  test('InfoAlert renders when city search input does not match any cities', async () => {
    const user = userEvent.setup();
    const citySearchInput = AppDOM.querySelector('#city-search');

    //User enters bad input for city name
    await user.type(citySearchInput, 'Qqq');

    const infoAlert = AppDOM.querySelector('#info-alert');
    expect(infoAlert).toBeDefined();

  });

  test('ErrorAlert renders when number <1 or NaN (empty string permitted) is entered in number of events input', async () => {
    let errorAlert;
    const user = userEvent.setup();
    const NumberOfEventsInput = AppDOM.querySelector('#number-of-events');

    //User enters bad input for number of events, type 'Q'
    await user.type(NumberOfEventsInput, '{backspace}{backspace}Q');
    console.log(`*** Alert.test.js|input should be 'Q' [${NumberOfEventsInput.value}]`);

    //Expect the error alert
    errorAlert = AppDOM.querySelector('#error-alert');
    expect(errorAlert).toBeDefined();

    //Backspace to erase 'Q' and alert should hide (empty string permitted)
    await user.type(NumberOfEventsInput, '{backspace}');
    console.log(`*** Alert.test.js|input should be empty string [${NumberOfEventsInput.value}]`);

    //Expect the error alert to be hidden since empty string is valid (but won't change NOE shown)
    errorAlert = AppDOM.querySelector('#error-alert');
    expect(errorAlert).toBeNull();

    //Type in a zero, alert should show again
    await user.type(NumberOfEventsInput, '0');
    console.log(`*** Alert.test.js|input should be '0' [${NumberOfEventsInput.value}]`);
    errorAlert = AppDOM.querySelector('#error-alert');
    expect(errorAlert).toBeDefined();

  });

});