const LocalStrategy = require('passport-local');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('./db.config');

module.exports.passportConfig = () => {
  const myStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    console.log(email, password);
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return done(null, false, { type: 'email', message: 'The email address you entered isn\'t connected to an account.\n' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { type: 'password', message: 'The password you entered was not valid.\n' });
    }
    return done(null, user);
  });

  passport.use(myStrategy);

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    if (!user) {
      done('User not found');
    }
    done(null, user);
  });
};
