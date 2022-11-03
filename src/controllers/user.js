const bcrypt = require('bcrypt');
const _ = require('lodash');
const passport = require('passport');
const { User } = require('../config/db.config');

exports.signup = async (req, res) => {
  const {
    firstName, lastName, email, password
  } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Missing data' });
  }

  if (password.length < 8) {
    return res.status(400).json({
      type: 'password',
      message: 'Password should be at least 8 characters long',
    });
  }

  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = User.build({
    firstName,
    lastName,
    email,
    password,
  });

  try {
    newUser.password = await bcrypt.hash(password, 7);

    const savedUserRes = await newUser.save();

    if (!savedUserRes) {
      return res
        .status(400)
        .json({ message: 'error while saving to database' });
    }

    const resUser = _.pick(newUser, ['id', 'firstName', 'lastName', 'email']);

    // login passport
    req.login(resUser, (err) => {
      console.log(err);
    });
    return res.status(201).send(resUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.login = (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(400).send(err);
    }
    if (!user) {
      return res.status(401).send(info);
    }

    const resUser = _.pick(user, ['id', 'firstName', 'lastName', 'email']);

    req.login(resUser, (err) => {
      console.log(err);
    });

    res.send(resUser);
  })(req, res);
};

exports.logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) throw error;

    res.clearCookie('session-id'); // cleaning the cookies from the user session
    res.status(200).send('Logout Success');
  });
};

exports.getme = (req, res) => {
  if (req.user) {
    const resUser = _.pick(req.user, ['id', 'firstName', 'lastName', 'email']);
    res.json(resUser);
  } else {
    res.status(401).send('Not logged in');
  }
};
