import React, { useState, useEffect } from 'react';
// import components
import Cohort from './components/Cohort.jsx';
import Week from './components/Week.jsx';
// import styling
import './stylesheets/calendar.scss';

function CalendarApp() {
  // app should store current day, list of calendars, chosen cohort
  const [fetched, setFetch] = useState(false);
  const [cohort, setCohort] = useState('');
  const [firstDay, setDay] = useState(new Date().toLocaleDateString());
  const [calIDs, setCals] = useState('');
  const [currCal, setCalendar] = useState({});

  // fetch initialState from server
  useEffect( () => {
    // if cohort is set, fetch calendar from api
    if (cohort && !fetched) {
      fetch(calIDs[cohort])
      .then(response => response.json())
      .then(data => {
        setCalendar(data.items)
      })
    }
  })
  // fetch cals and store in state
  useEffect( () => {
    // only fetch if cals aren't already stored in state
    if (!calIDs) {
      fetch('./src/node_server/calendar_ids.json')
      .then(response => response.json())
      .then(data => {
        // retrieves object with cohort keys and api values
        setCals(data);
        }
      )
      .catch(error => console.log(error))
    }
    // if calID is set, fetch calendar information
  })

    

  // record user selection of cohort and display correct calendar
  const selectCohort = (userSelection) => {
    // set state
      setCohort(userSelection);
    // post data to server
  }


  return (
    <div className='cal-app'>
      <div className='app-header' id='cal-header'>
        <h1>Week of {firstDay}{cohort && <span> for {cohort}</span>}</h1>
        <Cohort 
        calIDs = {calIDs}
        selectCohort = {selectCohort}/>
      </div>
     
      {cohort
        ? <Week 
          firstDay = {firstDay}
          currCal = {currCal}/>
        : <p>Please select a valid cohort.</p>
      }
    </div>
  )
}

export default CalendarApp;