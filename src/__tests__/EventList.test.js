// src/__tests__/EventList.test.js

import React from 'react';
import { render } from '@testing-library/react';
import { getEvents } from '../api';
import EventList from '../components/EventList';


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