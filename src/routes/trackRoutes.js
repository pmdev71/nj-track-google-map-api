const User = require('../models/User');
const Track = require('../models/Track');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//all routes in this file are prefixed with requireAuth
router.use(requireAuth);

//get all tracks based on loggedin userID
router.get('/tracks', async (req, res) => {
  try {
    const tracks = await Track.find({ userID: req.user._id });
    res.send(tracks);
  } catch (err) {
    res.status(500).send(err);
  }
});

//post a new track
router.post('/tracks', async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations) {
    return res.status(400).json({ error: 'Please, enter name and locations.' });
  }
  try {
    const track = new Track({ name, locations, userID: req.user._id });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
