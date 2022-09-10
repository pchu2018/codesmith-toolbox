import React from 'react';

function Event(props) {
  const startTime = new Date(props.start).toLocaleTimeString();
  const endTime = new Date(props.end).toLocaleTimeString();

  return (
    <div className='event-container'>
      <span className='event-desc'>{props.description}</span>
      <span className='event-time'>{startTime} - {endTime}</span>
      <p className='event-location'>{props.location}</p>
    </div>
  )
}

export default Event;