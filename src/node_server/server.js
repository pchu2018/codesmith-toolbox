const path = require('path');
const express = require('express');

const calendarController = require('./controllers/calendarController');


const app = express();
const PORT = 8080;

app.use('/', express.static(path.resolve(__dirname, '../../dist')));
app.use(express.json());

// ROUTES FOR CALENDAR
app.get('/calendar', 
  calendarController.getCalendars,
  (req, res) => {
    res.status(200).json(res.locals.cals);
});

app.post('/cohort', 
  calendarController.saveCohort,
  (req, res) => {
    res.status(200).json(res.locals.cohort);
});



// unknown route handler and global error handler
app.use((req, res, next) => {
  res.status(404).send('Page not found...')
})

app.use((err, req, res, next) => {
  console.log(err.log || 'Something went wrong');
  res.status(400).json(err.message || {err: 'ERROR: An error occurred'})
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
