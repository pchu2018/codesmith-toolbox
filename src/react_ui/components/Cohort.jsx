import React from 'react';

function Cohort() {

  return (
    <div className='cohort-container'>
      <label htmlFor='cohorts'>Program Name: </label>
      <select name='cohorts' id='cohort-select'>
        <option value='PTRI'>PTRI</option>
        <option value='FTRI'>PTRI</option>
        <option value='NY'>PTRI</option>
        <option value='LA'>PTRI</option>
      </select>
      <label htmlFor='cohort-num'>Cohort: </label>
      <form>
        <input type="number" />
      </form>
    </div>
  )
}

export default Cohort