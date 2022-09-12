import React from 'react';

const goToLocation = (location) => {
  if (/http/.test(location)) {
    fetch(location)
  }
}

function Event(props) {
  const startTime = new Date(props.start).toLocaleTimeString();
  const endTime = new Date(props.end).toLocaleTimeString();

  return (
    <div className='event-container'>
      <div className='event-top'>
        <span className='event-desc'>{props.description}</span>
        <span className='event-time'>{startTime} - {endTime}</span>
      </div>
      {/http/.test(props.location) ?
      <a className='event-location' href={props.location}>{props.location}</a> :
      <p className='event-location'>{props.location}</p>}
      
    </div>
  )
}

export default Event;