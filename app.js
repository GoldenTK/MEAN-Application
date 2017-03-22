  const express = require('express');
  const path = require('path');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const passport = require('passport');
  const mongoose = require('mongoose');
  const config = require('./config/database');

  //Connect to database
  mongoose.connect(config.database);
  
  //On connection
  mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
  });

  //On error
  mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
  });

  //Express init
  const app = express();

  const users = require('./routes/users');
  const usersGroups = require('./routes/usersGroups');
  const toogleSwitches = require('./routes/smartDevices/toogleSwitches');
  
  //Port number
  const port = 3000;

  // Cors 
  app.use(cors()); 

  //Static folder
  app.use(express.static(path.join(__dirname, 'public')));

  //Body Parser 
  app.use(bodyParser.json());

  //Passport
  app.use(passport.initialize());
  app.use(passport.session());

  require('./config/passport')(passport);

  //Secure API
  app.all('/*', function(req, res, next) {
    // restrict it to the required domain
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });

  app.use('/users', users);
  app.use('/usersGroups', usersGroups);
  app.use('/smartDevices/toogleSwitches', toogleSwitches);

  // Main Route
  app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
  });
 
  // Other Routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  //Start Server
  app.listen(port, () => {
    console.log('Server running on port '+port);
  });