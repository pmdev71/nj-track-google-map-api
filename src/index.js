const User = require('./models/User');
const express = require('express');
require('./db');
const authRoutes = require('./routes/authRoutes');

const port = process.env.PORT || 3000;
const app = express();
//express.json() is a middleware that parses the body of the request to a json object and adds it to the top of other app.use middleware
app.use(express.json());
app.use(authRoutes);

app.get('/', (req, res) => {
  res.send('Track Map API');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
