const cors = require('cors')
const express = require('express')
const request = require('request');
const session = require('express-session');

var app = express();
const PORT = 3000;
const corsOptions = {
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:80',
    optionsSuccessStatus: 200,
    method : 'POST,GET,PUT,OPTIONS,DELETE'
  }
app.use(cors(corsOptions))

app.use(
    session({
        secret: 'secret string',
        resave: false,
        saveUninitialized: false,
        cookie: { /* can add cookie related info here */ }
    })
);


app.get('/', function(req, res) {
    request("http://localhost:5000", function (error, response, body) {
        console.error('error:', error); 
        console.log('statusCode:', response && response.statusCode); 
        console.log('body:', body); 
        res.send(body); 
      });      
});

app.listen(PORT, function (){ 
    console.log('Listening on Port', PORT);
});  