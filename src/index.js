const User = require('./models/User');
const Track = require('./models/Track');
const express = require('express');
require('./db');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');

const requireAuth = require('./middleware/requireAuth');

const port = process.env.PORT || 3000;
const app = express();
//express.json() is a middleware that parses the body of the request to a json object and adds it to the top of other app.use middleware
app.use(express.json());
app.use(authRoutes);
app.use(trackRoutes);

app.get('/', requireAuth, (req, res) => {
  res.send(`Hello, ${req.user.email}. This is Track Map API HOME`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
