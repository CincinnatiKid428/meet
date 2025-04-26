//src/__tests__/Event.test.js

import React from 'react';
import { getEvents } from "../api";
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Event from '../components/Event';

describe('<Event /> Component', () => {

  //----------Ensure structure of component is present----------

  test('Renders event title (.summary)', async () => {
    const allEvents = await getEvents();
    const EventComponent = render(<Event event={allEvents[0]} />);
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
  });

  test('Renders event date/time (.created)', async () => {
    const allEvents = await getEvents();
    const EventComponent = render(<Event event={allEvents[0]} />);
    expect(EventComponent.queryByText(allEvents[0].created, { exact: false })).toBeInTheDocument();
  });

  test('Renders event location (.location)', async () => {
    const allEvents = await getEvents();
    const EventComponent = render(<Event event={allEvents[0]} />);
    expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
  });

  test('Renders "Show Details" button)', async () => {
    const allEvents = await getEvents();
    const EventComponent = render(<Event event={allEvents[0]} />);
    expect(EventComponent.queryByText("Show Details")).toBeInTheDocument();
  });

  //----------Component functionality----------

  test('Component is collapsed by default', async () => {
    const allEvents = await getEvents();
    const EventComponent = render(<Event event={allEvents[0]} />);

    //Calendar link, description and Hide Details button should not render by default
    expect(EventComponent.queryByText(allEvents[0].htmlLink)).not.toBeInTheDocument();
    expect(EventComponent.queryByText(allEvents[0].description)).not.toBeInTheDocument();
    expect(EventComponent.queryByText("Hide Details")).not.toBeInTheDocument();
  });

  test('Collapsed component expands to show (htmlLink, descripton, "Hide Details" button) & hide ("Show Details" button) when "Show Details" button is clicked', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const EventComponent = render(<Event event={allEvents[0]} />);

    const showDetailsButton = EventComponent.queryByText("Show Details");
    await user.click(showDetailsButton);

    //Calendar link, description and "Hide Details" button should render | "Show Details" button should be hidden
    expect(EventComponent.queryByText("Show Details")).not.toBeInTheDocument();
    expect(EventComponent.queryByText("See details on Google Calendar")).toBeInTheDocument();
    expect(EventComponent.container.firstChild.querySelector("#event-description")).toBeInTheDocument();
    expect(EventComponent.queryByText("Hide Details")).toBeInTheDocument();
  });

  test('Expanded component collapses to hide (htmlLink, descripton, "Hide Details" button) & show ("Show Details" button) when "Hide Details" button is clicked', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const EventComponent = render(<Event event={allEvents[0]} />);

    //Prep the component to be in expanded state
    const showDetailsButton = EventComponent.queryByText("Show Details");
    await user.click(showDetailsButton);

    //Now click "Hide Details" button to collapse component
    const hideDetailsButton = EventComponent.queryByText("Hide Details");
    await user.click(hideDetailsButton);

    //"Show Details" button should render | calendar link, description and "Hide Details" button should be hidden
    expect(EventComponent.queryByText("Show Details")).toBeInTheDocument();
    expect(EventComponent.queryByText("See details on Google Calendar")).not.toBeInTheDocument();
    expect(EventComponent.container.firstChild.querySelector("#event-description")).not.toBeInTheDocument();
    expect(EventComponent.queryByText("Hide Details")).not.toBeInTheDocument();
  });

});