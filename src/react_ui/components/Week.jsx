import React from 'react';
import Day from './Day.jsx';

const weekParser = ({currCal, firstDay} = props) => {
  // each day should be stored as object with date and events keys
  const days = {};
  const firstWeekDay = firstDay.getDay();
  // iterate over events and check for ones within current week
  for (let i = 0; i < currCal.length; i++) {
    // warning: lots of date format hacking below
    const eventDay = new Date(currCal[i].start.dateTime).getDay();
    const eventDate = new Date(currCal[i].start.dateTime);
    const dateOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }
    // console.log('weekparser', eventDay, eventDate);
    if (eventDay <= firstWeekDay && 
      // have to pass in these options for datestring so cal doesn't break on month change
      (eventDate.toLocaleDateString('en-US', dateOptions) > firstDay.toLocaleDateString('en-US', dateOptions))) {
      break;
    } 
    // if curr event is an earlier weekday but LATER than first day 
    else {
      // create events array and push event to correct date
      if (!days[eventDay]) days[eventDay] = {date: eventDate, events: []};
      days[eventDay].events.push(currCal[i])
      // console.log(eventDate);
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