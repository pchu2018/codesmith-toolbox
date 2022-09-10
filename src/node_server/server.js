const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config');
const compiler = webpack(webpackConfig);

const calendarController = require('./controllers/calendarController');


const app = express();
const PORT = 8080;
 
app.use('/', express.static(path.resolve(__dirname, '../../dist')));
app.use(express.json());
// webpack middleware for hot reloading
app.use(require("webpack-dev-middleware")(compiler, {
    publicPath: webpackConfig.output.publicPath,
    writeToDisk: true,
}));
app.use(require("webpack-hot-middleware")(compiler));

// ROUTES FOR CALENDAR
app.get('/calendar', 
  calendarController.getCalendars,
  (req, res) => {
    res.status(200).json(res.locals.cals);
});

// ROUTES FOR COHORT
app.get('/cohort',
  calendarController.getCohort,
  (req, res) => {
    res.status(200).json(res.locals.cohort);
  })
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
