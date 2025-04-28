// src/__tests__/App.test.js

import React from 'react';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from './../App';

describe('<App /> Component', () => {
  let AppDOM;

  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });


  test('Renders <EventList /> component ', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('Render <CitySearch /> component', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('Render <NumberOfEvents /> component', () => {
    expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
  });

});

describe('<App /> Integration', () => {

  test('Renders list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;


    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    //Type input and click on Berlin, Germany
    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);


    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');


    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );

    //Check the number of events in list matches the number in all events with location Berlin
    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    //Check that "Berlin, Germany" is contained in each event in the list rendered    
    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });

  });

});