const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const {requireAuth} = require('./middleware/authMiddleware');

const app = express();

require('dotenv').config();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(process.env.PORT))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth , (req, res) => res.render('smoothies'));
app.use(authRouter);


//cookies
// app.get('/set-cookies' , (req , res) => {
//   // res.setHeader('set-Cookie' , 'newUser=true');
//   // in console , accessing cookie : document.cookie
//   // res.send('You got the cookies !');

//   // Cookie can also be used by using cookie-parse(Add app.use(cookieParser))
//   res.cookie('newUser' , false);
//   // byDefault : Age = session(deleted when you close the tab)
//   // secure : true: cookie will be set only when the connection is https--
//   // http-only : cannot be accessed in the frontend(not even in console)
// res.cookie('isEmployee' , true , {maxAge : 1000*60*60*24 ,/**secure : true , **/   httpOnly:true});  //1 day in ms
//   res.send('You got the cookies !');
// });

// app.get('/read-cookies' , (req , res) => {
//   const cookies = req.cookies;
//   console.log(cookies);
//   // console.log(cookies.newUser);
//   // console.log(cookies.isEmployee);
//   res.json(cookies);
// });