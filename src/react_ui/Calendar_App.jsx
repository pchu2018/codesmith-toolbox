import React, { useState, useEffect } from 'react';
// import components
import Cohort from './components/Cohort.jsx';
import Week from './components/Week.jsx';
// import styling
import './stylesheets/calendar.scss';

function CalendarApp() {
  // app should store current day, list of calendars, chosen cohort
  const [fetched, setFetch] = useState(false);
  const [cohort, setCohort] = useState({cohort: '', num: ''});
  const [firstDay, setDay] = useState(new Date().toLocaleDateString());
  const [calIDs, setCals] = useState('');
  const [currCal, setCalendar] = useState({});

  // fetch initialState from server --> should only fire when app is loaded
  useEffect( () => {
    if (!fetched) {
      fetch('/cohort')
      .then(response => response.json())
      .then(data => {
        
      })
      setFetch(true);
    }
  })
  
  // fetch cals and store in state -> should only fire when app is loaded
  useEffect( () => {
    // only fetch if cals aren't already stored in state
    if (!calIDs) {
      fetch('/calendar')
      .then(response => response.json())
      .then(data => {
        // retrieves object with cohort keys and api values
        console.log(data);
        setCals(data);
        }
      )
      .catch(error => console.log(error))
    }
    // if calID is set, fetch calendar information
  })

  // fetch calendar and loads data for chosen cohort
  useEffect( () => {
    // if cohort is set, fetch calendar from api
    if (cohort.cohort && !currCal) {
      fetch(calIDs[`${cohort.cohort} ${cohort.num}`])
      .then(response => response.json())
      .then(data => {
        setCalendar(data.items);
      })
    }
  })


  // ** hook wrappers to be passed to child components ** //

  // record user selection of cohort to display correct calendar
  const selectCohort = (userSelection) => {
    // set state -> userSelection should be sent as object
    setCohort(userSelection);
    // post data to server
    fetch('/cohort', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(userSelection),
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }

  // renders cohort selector and week container
  return (
    <div className='cal-app'>
      <div className='app-header' id='cal-header'>
        <h1>Week of {firstDay}{cohort.cohort && <span> for {`${cohort.cohort} ${cohort.num}`}</span>}</h1>
        <Cohort 
        calIDs = {calIDs}
        selectCohort = {selectCohort}/>
      </div>
     
      {cohort.cohort
        ? <Week 
          firstDay = {firstDay}
          currCal = {currCal}/>
        : <p>Please select a valid cohort.</p>
      }
    </div>
  )
}

export default CalendarApp;