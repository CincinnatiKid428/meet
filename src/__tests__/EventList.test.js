// src/__tests__/EventList.test.js

import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, within, waitFor } from '@testing-library/react';
import { getEvents } from '../api';
import EventList from '../components/EventList';
import App from "../App";

describe('<EventList /> component', () => {
  let EventListComponent;

  beforeEach(() => {
    EventListComponent = render(<EventList />);
  });


  test('Contains and element with "list" role', () => {
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test('Renders correct number of events', async () => {
    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList events={allEvents} />);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });
});

describe('<EventList /> integration', () => {

  test('renders a non-empty list of events when the app is mounted and rendered', async () => {
    let AppComponent;

    await act(async () => {
      AppComponent = render(<App />);
      // Wait for the fetchEventData state update to complete
      await Promise.resolve(); // microtask queue flush (sometimes needed)
    });

    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector('#event-list');

    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBeGreaterThan(0);
    });
  });

});