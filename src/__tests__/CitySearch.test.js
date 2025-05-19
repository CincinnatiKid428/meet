// src/__tests__/CitySearch.test.js

import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import { getEvents, extractLocations } from './../api'
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import App from '../App';


describe('<CitySearch /> Component', () => {
  let CitySearchDOM;

  beforeEach(() => {
    CitySearchDOM = render(<CitySearch allLocations={[]} setInfoAlert={() => { }} />);
  });


  test('Renders input textbox', () => {
    const cityTextBox = CitySearchDOM.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('Suggestions list is hidden by default', () => {
    const suggestionList = CitySearchDOM.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });


  test('Renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchDOM.queryByRole('textbox');
    await user.click(cityTextBox);
    const suggestionList = CitySearchDOM.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('Updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchDOM.rerender(<CitySearch allLocations={allLocations} setInfoAlert={() => { }} />);

    // user types "Berlin" in city textbox
    const cityTextBox = CitySearchDOM.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    // filter allLocations to locations matching "Berlin"
    const suggestions = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().includes(cityTextBox.value.toUpperCase());
    }) : [];

    // get all <li> elements inside the suggestion list
    const suggestionListItems = CitySearchDOM.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test('Renders "See all cities" without suggestions if user types a city not in set of all locations', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchDOM.rerender(<CitySearch allLocations={allLocations} setInfoAlert={() => { }} />);

    //User types "Cincinnati" in city textbox
    const cityTextBox = CitySearchDOM.queryByRole('textbox');
    await user.type(cityTextBox, "Cincinnati");

    //Filter allLocations to locations matching "Cincinnati" (should be 0 suggestions in returned array)
    const suggestions = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().includes(cityTextBox.value.toUpperCase());
    }) : [];

    //Get all <li> elements in the list (should be 1, default "See all cities")
    const suggestedListItems = CitySearchDOM.queryAllByRole('listitem');
    expect(suggestedListItems.length).toBe(1);
    expect(suggestions.length).toBe(0);
    expect(suggestedListItems[0].textContent).toBe("See all cities");
  });

  test('Renders the suggestion text in the city textbox upon clicking the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchDOM.rerender(<CitySearch allLocations={allLocations} setCurrentCity={() => { }} setInfoAlert={() => { }} />);

    const cityTextBox = CitySearchDOM.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    // the suggestion's textContent look like this: "Berlin, Germany"
    const BerlinGermanySuggestion = CitySearchDOM.queryAllByRole('listitem')[0];
    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe('<CitySearch /> Integration', () => {

  test('Renders suggestions list when the app is rendered and city textbox clicked', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
  });

});