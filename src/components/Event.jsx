// src/components/Event.jsx
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const Event = ({ event }) => {

  const [collapsed, setCollapsed] = useState(true); //Tracks if event details are collapsed 

  const handleShowDetails = () => setCollapsed(false);
  const handleHideDetails = () => setCollapsed(true);

  return (
    <li>
      <div>
        <p>{event.summary}</p>
        <p>{event.created}</p>
        <p>{event.location}</p>
        {collapsed ? (
          <Button variant="primary" className="btn-md" onClick={handleShowDetails}>Show Details</Button>
        ) : (
          <>
            <a href={event.htmlLink} target="_blank">See details on Google Calendar</a>
            <div id="event-description">{event.description}</div>
            <Button variant="primary" className="btn-md" onClick={handleHideDetails}>Hide Details</Button>
          </>
        )}

      </div>
    </li>
  );
};

export default Event;