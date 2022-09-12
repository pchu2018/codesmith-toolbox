import React, { useState, useEffect } from 'react';
// import components
import Cohort from './components/Cohort.jsx';
import Week from './components/Week.jsx';
// import styling
import './stylesheets/calendar.scss';
import { FaChevronRight, FaChevronLeft} from 'react-icons/fa';

function CalendarApp() {
  // app should store current day, list of calendars, chosen cohort
  const [cohort, setCohort] = useState({cohort: '', num: ''});
  const [firstDay, setDay] = useState(new Date());
  const [calIDs, setCals] = useState('');
  const [currCal, setCalendar] = useState([]);

  // ** USEEFFECT HOOK CALLBACKS ** //
  // fetch initialState from server --> should only fire when app is loaded
  const fetchCohort = () => {
    if (!cohort.cohort) {
      fetch('/cohort')
      .then(response => response.json())
      .then(data => {
        setCohort(data);
        // console.log(data)
      })
    }
  }
  // if calID is set, fetch calendar information 
  const fetchcalIDs = () => {
      // only fetch if cals aren't already stored in state
    if (!calIDs) {
      fetch('/calendar')
      .then(response => response.json())
      .then(data => {
        // retrieves object with cohort keys and api values
        setCals(data);
        // console.log(data)
        }
      )
      .catch(error => console.log(error))
    }
  }
  // fetch calendar and loads data for chosen cohort
  const fetchCalendar = () => {
    // if cohort is set, fetch calendar from api
    if (cohort.cohort && calIDs && !currCal[0]) {
      let currDate = firstDay.toISOString().replace(':', '%3A');
      const calURI = 
        'https://www.googleapis.com/calendar/v3/calendars/' 
        + calIDs[cohort.cohort][cohort.num] 
        + '@group.calendar.google.com/events?orderBy=startTime&singleEvents=true&key=AIzaSyAyucc-d1nuZQnRsbMeZ1RtP04ZIdKr0qU&timeMin='
        + currDate;

      fetch(calURI)
      .then(response => response.json())
      .then(data => {
        setCalendar(data.items.slice(0, 100));
      })
    }
  }

    // useeffect hook for fetching
  useEffect( () => {
    fetchCohort();
    fetchcalIDs();
    fetchCalendar();
  } )

  
  // ** hook wrappers for event handlers ** //

  // record user selection of cohort to display correct calendar
  const selectCohort = (userSelection) => {
    // set state -> userSelection should be sent as object
    setCohort({...userSelection});
    // remove current calendar
    setCalendar([]);
    console.log('new cohort', userSelection, cohort)
    // post data to server
    fetch('/cohort', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(userSelection),
    })
    .then(response => response.json())
    .then(console.log('after fetch', cohort))
  }

  // change firstDay by +/- 7 days
  const changeWeek = (direction) => {
    const dateOffset = (24*60*60*1000) * 7 * direction;
    setDay(new Date (firstDay.getTime() - dateOffset))
    // reset calendar
    setCalendar([]);
  }

  // renders cohort selector and week container
  return (
    <div className='cal-app'>
      <div className='app-header' id='cal-header'>
        <header id='cal-title'>
          <h1>Week of {firstDay.toLocaleDateString() + ' '} 
          {cohort.cohort && <span>for {`${cohort.cohort} ${cohort.num}`}</span>}</h1>
          <span id='week-btns-container'>
            <button 
              className='week-btns'
              id='back-week' 
              onClick={() => {
                changeWeek(1)
              }}><FaChevronLeft/></button>
            <button 
              className='week-btns'
              id='forward-week'
              onClick={() => {
                changeWeek(-1)
              }}><FaChevronRight/></button>
          </span>
        </header>
        
        <Cohort 
        cohort = {cohort}
        calIDs = {calIDs}
        selectCohort = {selectCohort}/>
      </div>
     
      {cohort.cohort
        ? <Week 
          firstDay = {firstDay}
          currCal = {currCal}/>
        : <p id='select-warning'>Please select a valid cohort.</p>
      }
    </div>
  )
}

export default CalendarApp;