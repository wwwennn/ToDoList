var express = require('express');

var app = express();

var todocontroller = require('./controllers/todocontroller');


// set up template engine
app.set('view engine', 'ejs');


// fire controller
todocontroller(app);


// static files
app.use(express.static('./public'));


// listen to port
app.listen(3000);
console.log('Now listening to port 3000');