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
        <p>{event.location}</p>
        {collapsed ? (
          <button type="button" className="details-btn" onClick={handleShowDetails}>Show Details</button>
        ) : (
          <>
            <a href={event.htmlLink} target="_blank">See details on Google Calendar</a>
            <div id="event-description">{event.description}</div>
            <button type="button" className="details-btn" onClick={handleHideDetails}>Hide Details</button>
          </>
        )}

      </div>
    </li>
  );
};

export default Event;