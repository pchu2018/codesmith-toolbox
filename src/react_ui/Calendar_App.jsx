import React, { useState } from 'react';
import Cohort from './components/Cohort';

function CalendarApp() {
  // app should store weeks, current month, chosen cohort
  const [cohort, setCohort] = useState('');
  const [weeks, setWeeks] = useState({});
  const [currMonth, setMonth] = useState('');

  // record user selection of cohort and display correct calendar
  const selectCohort = (userSelection) => {
    // check if user selection exists in cal ids
    // userSelection should be in format 'cohort #'
    fetch('/cal_ids')
      .then(data => {
        if (userSelection in data) {
          setCohort(userSelection);
        }
      })
    // if if does, setCohort
  }

  // fetch calendar data and store in weeks

  return (
    <div className='cal-app'>
      <h1 id='cal-header'>Weekly Calendar</h1>
      <Cohort />
      {cohort
        ? <p>Calendar placeholder</p>
        : <p>Please select a valid cohort.</p>
      }
      
    </div>
  )
}

export default CalendarApp;