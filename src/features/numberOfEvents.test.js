// src/features/numberOfEvents.test.js (Acceptance Testing)

import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/numberOfEvents.feature');

defineFeature(feature, test => {

  let AppComponent, AppDOM, EventListDOM;

  beforeEach(async () => {
    AppComponent = render(<App />);
    AppDOM = AppComponent.container.firstChild;
    EventListDOM = AppDOM.querySelector('#event-list');
    await waitFor(() => {
      //Let event list load
      expect(EventListDOM.querySelector('.event')).toBeDefined();
    });
  });

  test('When user has not specified a number, 32 events are shown by default', ({ given, when, then }) => {

    given('app is open and events have loaded', async () => {
      //handled in beforeEach()
    });

    when('user does not enter number of events', () => {
      //nothing to do here
    });

    then(/^a maximum of (\d+) events will be shown$/, (arg0) => {
      const eventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(eventListItems.length).toBeLessThanOrEqual(32);
    });
  });

  test('User can change the number of events displayed', ({ given, when, then }) => {

    let NumOfEventsInput;

    given('app is open and events have loaded', () => {
      //handled in beforeEach()
    });

    when('user enters number of events in textbox', async () => {
      const user = userEvent.setup();
      NumOfEventsInput = AppDOM.querySelector('#number-of-events');
      await user.type(NumOfEventsInput, '{backspace}{backspace}5');
    });

    then('a maximum of the entered-number of events will be shown', async () => {
      const eventListItems = within(EventListDOM).queryAllByRole('listitem');
      await waitFor(() => {
        expect(eventListItems.length).toBeLessThanOrEqual(5);
      });
    });

  });

});