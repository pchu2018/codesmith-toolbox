const fs = require('fs');
const path = require('path');

const calendarController = {
  getCalendars: (req, res, next) => {
    try {
      // fetch calendar ids from json
      // remember to parse buffers returned by fs methods
      const calIDs = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/calendar_ids.json')));

      if (!calIDs) throw {
        code: 400, 
        log: 'getCalendars: no data found', 
        message: {err: 'ERROR: could not retrieve calendar IDs'}};
      res.locals.cals = calIDs;
      return next();
    } catch(err) {
      next(err)
    }
    
  },
  
  getCohort: (req, res, next) => {
    const cohort = fs.readFileSync(path.resolve(__dirname, '../data/cohort.json'));
    res.locals.cohort = JSON.parse(cohort);
    return next();
  },

  saveCohort: (req, res, next) => {
    // pull cohort from req body and write to file
    fs.writeFileSync(path.resolve(__dirname, '../data/cohort.json'), JSON.stringify(req.body));
    res.locals.cohort = req.body;
    return next();
  },

}

module.exports = calendarController;