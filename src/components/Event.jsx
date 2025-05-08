// src/components/Event.jsx
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const Event = ({ event }) => {

  const [collapsed, setCollapsed] = useState(true); //Tracks if event details are collapsed 

  const handleShowDetails = () => setCollapsed(false);
  const handleHideDetails = () => setCollapsed(true);

  return (
    <li>
      <div className="event">
        <p className="event-summary">{event.summary}</p>
        <p>{event.created}</p>
        <p className="event-location">{event.location}</p>
        {collapsed ? (
          <button type="button" className="details-btn" onClick={handleShowDetails}>Show Details</button>
        ) : (
          <div id="event-details">
            <a href={event.htmlLink} target="_blank">See details on Google Calendar</a>
            <p id="event-description">{event.description}</p>
            <button type="button" className="details-btn" onClick={handleHideDetails}>Hide Details</button>
          </div>
        )}

      </div>
    </li>
  );
};

export default Event;