'use strict';

// Import
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Load modules
const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');

// App initialize
const app = express();

// App config
app.use('/public', express.static(process.cwd() + '/public'));
app.use(cors({origin: '*'})); //USED FOR FCC TESTING PURPOSES ONLY!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongo_URI (old version was cleared)
const mongo_URI = process.env['DB'];

// MongoDB Connect Config
mongoose.set('strictQuery', false);

// MongoDB Connect
mongoose
.connect(mongo_URI)
.then(() => console.log('Database connection successed'))
.catch((err) => console.error(err))

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

// For FCC testing purposes
fccTestingRoutes(app);

// Routing for API 
apiRoutes(app);  
    
// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

// Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
          console.log('Tests are not valid:');
          console.error(e);
      }
    }, 1500);
  }
});

// For testing
module.exports = app;
