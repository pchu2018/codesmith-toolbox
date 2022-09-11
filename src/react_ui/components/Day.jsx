import React from 'react';
import Event from './Event.jsx';

function Day(props) {
  const events = [];
  props.events.forEach(event => {
    events.push(
      <Event
      description = {event.summary}
      start = {event.start.dateTime}
      end = {event.end.dateTime}
      location = {event.location}
      key = {event.id}
      />
    )
  })

  return(
    <div className = 'day-container'>
      <h2>{props.date.toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: '2-digit'})}</h2>
      {events}
    </div>
  )
}

export default Day;