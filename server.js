const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n')
  next();
});

/**app.use((req, res, next) => {
  res.render('maintenance.hbs', {message: 'This site is undergoing maintenance!'});
});**/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle:'Home Page',
    message: 'Welcome to my Home page!'
  })
});

app.get('/about',(req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

/**app.get('/maintenance',(req, res) => {
  res.render('maintenance.hbs', {
    pageTitle: 'Maintenance Page',
    message: 'This site is undergoing maintenance!'
  });
});**/

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    message: 'Welcome to the Projects page!!'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "Unable to hanlde request"
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`)
});
