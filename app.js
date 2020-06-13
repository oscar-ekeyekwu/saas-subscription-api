const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const easyxml = require('easyxml');
require('dotenv').config();

//set up express app
const app = express();

app.use(express.json());

//connect to mongodb
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('Database connected');
  })
  .catch((err) => console.log(err));

//map mongoose promise to the global promise as it has been deprecated
mongoose.Promise = global.Promise;

//use body-parser
app.use(bodyParser.json());

//initialize routes
app.use('/v1', require('./routes/subscriptions'));
app.use('/v1', require('./routes/sub_plans'));
app.use('/v1', require('./routes/user'));

app.use((req, res) => {
    res.send('welcome');
  });

//error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});



easyxml.configure({
  singularizeChildren: true,
  underscoreAttributes: true,
  rootElement: 'response',
  dateFormat: 'ISO',
  indent: 2,
  manifest: true,
});

//   app.use((req, res, next)=> {
//     res.sendData = function(obj) {
//       if (request.headers['accept'] === ('json')|| request.headers['accept'] === ('text/html')) {
//         res.header('Content-Type', 'application/json');
//         res.send(obj);
//       } else if (request.headers['accept'] === ('application/xml')) {
//         res.header('Content-Type', 'text/xml');
//         var xml = easyxml.render(obj);
//         res.send(xml);
//       } else {
//         res.send(406);
//       }
//     };

//     next();
//   });


//listen for request
app.listen(process.env.PORT, function () {
    console.log(`Listening for Request on PORT: ${process.env.PORT}`);
  });