// src/__tests__/NumberOfEvents.test.js

import React from 'react';
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import NumberOfEvents from '../components/NumberOfEvents';


describe('<NumberOfEvents /> Component', () => {
  let NumOfEventsComponent;

  beforeEach(() => {
    NumOfEventsComponent = render(<NumberOfEvents />);
  });

  test('Contains and element with role "textbox"', () => {
    expect(NumOfEventsComponent.queryByRole("textbox")).toBeInTheDocument();
  });

  test('Default value for number of events textbox is 32', () => {
    //Input field values will be string data initially, so '32' vs 32
    expect(NumOfEventsComponent.queryByRole("textbox").value).toBe('32');
  });

  test('User types non-numeric value into textbox, 0 events should show', async () => {
    const user = userEvent.setup();
    const numOfEventsTextbox = NumOfEventsComponent.queryByRole('textbox');

    await user.clear(numOfEventsTextbox);
    await user.type(numOfEventsTextbox, 'a');

    //Wait for state update to reflect the new input value 
    await waitFor(() => expect(numOfEventsTextbox.value).toBe('0'));
  });

  test('User deletes placeholder and types 10 into the textbox', async () => {
    const user = userEvent.setup();
    const numOfEventsTextbox = NumOfEventsComponent.queryByRole('textbox');

    await user.type(numOfEventsTextbox, '{backspace}{backspace}10');

    await waitFor(() => expect(numOfEventsTextbox.value).toBe('10'));
  });
});