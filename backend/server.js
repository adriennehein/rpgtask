// import dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');

import {getSecret} from './secrets';
// import User from './models/user';

// create instances
const app = express();
const router = express.Router();

// assign port
const API_PORT = process.env.API_PORT || 3000;

// configure db, URI from mLab in secrets.js, handle errors
mongoose.connect('mongodb://', { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// configure API to use bodyParser and look for JSON data in the request body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
app.use(logger('dev'));

// set route path and initialize the api
router.get('/', (req, res) => {
  res.json({ message: 'hEllo'})
})

var userSchema = {
  name: String,
  age: Number,
  mysticalLand: String
}

var User = mongoose.model('User', userSchema)


router.get('/users', (req, res) =>{
  User.find((err, users) => {
    if (err) return res.json({ success: false, error: err })
    console.log(err);
    res.json({ success: true, data: users });
  })
})

router.post('/users', (req, res) => {
  User.create(req.body.user, (err, doc) => {
    console.log(doc);
    return res.json({success: true, data: doc});
  })

  // const user = new User();
  // // body parser allows use of req.body -- pulls fields off req.body object, creates variables from those values
  // const { name, age, mysticalLand } = req.body;
  // if (!name) {
  //   return res.json({
  //     success: false,
  //     error: 'You must provide a name.'
  //   })
  // }
  // user.name = name;
  // user.age = age;
  // user.mysticalLand = mysticalLand;
  // user.save(err => {
  //   if (err) return res.json({ success: false, error: err})
  //   return res.json({success: true})
  // })
})

// user router config when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
