/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const path = require('path');
const passport = require('passport');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env.example' });

/**
 * Controllers (route handlers).
 */
// const apiController = require('./src/controllers/api');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MySQL.
 */

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// todo add session with sql store
// app.use(session({
//   resave: true,
//   saveUninitialized: true,
//   secret: process.env.SESSION_SECRET,
//   cookie: { maxAge: 1209600000 }, // Two weeks in milliseconds
//   store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
// }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  lusca.csrf()(req, res, next);
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/**
 * Routes
 */
app.get('/api', (req, res) => res.status(200).send('api'));

/**
 *  Have Node serve the files for our built React app
 */
app.use(express.static(path.resolve(__dirname, '../client/build')));

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

/**
 * All other GET requests not handled before will return our React app
 */
app.all('/api/*', (req, res) => {
  res.send('404 page').status(404);
});

/**
 * All other GET requests not handled before will return our React app
 */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(`App is running on http://localhost:${app.get('port')} in ${app.get('env')} mode`);
  console.log('Press CTRL-C to stop');
});

module.exports = app;
