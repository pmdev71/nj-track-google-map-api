const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  const authorization = req.header('Authorization');
  // Check if authorization header is present
  if (!authorization)
    return res.status(401).send('Access denied. No token provided.');

  //authorization ='Bearer token'
  const token = authorization.split(' ')[1];
  //token = 'token'

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    const user = await User.findById(decoded.userID);
    if (!user) return res.status(401).send('Access denied. User not found.');
    req.user = user;
    next();
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = requireAuth;
