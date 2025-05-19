// src/__tests__/NumberOfEvents.test.js

import React from 'react';
import { render, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

import App from '../App';
import EventList from '../components/EventList';
import NumberOfEvents from '../components/NumberOfEvents';


describe('<NumberOfEvents /> Component', () => {
  let NumOfEventsComponent;
  let NOEDom;

  beforeEach(() => {
    NumOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => { }} setErrorAlert={() => { }} />);
    NOEDom = NumOfEventsComponent.container.firstChild;
  });

  test('Contains and element with role "textbox"', () => {
    expect(NumOfEventsComponent.queryByRole("textbox")).toBeInTheDocument();
  });

  test('Default value for number of events textbox is 32', () => {
    //Input field values will be string data initially, so '32' vs 32
    expect(NumOfEventsComponent.queryByRole("textbox").value).toBe('32');
  });

  test('User types non-numeric value into textbox, ErrorAlert should show', async () => {
    const user = userEvent.setup();
    const numOfEventsTextbox = NumOfEventsComponent.queryByRole('textbox');

    await user.clear(numOfEventsTextbox);
    await user.type(numOfEventsTextbox, 'a');

    //Check for ErrorAlert component to be rendered
    await waitFor(() => {
      let errorAlertComponent = NOEDom.querySelector("#error-alert");
      expect(errorAlertComponent).toBeDefined();
    });
  });

  test('User deletes placeholder and types 10 into the textbox', async () => {
    const user = userEvent.setup();
    const numOfEventsTextbox = NumOfEventsComponent.queryByRole('textbox');


    // Clear the input before typing
    await user.clear(numOfEventsTextbox);

    // Now type '10' cleanly
    await user.type(numOfEventsTextbox, '10');

    // Assertion - make sure the input value is now '10'
    await waitFor(() => expect(numOfEventsTextbox.value).toBe('10'));

    /*
      console.log(`***The number of events is ${numOfEventsTextbox.value} before user.type()`);
      await user.type(numOfEventsTextbox, '{backspace}');
      await user.type(numOfEventsTextbox, '{backspace}');
      await user.type(numOfEventsTextbox, '10');
      console.log(`***The number of events is ${numOfEventsTextbox.value}`);
  
      await waitFor(() => expect(numOfEventsTextbox.value).toBe('10'));*/
  });
});

describe('<NumberOfEvents /> Integration', () => {

  test('User inputs number of cities and event list shows that number of events (or up to that number if there are less available than input value', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();

    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    //First user will enter 10 events
    const NumberOfEventsInput = AppDOM.querySelector('#number-of-events');
    await user.type(NumberOfEventsInput, '{backspace}{backspace}10');

    const EventListDOM = AppDOM.querySelector('#event-list');
    const eventListItems = within(EventListDOM).queryAllByRole('listitem');

    // (10 events <= 32 total events)
    expect(eventListItems.length).toBeLessThanOrEqual(allEvents.length);

    //User then changes show 10 events to show 99 events
    await user.type(NumberOfEventsInput, '{backspace}{backspace}99');

    //will i need to re-query to get refreshed eventListItems?

    // (99 events > 32 total events, show max of 32)
    waitFor(() => {
      expect(eventListItems.length).toBe(allEvents.length);
    });

  });

});