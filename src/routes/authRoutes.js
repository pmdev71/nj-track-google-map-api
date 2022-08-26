const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

//registration route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  // Check if email already exists in the database
  User.findOne({ email }, (err, user) => {
    if (user) {
      return res.status(400).send('Email already exists');
    }
    if (err) {
      console.log(err);
      return res.status(500).send('Server error');
    }
    // If email doesn't exist, create a new user
    const newUser = new User({ email, password });
    newUser.save((err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Server error');
      }
      const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
      return res.status(201).send({ token: token, user: newUser });
    });
  });
});
//login route
// Login user
router.post('/signin', async (req, res) => {
  try {
    //let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'Please, enter email and password.' });
    }
    const userLogin = await User.findOne({ email: email });
    //console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: 'Invalid Credential password.' });
      } else {
        const token = await jwt.sign(
          { userID: User._id },
          process.env.JWT_SECRET,
          {
            expiresIn: '7d',
          }
        );
        // console.log(token);
        //add token on cookies for 30 days
        res.cookie('jwtoken', token, {
          expires: new Date(Date.now() + 2589200000),
          httpOnly: true,
        });
        // res.status(200).json({ message: 'Successfully login' });
        res.status(200).send({ token: token, user: userLogin });
      }
    } else {
      res.status(400).json({ error: 'Invalid Credential' });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
