const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;//Take port value from env var if exist and 3000 by defult

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// ---------------------------MiddleWare------------------------------

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}, ${req.ip}, ${req.method},${req.path}`;
  console.log(log);
  fs.appendFile('server.log', `${log}\n`, (err) => {
    if (err)
    console.log('The "data to append" was appended to file!');
});
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs',{
//     pageTitle: 'Maintenance Page',
//     welcomeMessage: 'the website is under maintenance we will back soon'
//   });
// });
app.use(express.static(__dirname + '/public'));
// ---------------------------End MiddleWare------------------------------
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    // currentYear: new Date().getFullYear() //we use helper insted
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    // currentYear: new Date().getFullYear() //we use helper insted
  });
});


app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    welcomeMessage: 'Welcome to my Project page',
    // currentYear: new Date().getFullYear() //we use helper insted
  });
});


// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
