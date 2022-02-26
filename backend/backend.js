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

/*app.get('/home',function(req,res){
	res.send('Hello world this is Express');
});*/


app.use(
    session({
        secret: 'secret string',
        resave: false,
        saveUninitialized: false,
        cookie: { /* can add cookie related info here */ }
    })
);
app.post('/', function(req,res) {
    console.log(req.body);
    var sentences = req.body
    

});
const options = {
    url: 'http://localhost:5000/',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-reddit-client'
    
    },
    body: data ,
    json: true
};
var returndata;

var sendrequest = await request(options) 
    .then(function (parsedBody) { 
        console.log(parsedBody); // parsedBody contains the data sent back from the Flask server 
        returndata = parsedBody; // do something with this data, here I'm assigning it to a variable. 
    }) 
    .catch(function (err) { 
        console.log(err); 
    }); 


app.get('/', function(req, res) {
    request(options , function (error, response, body) {
        console.error('error:', error); 
        console.log('statusCode:', response && response.statusCode); 
        console.log('body:', body); 
        res.send(body); 
      });      
});

app.listen(PORT, function (){ 
    console.log('Listening on Port', PORT);
});  