// src/features/showHideAnEventsDetails.test.js (Acceptance Testing)

import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

  test('An event element is collapsed by default', ({ given, when, then }) => {

    let AppComponent;
    let AppDOM;
    given('the app is open', () => {
      AppComponent = render(<App />);
    });

    when('user has not clicked on show detals button', () => {
      //do nothing
    });

    then('details of the event are collapsed', () => {
      AppDOM = AppComponent.container.firstChild;
      //const EventListDOM = AppDOM.querySelector('#event-list');
      const eventDetails = AppDOM.querySelector("#event-details");
      expect(eventDetails).toBeNull();
    });

  });

  test('User can expand an event to see details', ({ given, when, then }) => {

    let AppComponent, AppDOM;
    let EventListDOM, EventDOM;

    given('the app is open', () => {
      AppComponent = render(<App />);
    });

    when('user clicks on show details button', async () => {
      AppDOM = AppComponent.container.firstChild;
      const user = userEvent.setup();

      //Wait for event list to load...
      await waitFor(() => {
        expect(AppDOM.querySelector(".event")).not.toBeNull();
        EventDOM = AppDOM.querySelector(".event");
      });

      const showDetailsButton = EventDOM.querySelector(".details-btn");
      //...Then click the button to show details
      await user.click(showDetailsButton);
    });

    then('event expands to show more details', () => {
      const eventDetails = EventDOM.querySelector("#event-details");
      expect(eventDetails).toBeDefined();
    });
  });

  test('User can collapse an event to hide details', ({ given, when, then }) => {

    let AppComponent, AppDOM;
    let EventDOM;
    let user;

    given('the app is open and an event is expanded to show details', async () => {
      AppComponent = render(<App />);
      user = userEvent.setup();
      AppDOM = AppComponent.container.firstChild;

      //Wait for event list to load...
      await waitFor(() => {
        expect(AppDOM.querySelector(".event")).not.toBeNull();
        EventDOM = AppDOM.querySelector(".event");
      });

      const showDetailsButton = EventDOM.querySelector(".details-btn");
      //...Then click button to show details
      await user.click(showDetailsButton);
    });

    when('user clicks on hide details button', async () => {
      const hideDetailsButton = EventDOM.querySelector(".details-btn");
      await user.click(hideDetailsButton);
    });

    then('event collapses and hides details', () => {
      const eventDetails = EventDOM.querySelector("#event-details");
      expect(eventDetails).toBeNull();
    });
  });

});