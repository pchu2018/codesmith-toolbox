import React from 'react';

const handleCohortBtnClick = (props) => {
  // collect cohort selection
  const cohort = document.querySelector('#cohort-select');
  const num = document.querySelector('#cohort-num');
  const selection = `${cohort.value} ${num.value}`;
  // if valid, save to state
  if (selection in props.calIDs) props.selectCohort({cohort: cohort.value, num: num.value});
  // otherwise reset number field
  else num.value = '';
}

function Cohort(props) {

  return (
    <div className='cohort-container'>
      <label htmlFor='cohorts'>Program Name: </label>
      <select name='cohorts' id='cohort-select'>
        <option value='PTRI'>PTRI</option>
        <option value='FTRI'>FTRI</option>
        <option value='NY'>NY</option>
        <option value='LA'>LA</option>
      </select>
      
      <form>
        <label htmlFor='cohort-num'>Cohort: </label>
        <input type="number" name='cohort-num' id='cohort-num'/>
      </form>
      <button 
        id='submit-cohort'
        onClick={e => {
          e.preventDefault();
          handleCohortBtnClick(props);
        }}>Save Cohort</button>
    </div>
  )
}

export default Cohort