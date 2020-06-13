const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

//set up express app
const app = express();

app.use(express.json());

//connect to mongodb
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

//map mongoose promise to the global promise as it has been deprecated
mongoose.Promise = global.Promise;

//use body-parser
app.use(bodyParser.json());

//initialize routes
app.use('/v1', require('./routes/subscriptions'));
app.use('/v1', require('./routes/sub_plans'));

//error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

//listen for request
app.listen(process.env.PORT, function () {
  console.log(`Listening for Request on PORT: ${process.env.PORT}`);
});
