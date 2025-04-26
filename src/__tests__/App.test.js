// src/__tests__/App.test.js
import { render } from '@testing-library/react';
import React from 'react';
import App from './../App';


describe('<App /> component', () => {
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