const cors = require('cors')
const express = require('express')
const request = require('request');
const session = require('express-session');
const fetch = require('node-fetch');
const bp = require('body-parser')
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

var app = express();
const PORT = 3000;
const corsOptions = {
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:80',
    optionsSuccessStatus: 200,
    method : 'POST,GET,PUT,OPTIONS,DELETE'
  }
app.use(cors(corsOptions))
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

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


app.post('/', async function(req,res) {

    try {
        console.log(req.body);
        console.log(req.body.sent);

        let sentence = req.body.sent;
        console.log(sentence);
        const response = await fetch('http://api_container:5000', {
            method: 'post',
            body: JSON.stringify(sentence),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        console.log(data);
        res.send(data);  
    }
    catch(error){
        console.log(error);
    }   
    res.end();
});

app.get('/metrics', async (req, res) => {
	try {
		res.set('Content-Type', register.contentType);
		res.end(await register.metrics());
	} catch (ex) {
		res.status(500).end(ex);
	}
});

/*const options = {
    url: 'http://localhost:5000/',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-reddit-client'
    
    },
    body: sentences,
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
});*/

if(!module.parent) {
    app.listen(PORT, function (){ 
        console.log('Listening on Port', PORT);
    });
 }

/*app.listen(PORT, function (){ 
    console.log('Listening on Port', PORT);
}); */
module.exports = app; 