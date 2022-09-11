import React from 'react';
import Day from './Day.jsx';

const weekParser = ({currCal, firstDay} = props) => {
  // each day should be stored as object with date and events keys
  const days = {};
  const firstWeekDay = firstDay.getDay();
  // iterate over events and check for ones matching current day
  for (let i = 0; i < currCal.length; i++) {
    const eventDay = new Date(currCal[i].start.dateTime).getDay();
    const eventDate = new Date(currCal[i].start.dateTime);
    // console.log('weekparser', eventDay, eventDate);
    if (eventDay <= firstWeekDay && eventDate.getDate() > firstDay.getDate()) {
      break;
    } 
    // if curr event is an earlier weekday but LATER than first day 
    else {
      // create events array and push event to correct date
      if (!days[eventDay]) days[eventDay] = {date: eventDate, events: []};
      days[eventDay].events.push(currCal[i])
      console.log(eventDate);
    };
  }
  return days;
}

function Week(props) {
  // iterate over days objects and render day components
  const dayInfo = weekParser(props);  
  const days = [];
  for (const day in dayInfo) {
    days.push(
    <Day 
      date = {dayInfo[day].date}
      events = {dayInfo[day].events}
      key = {day}
      />);
  }

  return (
    <div className='week-container'>
      {days}
    </div>
  )
}

export default Week;