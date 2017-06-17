const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router =  require('./router');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(config.mongodb, options).connection;
}


app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
router(app);


function listen () {
  const port = process.env.PORT || 8081;

  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log('Express app started on port ' + port);
}
