/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
require('dotenv').config({ path: '.env.example' });

/**
 * Configure database.
 */
const db = require('./config/db.config');

/**
 * Create store.
 */
const myStore = new SequelizeStore({
  db: db.sequelize,
});

/**
 * Import Routers (route handlers).
 */
const userRouter = require('./routers/User');
const shipmentRouter = require('./routers/Shipment');

/**
 * Config passport.
 */
const { passportConfig } = require('./config/passport');

passportConfig();

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 8080);
app.use(compression());
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// add mysql session
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: myStore,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // one day
  },
  resave: false,
  proxy: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/**
 * Connect to MySQL.
 */
myStore
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log(`Failed to sync db: ${err.message}`);
  });

/**
 * Routes
 */
app.use('/api/account', userRouter);
app.use('/api/shipments', shipmentRouter);

/**
 *  Have Node serve the files for our built React app
 */
app.use(express.static(path.resolve(__dirname, '../client/build')));

/**
 * All other GET requests not handled before will return our React app
 */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

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
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(`App is running on http://localhost:${app.get('port')} in ${app.get('env')} mode`);
  console.log('Press CTRL-C to stop');
});

module.exports = app;
